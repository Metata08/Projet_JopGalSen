package com.mycompany.myapp.repository;

import com.mycompany.myapp.domain.Poste;
import java.util.List;
import java.util.Optional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

/**
 * Spring Data JPA repository for the Poste entity.
 */
@Repository
public interface PosteRepository extends JpaRepository<Poste, Long> {
    default Optional<Poste> findOneWithEagerRelationships(Long id) {
        return this.findOneWithToOneRelationships(id);
    }

    default List<Poste> findAllWithEagerRelationships() {
        return this.findAllWithToOneRelationships();
    }

    default Page<Poste> findAllWithEagerRelationships(Pageable pageable) {
        return this.findAllWithToOneRelationships(pageable);
    }

    @Query(value = "select poste from Poste poste left join fetch poste.domaine", countQuery = "select count(poste) from Poste poste")
    Page<Poste> findAllWithToOneRelationships(Pageable pageable);

    @Query("select poste from Poste poste left join fetch poste.domaine")
    List<Poste> findAllWithToOneRelationships();

    @Query("select poste from Poste poste left join fetch poste.domaine where poste.id =:id")
    Optional<Poste> findOneWithToOneRelationships(@Param("id") Long id);
}
