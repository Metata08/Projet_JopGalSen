package com.mycompany.myapp.service;

import com.mycompany.myapp.service.dto.CandidatureDTO;
import java.util.Optional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

/**
 * Service Interface for managing {@link com.mycompany.myapp.domain.Candidature}.
 */
public interface CandidatureService {
    /**
     * Save a candidature.
     *
     * @param candidatureDTO the entity to save.
     * @return the persisted entity.
     */
    CandidatureDTO save(CandidatureDTO candidatureDTO);

    /**
     * Updates a candidature.
     *
     * @param candidatureDTO the entity to update.
     * @return the persisted entity.
     */
    CandidatureDTO update(CandidatureDTO candidatureDTO);

    /**
     * Partially updates a candidature.
     *
     * @param candidatureDTO the entity to update partially.
     * @return the persisted entity.
     */
    Optional<CandidatureDTO> partialUpdate(CandidatureDTO candidatureDTO);

    /**
     * Get all the candidatures.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    Page<CandidatureDTO> findAll(Pageable pageable);

    /**
     * Get all the candidatures with eager load of many-to-many relationships.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    Page<CandidatureDTO> findAllWithEagerRelationships(Pageable pageable);

    /**
     * Get the "id" candidature.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<CandidatureDTO> findOne(Long id);

    /**
     * Delete the "id" candidature.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);
}
