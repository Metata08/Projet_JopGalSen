package com.jopsenegal.jopsenegal.service.impl;

import com.jopsenegal.jopsenegal.model.Location;
import com.jopsenegal.jopsenegal.repository.LocationRepository;
import com.jopsenegal.jopsenegal.service.LocationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class LocationServiceImpl implements LocationService {

    @Autowired
    private LocationRepository locationRepository;

    @Override
    public List<Location> getAllLocations() {
        return locationRepository.findAll();
    }

    @Override
        public Optional<Location> getLocationById(Long id) {
        return locationRepository.findById(id);
    }

    @Override
    public Location saveLocation(Location location) {
        return locationRepository.save(location);
    }

    @Override
        public void deleteLocation(Long id) {
        locationRepository.deleteById(id);
    }

    @Override
    public Location findByName(String name) {
        return locationRepository.findByName(name);
    }
}
