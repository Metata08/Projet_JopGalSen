package com.jopsenegal.jopsenegal.controller;

import com.jopsenegal.jopsenegal.dto.JobOfferDto;
import com.jopsenegal.jopsenegal.service.JobOfferService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/job-offers")
public class JobOfferController {

    @Autowired
    private JobOfferService jobOfferService;

    @GetMapping
        public List<JobOfferDto> getAllJobOffers() {
        return jobOfferService.getAllJobOffers();
    }

    @GetMapping("/{id}")
        public ResponseEntity<JobOfferDto> getJobOfferById(@PathVariable Long id) {
        return jobOfferService.getJobOfferById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    @PreAuthorize("hasRole('RECRUITER') or hasRole('ADMIN')")
    public JobOfferDto createJobOffer(@Valid @RequestBody JobOfferDto jobOffer) {
        return jobOfferService.saveJobOffer(jobOffer);
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasRole('RECRUITER') or hasRole('ADMIN')")
    public ResponseEntity<JobOfferDto> updateJobOffer(@PathVariable Long id, @Valid @RequestBody JobOfferDto jobOfferDetails) {
        jobOfferDetails.setId(id);
        JobOfferDto updatedJobOffer = jobOfferService.saveJobOffer(jobOfferDetails);
        return ResponseEntity.ok(updatedJobOffer);
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('RECRUITER') or hasRole('ADMIN')")
    public ResponseEntity<Void> deleteJobOffer(@PathVariable Long id) {
        return jobOfferService.getJobOfferById(id)
                .map(jobOffer -> {
                    jobOfferService.deleteJobOffer(id);
                    return ResponseEntity.ok().<Void>build();
                })
                .orElse(ResponseEntity.notFound().build());
    }
}
