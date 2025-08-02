package com.jopsenegal.jopsenegal.service;

import com.jopsenegal.jopsenegal.model.Application;
import java.util.List;
import java.util.Optional;

public interface ApplicationService {

    List<Application> getAllApplications();

        Optional<Application> getApplicationById(Long id);

    Application saveApplication(Application application);

        void deleteApplication(Long id);

}
