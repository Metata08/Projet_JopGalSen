package com.jopsenegal.jopsenegal.repository;

import com.jopsenegal.jopsenegal.model.ContractType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ContractTypeRepository extends JpaRepository<ContractType, Long> {
    ContractType findByName(String name);
}
