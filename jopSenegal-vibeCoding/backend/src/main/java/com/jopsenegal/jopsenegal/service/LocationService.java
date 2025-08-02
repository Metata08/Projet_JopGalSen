package com.jopsenegal.jopsenegal.service;

import com.jopsenegal.jopsenegal.model.Location;
import java.util.List;
import java.util.Optional;

public interface LocationService {

    List<Location> getAllLocations();

        Optional<Location> getLocationById(Long id);

    Location saveLocation(Location location);

            void deleteLocation(Long id);

    Location findByName(String name);

}
