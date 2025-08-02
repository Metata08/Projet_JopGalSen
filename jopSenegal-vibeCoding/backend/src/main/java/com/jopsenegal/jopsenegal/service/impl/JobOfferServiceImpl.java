package com.jopsenegal.jopsenegal.service.impl;

import com.jopsenegal.jopsenegal.dto.JobOfferDto;
import com.jopsenegal.jopsenegal.mapper.JobOfferMapper;
import com.jopsenegal.jopsenegal.model.JobOffer;
import com.jopsenegal.jopsenegal.repository.JobOfferRepository;
import com.jopsenegal.jopsenegal.service.JobOfferService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class JobOfferServiceImpl implements JobOfferService {

    @Autowired
    private JobOfferRepository jobOfferRepository;

    @Autowired
    private JobOfferMapper jobOfferMapper;

    @Override
    public List<JobOfferDto> getAllJobOffers() {
        return jobOfferRepository.findAll().stream()
                .map(jobOfferMapper::toDto)
                .collect(Collectors.toList());
    }

    @Override
    public Optional<JobOfferDto> getJobOfferById(Long id) {
        return jobOfferRepository.findById(id).map(jobOfferMapper::toDto);
    }

    @Override
    public JobOfferDto saveJobOffer(JobOfferDto jobOfferDto) {
        JobOffer jobOffer = jobOfferMapper.toEntity(jobOfferDto);
        JobOffer savedJobOffer = jobOfferRepository.save(jobOffer);
        return jobOfferMapper.toDto(savedJobOffer);
    }

    @Override
    public void deleteJobOffer(Long id) {
        jobOfferRepository.deleteById(id);
    }
}
