package com.jopsenegal.jopsenegal.service;

import com.jopsenegal.jopsenegal.model.ContractType;
import java.util.List;
import java.util.Optional;

public interface ContractTypeService {

    List<ContractType> getAllContractTypes();

        Optional<ContractType> getContractTypeById(Long id);

    ContractType saveContractType(ContractType contractType);

            void deleteContractType(Long id);

    ContractType findByName(String name);

}
