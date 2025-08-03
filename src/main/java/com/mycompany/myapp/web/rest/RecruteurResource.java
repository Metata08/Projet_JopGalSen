package com.mycompany.myapp.web.rest;

import com.mycompany.myapp.domain.Recruteur;
import com.mycompany.myapp.repository.RecruteurRepository;
import com.mycompany.myapp.web.rest.errors.BadRequestAlertException;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;
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
 * REST controller for managing {@link com.mycompany.myapp.domain.Recruteur}.
 */
@RestController
@RequestMapping("/api/recruteurs")
@Transactional
public class RecruteurResource {

    private static final Logger LOG = LoggerFactory.getLogger(RecruteurResource.class);

    private static final String ENTITY_NAME = "recruteur";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final RecruteurRepository recruteurRepository;

    public RecruteurResource(RecruteurRepository recruteurRepository) {
        this.recruteurRepository = recruteurRepository;
    }

    /**
     * {@code POST  /recruteurs} : Create a new recruteur.
     *
     * @param recruteur the recruteur to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new recruteur, or with status {@code 400 (Bad Request)} if the recruteur has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("")
    public ResponseEntity<Recruteur> createRecruteur(@Valid @RequestBody Recruteur recruteur) throws URISyntaxException {
        LOG.debug("REST request to save Recruteur : {}", recruteur);
        if (recruteur.getId() != null) {
            throw new BadRequestAlertException("A new recruteur cannot already have an ID", ENTITY_NAME, "idexists");
        }
        recruteur = recruteurRepository.save(recruteur);
        return ResponseEntity.created(new URI("/api/recruteurs/" + recruteur.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, recruteur.getId().toString()))
            .body(recruteur);
    }

    /**
     * {@code PUT  /recruteurs/:id} : Updates an existing recruteur.
     *
     * @param id the id of the recruteur to save.
     * @param recruteur the recruteur to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated recruteur,
     * or with status {@code 400 (Bad Request)} if the recruteur is not valid,
     * or with status {@code 500 (Internal Server Error)} if the recruteur couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/{id}")
    public ResponseEntity<Recruteur> updateRecruteur(
        @PathVariable(value = "id", required = false) final Long id,
        @Valid @RequestBody Recruteur recruteur
    ) throws URISyntaxException {
        LOG.debug("REST request to update Recruteur : {}, {}", id, recruteur);
        if (recruteur.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, recruteur.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!recruteurRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        recruteur = recruteurRepository.save(recruteur);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, recruteur.getId().toString()))
            .body(recruteur);
    }

    /**
     * {@code PATCH  /recruteurs/:id} : Partial updates given fields of an existing recruteur, field will ignore if it is null
     *
     * @param id the id of the recruteur to save.
     * @param recruteur the recruteur to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated recruteur,
     * or with status {@code 400 (Bad Request)} if the recruteur is not valid,
     * or with status {@code 404 (Not Found)} if the recruteur is not found,
     * or with status {@code 500 (Internal Server Error)} if the recruteur couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/{id}", consumes = { "application/json", "application/merge-patch+json" })
    public ResponseEntity<Recruteur> partialUpdateRecruteur(
        @PathVariable(value = "id", required = false) final Long id,
        @NotNull @RequestBody Recruteur recruteur
    ) throws URISyntaxException {
        LOG.debug("REST request to partial update Recruteur partially : {}, {}", id, recruteur);
        if (recruteur.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, recruteur.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!recruteurRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<Recruteur> result = recruteurRepository
            .findById(recruteur.getId())
            .map(existingRecruteur -> {
                if (recruteur.getType() != null) {
                    existingRecruteur.setType(recruteur.getType());
                }

                return existingRecruteur;
            })
            .map(recruteurRepository::save);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, recruteur.getId().toString())
        );
    }

    /**
     * {@code GET  /recruteurs} : get all the recruteurs.
     *
     * @param filter the filter of the request.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of recruteurs in body.
     */
    @GetMapping("")
    public List<Recruteur> getAllRecruteurs(@RequestParam(name = "filter", required = false) String filter) {
        if ("user-is-null".equals(filter)) {
            LOG.debug("REST request to get all Recruteurs where user is null");
            return StreamSupport.stream(recruteurRepository.findAll().spliterator(), false)
                .filter(recruteur -> recruteur.getUser() == null)
                .toList();
        }
        LOG.debug("REST request to get all Recruteurs");
        return recruteurRepository.findAll();
    }

    /**
     * {@code GET  /recruteurs/:id} : get the "id" recruteur.
     *
     * @param id the id of the recruteur to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the recruteur, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/{id}")
    public ResponseEntity<Recruteur> getRecruteur(@PathVariable("id") Long id) {
        LOG.debug("REST request to get Recruteur : {}", id);
        Optional<Recruteur> recruteur = recruteurRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(recruteur);
    }

    /**
     * {@code DELETE  /recruteurs/:id} : delete the "id" recruteur.
     *
     * @param id the id of the recruteur to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteRecruteur(@PathVariable("id") Long id) {
        LOG.debug("REST request to delete Recruteur : {}", id);
        recruteurRepository.deleteById(id);
        return ResponseEntity.noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString()))
            .build();
    }
}
