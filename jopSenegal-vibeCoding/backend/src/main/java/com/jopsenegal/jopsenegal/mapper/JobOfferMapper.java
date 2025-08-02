package com.jopsenegal.jopsenegal.mapper;

import com.jopsenegal.jopsenegal.dto.JobOfferDto;
import com.jopsenegal.jopsenegal.model.*;
import com.jopsenegal.jopsenegal.service.ContractTypeService;
import com.jopsenegal.jopsenegal.service.JobTypeService;
import com.jopsenegal.jopsenegal.service.LocationService;
import com.jopsenegal.jopsenegal.exception.ResourceNotFoundException;
import com.jopsenegal.jopsenegal.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.stereotype.Component;

@Component
public class JobOfferMapper {

    @Autowired
    private ContractTypeService contractTypeService;

    @Autowired
    private JobTypeService jobTypeService;

    @Autowired
    private LocationService locationService;

    @Autowired
    private UserService userService;

    public JobOfferDto toDto(JobOffer jobOffer) {
        if (jobOffer == null) {
            return null;
        }

        return JobOfferDto.builder()
                .id(jobOffer.getId())
                .title(jobOffer.getTitle())
                .description(jobOffer.getDescription())
                .createdAt(jobOffer.getCreatedAt())
                .contractTypeName(jobOffer.getContractType() != null ? jobOffer.getContractType().getName() : null)
                .jobTypeName(jobOffer.getJobType() != null ? jobOffer.getJobType().getName() : null)
                .locationName(jobOffer.getLocation() != null ? jobOffer.getLocation().getName() : null)
                .recruiterCompanyName(jobOffer.getRecruiter() != null ? jobOffer.getRecruiter().getCompanyName() : null)
                .recruiterId(jobOffer.getRecruiter() != null ? jobOffer.getRecruiter().getId() : null)
                .build();
    }

    public JobOffer toEntity(JobOfferDto jobOfferDto) {
        if (jobOfferDto == null) {
            return null;
        }

        JobOffer jobOffer = new JobOffer();
        jobOffer.setId(jobOfferDto.getId());
        jobOffer.setTitle(jobOfferDto.getTitle());
        jobOffer.setDescription(jobOfferDto.getDescription());
        jobOffer.setCreatedAt(jobOfferDto.getCreatedAt());

        // La logique ci-dessous suppose l'existence de méthodes pour retrouver les entités par nom.
        // Ces méthodes devront être créées dans les services correspondants.
        if (jobOfferDto.getContractTypeName() != null) {
            ContractType contractType = contractTypeService.findByName(jobOfferDto.getContractTypeName());
            jobOffer.setContractType(contractType);
        }

        if (jobOfferDto.getJobTypeName() != null) {
            JobType jobType = jobTypeService.findByName(jobOfferDto.getJobTypeName());
            jobOffer.setJobType(jobType);
        }

        if (jobOfferDto.getLocationName() != null) {
            Location location = locationService.findByName(jobOfferDto.getLocationName());
            jobOffer.setLocation(location);
        }

        if (jobOfferDto.getRecruiterId() != null) {
            User recruiter = userService.getUserById(jobOfferDto.getRecruiterId())
                    .orElseThrow(() -> new ResourceNotFoundException("Recruiter not found with id: " + jobOfferDto.getRecruiterId()));
            jobOffer.setRecruiter(recruiter);
        }

        return jobOffer;
    }
}
