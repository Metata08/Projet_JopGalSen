package com.mycompany.myapp.web.rest;

import com.mycompany.myapp.domain.Poste;
import com.mycompany.myapp.repository.PosteRepository;
import com.mycompany.myapp.web.rest.errors.BadRequestAlertException;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;
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
 * REST controller for managing {@link com.mycompany.myapp.domain.Poste}.
 */
@RestController
@RequestMapping("/api/postes")
@Transactional
public class PosteResource {

    private static final Logger LOG = LoggerFactory.getLogger(PosteResource.class);

    private static final String ENTITY_NAME = "poste";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final PosteRepository posteRepository;

    public PosteResource(PosteRepository posteRepository) {
        this.posteRepository = posteRepository;
    }

    /**
     * {@code POST  /postes} : Create a new poste.
     *
     * @param poste the poste to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new poste, or with status {@code 400 (Bad Request)} if the poste has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("")
    public ResponseEntity<Poste> createPoste(@Valid @RequestBody Poste poste) throws URISyntaxException {
        LOG.debug("REST request to save Poste : {}", poste);
        if (poste.getId() != null) {
            throw new BadRequestAlertException("A new poste cannot already have an ID", ENTITY_NAME, "idexists");
        }
        poste = posteRepository.save(poste);
        return ResponseEntity.created(new URI("/api/postes/" + poste.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, poste.getId().toString()))
            .body(poste);
    }

    /**
     * {@code PUT  /postes/:id} : Updates an existing poste.
     *
     * @param id the id of the poste to save.
     * @param poste the poste to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated poste,
     * or with status {@code 400 (Bad Request)} if the poste is not valid,
     * or with status {@code 500 (Internal Server Error)} if the poste couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/{id}")
    public ResponseEntity<Poste> updatePoste(@PathVariable(value = "id", required = false) final Long id, @Valid @RequestBody Poste poste)
        throws URISyntaxException {
        LOG.debug("REST request to update Poste : {}, {}", id, poste);
        if (poste.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, poste.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!posteRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        poste = posteRepository.save(poste);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, poste.getId().toString()))
            .body(poste);
    }

    /**
     * {@code PATCH  /postes/:id} : Partial updates given fields of an existing poste, field will ignore if it is null
     *
     * @param id the id of the poste to save.
     * @param poste the poste to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated poste,
     * or with status {@code 400 (Bad Request)} if the poste is not valid,
     * or with status {@code 404 (Not Found)} if the poste is not found,
     * or with status {@code 500 (Internal Server Error)} if the poste couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/{id}", consumes = { "application/json", "application/merge-patch+json" })
    public ResponseEntity<Poste> partialUpdatePoste(
        @PathVariable(value = "id", required = false) final Long id,
        @NotNull @RequestBody Poste poste
    ) throws URISyntaxException {
        LOG.debug("REST request to partial update Poste partially : {}, {}", id, poste);
        if (poste.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, poste.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!posteRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<Poste> result = posteRepository
            .findById(poste.getId())
            .map(existingPoste -> {
                if (poste.getNomPoste() != null) {
                    existingPoste.setNomPoste(poste.getNomPoste());
                }

                return existingPoste;
            })
            .map(posteRepository::save);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, poste.getId().toString())
        );
    }

    /**
     * {@code GET  /postes} : get all the postes.
     *
     * @param pageable the pagination information.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of postes in body.
     */
    @GetMapping("")
    public ResponseEntity<List<Poste>> getAllPostes(@org.springdoc.core.annotations.ParameterObject Pageable pageable) {
        LOG.debug("REST request to get a page of Postes");
        Page<Poste> page = posteRepository.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * {@code GET  /postes/:id} : get the "id" poste.
     *
     * @param id the id of the poste to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the poste, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/{id}")
    public ResponseEntity<Poste> getPoste(@PathVariable("id") Long id) {
        LOG.debug("REST request to get Poste : {}", id);
        Optional<Poste> poste = posteRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(poste);
    }

    /**
     * {@code DELETE  /postes/:id} : delete the "id" poste.
     *
     * @param id the id of the poste to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletePoste(@PathVariable("id") Long id) {
        LOG.debug("REST request to delete Poste : {}", id);
        posteRepository.deleteById(id);
        return ResponseEntity.noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString()))
            .build();
    }
}
