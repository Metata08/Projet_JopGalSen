package com.jopsenegal.jopsenegal.service.impl;

import com.jopsenegal.jopsenegal.model.JobType;
import com.jopsenegal.jopsenegal.repository.JobTypeRepository;
import com.jopsenegal.jopsenegal.service.JobTypeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class JobTypeServiceImpl implements JobTypeService {

    @Autowired
    private JobTypeRepository jobTypeRepository;

    @Override
    public List<JobType> getAllJobTypes() {
        return jobTypeRepository.findAll();
    }

    @Override
        public Optional<JobType> getJobTypeById(Long id) {
        return jobTypeRepository.findById(id);
    }

    @Override
    public JobType saveJobType(JobType jobType) {
        return jobTypeRepository.save(jobType);
    }

    @Override
        public void deleteJobType(Long id) {
        jobTypeRepository.deleteById(id);
    }

    @Override
    public JobType findByName(String name) {
        return jobTypeRepository.findByName(name);
    }
}
