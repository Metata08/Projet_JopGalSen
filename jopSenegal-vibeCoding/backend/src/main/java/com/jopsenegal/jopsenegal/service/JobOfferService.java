package com.jopsenegal.jopsenegal.service;

import com.jopsenegal.jopsenegal.dto.JobOfferDto;
import com.jopsenegal.jopsenegal.model.JobOffer;
import java.util.List;
import java.util.Optional;

public interface JobOfferService {

        List<JobOfferDto> getAllJobOffers();

        Optional<JobOfferDto> getJobOfferById(Long id);

    JobOfferDto saveJobOffer(JobOfferDto jobOffer);

        void deleteJobOffer(Long id);

}
