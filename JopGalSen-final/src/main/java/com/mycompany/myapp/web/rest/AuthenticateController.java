package com.mycompany.myapp.web.rest;

import static com.mycompany.myapp.security.SecurityUtils.AUTHORITIES_CLAIM;
import static com.mycompany.myapp.security.SecurityUtils.JWT_ALGORITHM;
import static com.mycompany.myapp.security.SecurityUtils.USER_ID_CLAIM;

import java.util.Map;
import java.util.HashMap;
import java.util.stream.Collectors;

import com.mycompany.myapp.domain.User;
import com.mycompany.myapp.security.DomainUserDetailsService.UserWithId;
import com.mycompany.myapp.service.UserService;
import com.mycompany.myapp.web.rest.vm.LoginVM;

import jakarta.validation.Valid;
import java.security.Principal;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;

import org.springframework.security.oauth2.jwt.JwsHeader;
import org.springframework.security.oauth2.jwt.JwtClaimsSet;
import org.springframework.security.oauth2.jwt.JwtEncoder;
import org.springframework.security.oauth2.jwt.JwtEncoderParameters;

import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
public class AuthenticateController {

    private static final Logger LOG = LoggerFactory.getLogger(AuthenticateController.class);

    private final JwtEncoder jwtEncoder;
    private final AuthenticationManagerBuilder authenticationManagerBuilder;
    private final UserService userService;

    @Value("${jhipster.security.authentication.jwt.token-validity-in-seconds:0}")
    private long tokenValidityInSeconds;

    @Value("${jhipster.security.authentication.jwt.token-validity-in-seconds-for-remember-me:0}")
    private long tokenValidityInSecondsForRememberMe;

    public AuthenticateController(JwtEncoder jwtEncoder,
                                  AuthenticationManagerBuilder authenticationManagerBuilder,
                                  UserService userService) {
        this.jwtEncoder = jwtEncoder;
        this.authenticationManagerBuilder = authenticationManagerBuilder;
        this.userService = userService;
    }

   @PostMapping("/authenticate")
    public ResponseEntity<Map<String, Object>> authorize(@Valid @RequestBody LoginVM loginVM) {
        LOG.info("Login attempt : {}", loginVM.getUsername());

        UsernamePasswordAuthenticationToken authenticationToken =
            new UsernamePasswordAuthenticationToken(loginVM.getUsername(), loginVM.getPassword());

        Authentication authentication = authenticationManagerBuilder.getObject().authenticate(authenticationToken);
        SecurityContextHolder.getContext().setAuthentication(authentication);

        String jwt = this.createToken(authentication, loginVM.isRememberMe());

        User user = null;
        String role = "";
        Object principal = authentication.getPrincipal();
        if (principal instanceof UserDetails) {
            String username = ((UserDetails) principal).getUsername();
            user = userService.getUserWithAuthoritiesByLogin(username).orElse(null);

            if (user != null && user.getAuthorities() != null && !user.getAuthorities().isEmpty()) {
                // On récupère le premier rôle (ou adapte selon ta logique métier)
                role = user.getAuthorities().stream()
                    .findFirst()
                    .map(authority -> authority.getName())  // Autorité comme chaîne de caractères
                    .orElse("");
            }
        }

        Map<String, Object> responseBody = new HashMap<>();
        responseBody.put("idToken", jwt);  // Correction clé "idToken"
        responseBody.put("user", user);
        responseBody.put("role", role);

        LOG.info("Returning JWT and user info for: {}", user != null ? user.getLogin() : "null");

        HttpHeaders headers = new HttpHeaders();
        headers.setBearerAuth(jwt);

        return new ResponseEntity<>(responseBody, headers, HttpStatus.OK);
    }


    @GetMapping("/authenticate")
    public ResponseEntity<Void> isAuthenticated(Principal principal) {
        LOG.debug("REST request to check if the current user is authenticated");
        return ResponseEntity.status(principal == null ? HttpStatus.UNAUTHORIZED : HttpStatus.NO_CONTENT).build();
    }

    public String createToken(Authentication authentication, boolean rememberMe) {
        String authorities = authentication.getAuthorities().stream()
            .map(GrantedAuthority::getAuthority)
            .collect(Collectors.joining(" "));

        var now = java.time.Instant.now();
        var validity = rememberMe
            ? now.plus(tokenValidityInSecondsForRememberMe, java.time.temporal.ChronoUnit.SECONDS)
            : now.plus(tokenValidityInSeconds, java.time.temporal.ChronoUnit.SECONDS);

        JwtClaimsSet.Builder builder = JwtClaimsSet.builder()
            .issuedAt(now)
            .expiresAt(validity)
            .subject(authentication.getName())
            .claim(AUTHORITIES_CLAIM, authorities);

        if (authentication.getPrincipal() instanceof UserWithId user) {
            builder.claim(USER_ID_CLAIM, user.getId());
        }

        JwsHeader jwsHeader = JwsHeader.with(JWT_ALGORITHM).build();
        return jwtEncoder.encode(JwtEncoderParameters.from(jwsHeader, builder.build())).getTokenValue();
    }
}
