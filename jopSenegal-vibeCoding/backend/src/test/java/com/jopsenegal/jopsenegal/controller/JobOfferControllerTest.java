package com.jopsenegal.jopsenegal.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.jopsenegal.jopsenegal.dto.JobOfferDto;
import com.jopsenegal.jopsenegal.security.WebSecurityConfig;
import com.jopsenegal.jopsenegal.security.jwt.AuthEntryPointJwt;
import com.jopsenegal.jopsenegal.security.jwt.JwtUtils;
import com.jopsenegal.jopsenegal.security.services.UserDetailsServiceImpl;
import com.jopsenegal.jopsenegal.service.JobOfferService;
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

@WebMvcTest(JobOfferController.class)
@Import(WebSecurityConfig.class)
public class JobOfferControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @MockBean
    private JobOfferService jobOfferService;

    @MockBean
    private UserDetailsServiceImpl userDetailsService;

    @MockBean
    private JwtUtils jwtUtils;

    @MockBean
    private AuthEntryPointJwt authEntryPointJwt;

    @Test
    @WithMockUser(roles = "CANDIDATE")
    void whenCreateJobOfferAsCandidate_thenForbidden() throws Exception {
        JobOfferDto jobOfferDto = new JobOfferDto();
        jobOfferDto.setTitle("Test Job");
        jobOfferDto.setDescription("Test Description");
        jobOfferDto.setProfileSearched("Test Profile");
        jobOfferDto.setContractTypeName("CDI");
        jobOfferDto.setJobTypeName("Full-time");
        jobOfferDto.setLocationName("Dakar");
        jobOfferDto.setRecruiterId(1L);

        mockMvc.perform(post("/api/job-offers")
                .with(csrf())
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(jobOfferDto)))
                .andExpect(status().isForbidden());
    }

    @Test
    @WithMockUser(roles = "RECRUITER")
    void whenCreateJobOfferAsRecruiter_thenOk() throws Exception {
        JobOfferDto jobOfferDto = new JobOfferDto();
        jobOfferDto.setTitle("Test Job");
        jobOfferDto.setDescription("Test Description");
        jobOfferDto.setProfileSearched("Test Profile");
        jobOfferDto.setContractTypeName("CDI");
        jobOfferDto.setJobTypeName("Full-time");
        jobOfferDto.setLocationName("Dakar");
        jobOfferDto.setRecruiterId(1L);

        mockMvc.perform(post("/api/job-offers")
                .with(csrf())
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(jobOfferDto)))
                .andExpect(status().isOk());
    }
}
