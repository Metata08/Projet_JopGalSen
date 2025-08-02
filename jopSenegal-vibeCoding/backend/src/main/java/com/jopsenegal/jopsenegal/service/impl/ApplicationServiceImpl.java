package com.jopsenegal.jopsenegal.service.impl;

import com.jopsenegal.jopsenegal.model.Application;
import com.jopsenegal.jopsenegal.repository.ApplicationRepository;
import com.jopsenegal.jopsenegal.service.ApplicationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ApplicationServiceImpl implements ApplicationService {

    @Autowired
    private ApplicationRepository applicationRepository;

    @Override
    public List<Application> getAllApplications() {
        return applicationRepository.findAll();
    }

    @Override
        public Optional<Application> getApplicationById(Long id) {
        return applicationRepository.findById(id);
    }

    @Override
    public Application saveApplication(Application application) {
        return applicationRepository.save(application);
    }

    @Override
        public void deleteApplication(Long id) {
        applicationRepository.deleteById(id);
    }
}
