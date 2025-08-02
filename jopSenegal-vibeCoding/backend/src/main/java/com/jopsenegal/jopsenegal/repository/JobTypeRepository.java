package com.jopsenegal.jopsenegal.repository;

import com.jopsenegal.jopsenegal.model.JobType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface JobTypeRepository extends JpaRepository<JobType, Long> {
    JobType findByName(String name);
}
