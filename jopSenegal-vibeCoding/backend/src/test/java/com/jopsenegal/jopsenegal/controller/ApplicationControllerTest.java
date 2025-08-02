package com.jopsenegal.jopsenegal.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.jopsenegal.jopsenegal.model.Application;
import com.jopsenegal.jopsenegal.security.WebSecurityConfig;
import com.jopsenegal.jopsenegal.security.jwt.AuthEntryPointJwt;
import com.jopsenegal.jopsenegal.security.jwt.JwtUtils;
import com.jopsenegal.jopsenegal.security.services.UserDetailsServiceImpl;
import com.jopsenegal.jopsenegal.service.ApplicationService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.context.annotation.Import;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;

import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.csrf;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest(ApplicationController.class)
@Import(WebSecurityConfig.class)
public class ApplicationControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @MockBean
    private ApplicationService applicationService;

    @MockBean
    private UserDetailsServiceImpl userDetailsService;

    @MockBean
    private JwtUtils jwtUtils;

    @MockBean
    private AuthEntryPointJwt authEntryPointJwt;

    @Test
    @WithMockUser(roles = "RECRUITER")
    void whenCreateApplicationAsRecruiter_thenForbidden() throws Exception {
        Application application = new Application();
        // We don't need to set properties for a forbidden request.

        mockMvc.perform(post("/api/applications")
                        .with(csrf())
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(application)))
                .andExpect(status().isForbidden());
    }

    @Test
    @WithMockUser(roles = "CANDIDATE")
    void whenCreateApplicationAsCandidate_thenOk() throws Exception {
        Application application = new Application();
        // We don't need to set properties as the service is mocked.

        mockMvc.perform(post("/api/applications")
                        .with(csrf())
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(application)))
                .andExpect(status().isOk());
    }
}
