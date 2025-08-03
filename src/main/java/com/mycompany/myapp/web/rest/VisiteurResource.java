package com.mycompany.myapp.web.rest;

import com.mycompany.myapp.domain.Visiteur;
import com.mycompany.myapp.repository.VisiteurRepository;
import com.mycompany.myapp.web.rest.errors.BadRequestAlertException;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import java.util.stream.StreamSupport;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;
import tech.jhipster.web.util.HeaderUtil;
import tech.jhipster.web.util.ResponseUtil;

/**
 * REST controller for managing {@link com.mycompany.myapp.domain.Visiteur}.
 */
@RestController
@RequestMapping("/api/visiteurs")
@Transactional
public class VisiteurResource {

    private static final Logger LOG = LoggerFactory.getLogger(VisiteurResource.class);

    private static final String ENTITY_NAME = "visiteur";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final VisiteurRepository visiteurRepository;

    public VisiteurResource(VisiteurRepository visiteurRepository) {
        this.visiteurRepository = visiteurRepository;
    }

    /**
     * {@code POST  /visiteurs} : Create a new visiteur.
     *
     * @param visiteur the visiteur to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new visiteur, or with status {@code 400 (Bad Request)} if the visiteur has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("")
    public ResponseEntity<Visiteur> createVisiteur(@RequestBody Visiteur visiteur) throws URISyntaxException {
        LOG.debug("REST request to save Visiteur : {}", visiteur);
        if (visiteur.getId() != null) {
            throw new BadRequestAlertException("A new visiteur cannot already have an ID", ENTITY_NAME, "idexists");
        }
        visiteur = visiteurRepository.save(visiteur);
        return ResponseEntity.created(new URI("/api/visiteurs/" + visiteur.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, visiteur.getId().toString()))
            .body(visiteur);
    }

    /**
     * {@code PUT  /visiteurs/:id} : Updates an existing visiteur.
     *
     * @param id the id of the visiteur to save.
     * @param visiteur the visiteur to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated visiteur,
     * or with status {@code 400 (Bad Request)} if the visiteur is not valid,
     * or with status {@code 500 (Internal Server Error)} if the visiteur couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/{id}")
    public ResponseEntity<Visiteur> updateVisiteur(
        @PathVariable(value = "id", required = false) final Long id,
        @RequestBody Visiteur visiteur
    ) throws URISyntaxException {
        LOG.debug("REST request to update Visiteur : {}, {}", id, visiteur);
        if (visiteur.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, visiteur.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!visiteurRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        visiteur = visiteurRepository.save(visiteur);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, visiteur.getId().toString()))
            .body(visiteur);
    }

    /**
     * {@code PATCH  /visiteurs/:id} : Partial updates given fields of an existing visiteur, field will ignore if it is null
     *
     * @param id the id of the visiteur to save.
     * @param visiteur the visiteur to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated visiteur,
     * or with status {@code 400 (Bad Request)} if the visiteur is not valid,
     * or with status {@code 404 (Not Found)} if the visiteur is not found,
     * or with status {@code 500 (Internal Server Error)} if the visiteur couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/{id}", consumes = { "application/json", "application/merge-patch+json" })
    public ResponseEntity<Visiteur> partialUpdateVisiteur(
        @PathVariable(value = "id", required = false) final Long id,
        @RequestBody Visiteur visiteur
    ) throws URISyntaxException {
        LOG.debug("REST request to partial update Visiteur partially : {}, {}", id, visiteur);
        if (visiteur.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, visiteur.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!visiteurRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<Visiteur> result = visiteurRepository
            .findById(visiteur.getId())
            .map(existingVisiteur -> {
                if (visiteur.getCv() != null) {
                    existingVisiteur.setCv(visiteur.getCv());
                }

                return existingVisiteur;
            })
            .map(visiteurRepository::save);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, visiteur.getId().toString())
        );
    }

    /**
     * {@code GET  /visiteurs} : get all the visiteurs.
     *
     * @param filter the filter of the request.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of visiteurs in body.
     */
    @GetMapping("")
    public List<Visiteur> getAllVisiteurs(@RequestParam(name = "filter", required = false) String filter) {
        if ("user-is-null".equals(filter)) {
            LOG.debug("REST request to get all Visiteurs where user is null");
            return StreamSupport.stream(visiteurRepository.findAll().spliterator(), false)
                .filter(visiteur -> visiteur.getUser() == null)
                .toList();
        }
        LOG.debug("REST request to get all Visiteurs");
        return visiteurRepository.findAll();
    }

    /**
     * {@code GET  /visiteurs/:id} : get the "id" visiteur.
     *
     * @param id the id of the visiteur to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the visiteur, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/{id}")
    public ResponseEntity<Visiteur> getVisiteur(@PathVariable("id") Long id) {
        LOG.debug("REST request to get Visiteur : {}", id);
        Optional<Visiteur> visiteur = visiteurRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(visiteur);
    }

    /**
     * {@code DELETE  /visiteurs/:id} : delete the "id" visiteur.
     *
     * @param id the id of the visiteur to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteVisiteur(@PathVariable("id") Long id) {
        LOG.debug("REST request to delete Visiteur : {}", id);
        visiteurRepository.deleteById(id);
        return ResponseEntity.noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString()))
            .build();
    }
}
