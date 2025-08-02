package com.jopsenegal.jopsenegal.service;

import com.jopsenegal.jopsenegal.model.JobType;
import java.util.List;
import java.util.Optional;

public interface JobTypeService {

    List<JobType> getAllJobTypes();

        Optional<JobType> getJobTypeById(Long id);

    JobType saveJobType(JobType jobType);

            void deleteJobType(Long id);

    JobType findByName(String name);

}
