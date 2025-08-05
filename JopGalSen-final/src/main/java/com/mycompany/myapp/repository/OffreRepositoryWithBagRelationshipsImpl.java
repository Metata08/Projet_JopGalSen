package com.mycompany.myapp.repository;

import com.mycompany.myapp.domain.Offre;
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
public class OffreRepositoryWithBagRelationshipsImpl implements OffreRepositoryWithBagRelationships {

    private static final String ID_PARAMETER = "id";
    private static final String OFFRES_PARAMETER = "offres";

    @PersistenceContext
    private EntityManager entityManager;

    @Override
    public Optional<Offre> fetchBagRelationships(Optional<Offre> offre) {
        return offre.map(this::fetchPostes);
    }

    @Override
    public Page<Offre> fetchBagRelationships(Page<Offre> offres) {
        return new PageImpl<>(fetchBagRelationships(offres.getContent()), offres.getPageable(), offres.getTotalElements());
    }

    @Override
    public List<Offre> fetchBagRelationships(List<Offre> offres) {
        return Optional.of(offres).map(this::fetchPostes).orElse(Collections.emptyList());
    }

    Offre fetchPostes(Offre result) {
        return entityManager
            .createQuery("select offre from Offre offre left join fetch offre.postes where offre.id = :id", Offre.class)
            .setParameter(ID_PARAMETER, result.getId())
            .getSingleResult();
    }

    List<Offre> fetchPostes(List<Offre> offres) {
        HashMap<Object, Integer> order = new HashMap<>();
        IntStream.range(0, offres.size()).forEach(index -> order.put(offres.get(index).getId(), index));
        List<Offre> result = entityManager
            .createQuery("select offre from Offre offre left join fetch offre.postes where offre in :offres", Offre.class)
            .setParameter(OFFRES_PARAMETER, offres)
            .getResultList();
        Collections.sort(result, (o1, o2) -> Integer.compare(order.get(o1.getId()), order.get(o2.getId())));
        return result;
    }
}
