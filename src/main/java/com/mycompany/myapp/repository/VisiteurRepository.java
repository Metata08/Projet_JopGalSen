package com.mycompany.myapp.repository;

import com.mycompany.myapp.domain.Visiteur;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data JPA repository for the Visiteur entity.
 */
@SuppressWarnings("unused")
@Repository
public interface VisiteurRepository extends JpaRepository<Visiteur, Long> {}
