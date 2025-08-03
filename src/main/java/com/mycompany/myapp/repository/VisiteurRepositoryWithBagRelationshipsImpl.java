package com.mycompany.myapp.repository;

import com.mycompany.myapp.domain.Visiteur;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Optional;
import java.util.stream.IntStream;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;

/**
 * Utility repository to load bag relationships based on https://vladmihalcea.com/hibernate-multiplebagfetchexception/
 */
public class VisiteurRepositoryWithBagRelationshipsImpl implements VisiteurRepositoryWithBagRelationships {

    private static final String ID_PARAMETER = "id";
    private static final String VISITEURS_PARAMETER = "visiteurs";

    @PersistenceContext
    private EntityManager entityManager;

    @Override
    public Optional<Visiteur> fetchBagRelationships(Optional<Visiteur> visiteur) {
        return visiteur.map(this::fetchOffres);
    }

    @Override
    public Page<Visiteur> fetchBagRelationships(Page<Visiteur> visiteurs) {
        return new PageImpl<>(fetchBagRelationships(visiteurs.getContent()), visiteurs.getPageable(), visiteurs.getTotalElements());
    }

    @Override
    public List<Visiteur> fetchBagRelationships(List<Visiteur> visiteurs) {
        return Optional.of(visiteurs).map(this::fetchOffres).orElse(Collections.emptyList());
    }

    Visiteur fetchOffres(Visiteur result) {
        return entityManager
            .createQuery("select visiteur from Visiteur visiteur left join fetch visiteur.offres where visiteur.id = :id", Visiteur.class)
            .setParameter(ID_PARAMETER, result.getId())
            .getSingleResult();
    }

    List<Visiteur> fetchOffres(List<Visiteur> visiteurs) {
        HashMap<Object, Integer> order = new HashMap<>();
        IntStream.range(0, visiteurs.size()).forEach(index -> order.put(visiteurs.get(index).getId(), index));
        List<Visiteur> result = entityManager
            .createQuery(
                "select visiteur from Visiteur visiteur left join fetch visiteur.offres where visiteur in :visiteurs",
                Visiteur.class
            )
            .setParameter(VISITEURS_PARAMETER, visiteurs)
            .getResultList();
        Collections.sort(result, (o1, o2) -> Integer.compare(order.get(o1.getId()), order.get(o2.getId())));
        return result;
    }
}
