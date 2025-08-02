package com.jopsenegal.jopsenegal.repository;

import com.jopsenegal.jopsenegal.model.JobOffer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface JobOfferRepository extends JpaRepository<JobOffer, Long> {
    // On pourra ajouter ici des méthodes de recherche personnalisées plus tard
    // Par exemple: List<JobOffer> findByLocationName(String name);
}
