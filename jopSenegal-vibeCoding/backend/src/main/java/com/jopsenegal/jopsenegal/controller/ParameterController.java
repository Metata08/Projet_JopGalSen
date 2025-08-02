package com.jopsenegal.jopsenegal.controller;

import com.jopsenegal.jopsenegal.model.ContractType;
import com.jopsenegal.jopsenegal.model.JobType;
import com.jopsenegal.jopsenegal.model.Location;
import com.jopsenegal.jopsenegal.service.ContractTypeService;
import com.jopsenegal.jopsenegal.service.JobTypeService;
import com.jopsenegal.jopsenegal.service.LocationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/parameters")
public class ParameterController {

    @Autowired
    private ContractTypeService contractTypeService;

    @Autowired
    private JobTypeService jobTypeService;

    @Autowired
    private LocationService locationService;

    @GetMapping("/contract-types")
    public List<ContractType> getAllContractTypes() {
        return contractTypeService.getAllContractTypes();
    }

    @GetMapping("/job-types")
    public List<JobType> getAllJobTypes() {
        return jobTypeService.getAllJobTypes();
    }

    @GetMapping("/locations")
    public List<Location> getAllLocations() {
        return locationService.getAllLocations();
    }
}
