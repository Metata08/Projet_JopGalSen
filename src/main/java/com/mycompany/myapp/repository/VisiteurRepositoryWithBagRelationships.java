package com.mycompany.myapp.repository;

import com.mycompany.myapp.domain.Visiteur;
import java.util.List;
import java.util.Optional;
import org.springframework.data.domain.Page;

public interface VisiteurRepositoryWithBagRelationships {
    Optional<Visiteur> fetchBagRelationships(Optional<Visiteur> visiteur);

    List<Visiteur> fetchBagRelationships(List<Visiteur> visiteurs);

    Page<Visiteur> fetchBagRelationships(Page<Visiteur> visiteurs);
}
