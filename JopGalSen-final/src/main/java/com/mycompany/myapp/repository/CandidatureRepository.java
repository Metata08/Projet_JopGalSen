package com.mycompany.myapp.repository;

import com.mycompany.myapp.domain.Candidature;
import java.util.List;
import java.util.Optional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

/**
 * Spring Data JPA repository for the Candidature entity.
 */
@Repository
public interface CandidatureRepository extends JpaRepository<Candidature, Long> {
    default Optional<Candidature> findOneWithEagerRelationships(Long id) {
        return this.findOneWithToOneRelationships(id);
    }

    default List<Candidature> findAllWithEagerRelationships() {
        return this.findAllWithToOneRelationships();
    }

    default Page<Candidature> findAllWithEagerRelationships(Pageable pageable) {
        return this.findAllWithToOneRelationships(pageable);
    }

    @Query(
        value = "select candidature from Candidature candidature left join fetch candidature.offre",
        countQuery = "select count(candidature) from Candidature candidature"
    )
    Page<Candidature> findAllWithToOneRelationships(Pageable pageable);

    @Query("select candidature from Candidature candidature left join fetch candidature.offre")
    List<Candidature> findAllWithToOneRelationships();

    @Query("select candidature from Candidature candidature left join fetch candidature.offre where candidature.id =:id")
    Optional<Candidature> findOneWithToOneRelationships(@Param("id") Long id);
}
