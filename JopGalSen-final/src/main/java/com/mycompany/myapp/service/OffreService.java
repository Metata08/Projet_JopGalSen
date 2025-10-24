package com.mycompany.myapp.service;

import com.mycompany.myapp.service.dto.OffreDTO;
import java.util.Optional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import java.util.List;
import java.util.stream.Collectors;
import com.mycompany.myapp.domain.Offre;
import com.mycompany.myapp.repository.OffreRepository;
import com.mycompany.myapp.service.mapper.OffreMapper;

/**
 * Service Interface for managing {@link com.mycompany.myapp.domain.Offre}.
 */

public interface OffreService {
    /**
     * Save a offre.
     *
     * @param offreDTO the entity to save.
     * @return the persisted entity.
     */
    OffreDTO save(OffreDTO offreDTO);

    /**
     * Updates a offre.
     *
     * @param offreDTO the entity to update.
     * @return the persisted entity.
     */
    OffreDTO update(OffreDTO offreDTO);

    /**
     * Partially updates a offre.
     *
     * @param offreDTO the entity to update partially.
     * @return the persisted entity.
     */
    Optional<OffreDTO> partialUpdate(OffreDTO offreDTO);

    /**
     * Get all the offres.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    Page<OffreDTO> findAll(Pageable pageable);

    /**
     * Get all the offres with eager load of many-to-many relationships.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    Page<OffreDTO> findAllWithEagerRelationships(Pageable pageable);

    /**
     * Get the "id" offre.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<OffreDTO> findOne(Long id);

    /**
     * Delete the "id" offre.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);

    /**Recuperer les offres par recruteur */
    //List<OffreDTO> findByRecruteurId(Long recruteurId);
    List<OffreDTO> findByUserId(Long userId);
}
