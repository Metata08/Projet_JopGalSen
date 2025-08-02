package com.jopsenegal.jopsenegal.service.impl;

import com.jopsenegal.jopsenegal.model.ContractType;
import com.jopsenegal.jopsenegal.repository.ContractTypeRepository;
import com.jopsenegal.jopsenegal.service.ContractTypeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ContractTypeServiceImpl implements ContractTypeService {

    @Autowired
    private ContractTypeRepository contractTypeRepository;

    @Override
    public List<ContractType> getAllContractTypes() {
        return contractTypeRepository.findAll();
    }

    @Override
        public Optional<ContractType> getContractTypeById(Long id) {
        return contractTypeRepository.findById(id);
    }

    @Override
    public ContractType saveContractType(ContractType contractType) {
        return contractTypeRepository.save(contractType);
    }

    @Override
        public void deleteContractType(Long id) {
        contractTypeRepository.deleteById(id);
    }

    @Override
    public ContractType findByName(String name) {
        return contractTypeRepository.findByName(name);
    }
}
