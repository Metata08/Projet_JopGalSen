package com.mycompany.myapp.web.rest;

import com.mycompany.myapp.domain.Candidature;
import com.mycompany.myapp.repository.CandidatureRepository;
import com.mycompany.myapp.web.rest.errors.BadRequestAlertException;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;
import tech.jhipster.web.util.HeaderUtil;
import tech.jhipster.web.util.PaginationUtil;
import tech.jhipster.web.util.ResponseUtil;

/**
 * REST controller for managing {@link com.mycompany.myapp.domain.Candidature}.
 */
@RestController
@RequestMapping("/api/candidatures")
@Transactional
public class CandidatureResource {

    private static final Logger LOG = LoggerFactory.getLogger(CandidatureResource.class);

    private static final String ENTITY_NAME = "candidature";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final CandidatureRepository candidatureRepository;

    public CandidatureResource(CandidatureRepository candidatureRepository) {
        this.candidatureRepository = candidatureRepository;
    }

    /**
     * {@code POST  /candidatures} : Create a new candidature.
     *
     * @param candidature the candidature to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new candidature, or with status {@code 400 (Bad Request)} if the candidature has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("")
    public ResponseEntity<Candidature> createCandidature(@RequestBody Candidature candidature) throws URISyntaxException {
        LOG.debug("REST request to save Candidature : {}", candidature);
        if (candidature.getId() != null) {
            throw new BadRequestAlertException("A new candidature cannot already have an ID", ENTITY_NAME, "idexists");
        }
        candidature = candidatureRepository.save(candidature);
        return ResponseEntity.created(new URI("/api/candidatures/" + candidature.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, candidature.getId().toString()))
            .body(candidature);
    }

    /**
     * {@code PUT  /candidatures/:id} : Updates an existing candidature.
     *
     * @param id the id of the candidature to save.
     * @param candidature the candidature to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated candidature,
     * or with status {@code 400 (Bad Request)} if the candidature is not valid,
     * or with status {@code 500 (Internal Server Error)} if the candidature couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/{id}")
    public ResponseEntity<Candidature> updateCandidature(
        @PathVariable(value = "id", required = false) final Long id,
        @RequestBody Candidature candidature
    ) throws URISyntaxException {
        LOG.debug("REST request to update Candidature : {}, {}", id, candidature);
        if (candidature.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, candidature.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!candidatureRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        candidature = candidatureRepository.save(candidature);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, candidature.getId().toString()))
            .body(candidature);
    }

    /**
     * {@code PATCH  /candidatures/:id} : Partial updates given fields of an existing candidature, field will ignore if it is null
     *
     * @param id the id of the candidature to save.
     * @param candidature the candidature to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated candidature,
     * or with status {@code 400 (Bad Request)} if the candidature is not valid,
     * or with status {@code 404 (Not Found)} if the candidature is not found,
     * or with status {@code 500 (Internal Server Error)} if the candidature couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/{id}", consumes = { "application/json", "application/merge-patch+json" })
    public ResponseEntity<Candidature> partialUpdateCandidature(
        @PathVariable(value = "id", required = false) final Long id,
        @RequestBody Candidature candidature
    ) throws URISyntaxException {
        LOG.debug("REST request to partial update Candidature partially : {}, {}", id, candidature);
        if (candidature.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, candidature.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!candidatureRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<Candidature> result = candidatureRepository
            .findById(candidature.getId())
            .map(existingCandidature -> {
                if (candidature.getMotivationLetter() != null) {
                    existingCandidature.setMotivationLetter(candidature.getMotivationLetter());
                }
                if (candidature.getCvFileUrl() != null) {
                    existingCandidature.setCvFileUrl(candidature.getCvFileUrl());
                }
                if (candidature.getDateCandidature() != null) {
                    existingCandidature.setDateCandidature(candidature.getDateCandidature());
                }

                return existingCandidature;
            })
            .map(candidatureRepository::save);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, candidature.getId().toString())
        );
    }

    /**
     * {@code GET  /candidatures} : get all the candidatures.
     *
     * @param pageable the pagination information.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of candidatures in body.
     */
    @GetMapping("")
    public ResponseEntity<List<Candidature>> getAllCandidatures(@org.springdoc.core.annotations.ParameterObject Pageable pageable) {
        LOG.debug("REST request to get a page of Candidatures");
        Page<Candidature> page = candidatureRepository.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * {@code GET  /candidatures/:id} : get the "id" candidature.
     *
     * @param id the id of the candidature to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the candidature, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/{id}")
    public ResponseEntity<Candidature> getCandidature(@PathVariable("id") Long id) {
        LOG.debug("REST request to get Candidature : {}", id);
        Optional<Candidature> candidature = candidatureRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(candidature);
    }

    /**
     * {@code DELETE  /candidatures/:id} : delete the "id" candidature.
     *
     * @param id the id of the candidature to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteCandidature(@PathVariable("id") Long id) {
        LOG.debug("REST request to delete Candidature : {}", id);
        candidatureRepository.deleteById(id);
        return ResponseEntity.noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString()))
            .build();
    }
}
