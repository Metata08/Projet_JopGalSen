package com.mycompany.myapp.web.rest;

import com.mycompany.myapp.repository.OffreRepository;
import com.mycompany.myapp.security.AuthoritiesConstants;
import com.mycompany.myapp.service.OffreService;
import com.mycompany.myapp.service.dto.OffreDTO;
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
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;
import tech.jhipster.web.util.HeaderUtil;
import tech.jhipster.web.util.PaginationUtil;
import tech.jhipster.web.util.ResponseUtil;



/**
 * REST controller for managing {@link com.mycompany.myapp.domain.Offre}.
 */
@RestController
@RequestMapping("/api/offres")
public class OffreResource {

    private static final Logger LOG = LoggerFactory.getLogger(OffreResource.class);

    private static final String ENTITY_NAME = "offre";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final OffreService offreService;

    private final OffreRepository offreRepository;

    public OffreResource(OffreService offreService, OffreRepository offreRepository) {
        this.offreService = offreService;
        this.offreRepository = offreRepository;
    }

    /**
     * {@code POST  /offres} : Create a new offre.
     *
     * @param offreDTO the offreDTO to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new offreDTO, or with status {@code 400 (Bad Request)} if the offre has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("")
    @PreAuthorize("hasAuthority(\"" + AuthoritiesConstants.RECRUTEUR + "\")")
    public ResponseEntity<OffreDTO> createOffre(@Valid @RequestBody OffreDTO offreDTO) throws URISyntaxException {
        LOG.debug("REST request to save Offre : {}", offreDTO);
        if (offreDTO.getId() != null) {
            throw new BadRequestAlertException("A new offre cannot already have an ID", ENTITY_NAME, "idexists");
        }
        offreDTO = offreService.save(offreDTO);
        return ResponseEntity.created(new URI("/api/offres/" + offreDTO.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, offreDTO.getId().toString()))
            .body(offreDTO);
    }

    /**Recuperer tous les offres 
    @GetMapping("")
    public ResponseEntity<List<OffreDTO>> getAllOffres(
        @org.springdoc.core.annotations.ParameterObject Pageable pageable
    ) {
        LOG.debug("REST request to get a page of Offres");
        Page<OffreDTO> page = offreService.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }*/
    /**
     * {@code PUT  /offres/:id} : Updates an existing offre.
     *
     * @param id the id of the offreDTO to save.
     * @param offreDTO the offreDTO to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated offreDTO,
     * or with status {@code 400 (Bad Request)} if the offreDTO is not valid,
     * or with status {@code 500 (Internal Server Error)} if the offreDTO couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/{id}")
    @PreAuthorize("hasAuthority(\"" + AuthoritiesConstants.RECRUTEUR + "\")")
    public ResponseEntity<OffreDTO> updateOffre(
        @PathVariable(value = "id", required = false) final Long id,
        @Valid @RequestBody OffreDTO offreDTO
    ) throws URISyntaxException {
        LOG.debug("REST request to update Offre : {}, {}", id, offreDTO);
        if (offreDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, offreDTO.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!offreRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        offreDTO = offreService.update(offreDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, offreDTO.getId().toString()))
            .body(offreDTO);
    }

    /**
     * {@code PATCH  /offres/:id} : Partial updates given fields of an existing offre, field will ignore if it is null
     *
     * @param id the id of the offreDTO to save.
     * @param offreDTO the offreDTO to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated offreDTO,
     * or with status {@code 400 (Bad Request)} if the offreDTO is not valid,
     * or with status {@code 404 (Not Found)} if the offreDTO is not found,
     * or with status {@code 500 (Internal Server Error)} if the offreDTO couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/{id}", consumes = { "application/json", "application/merge-patch+json" })
    @PreAuthorize("hasAnyAuthority(\"" + AuthoritiesConstants.RECRUTEUR + "\", \"" + AuthoritiesConstants.ADMIN + "\")")
    public ResponseEntity<OffreDTO> partialUpdateOffre(
        @PathVariable(value = "id", required = false) final Long id,
        @NotNull @RequestBody OffreDTO offreDTO
    ) throws URISyntaxException {
        LOG.debug("REST request to partial update Offre partially : {}, {}", id, offreDTO);
        
        
      



        if (offreDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, offreDTO.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!offreRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<OffreDTO> result = offreService.partialUpdate(offreDTO);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, offreDTO.getId().toString())
        );
    }

    /**
     * {@code GET  /offres} : get all the offres.
     *
     * @param pageable the pagination information.
     * @param eagerload flag to eager load entities from relationships (This is applicable for many-to-many).
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of offres in body.
     */
    @GetMapping("")
    public ResponseEntity<List<OffreDTO>> getAllOffres(
        @org.springdoc.core.annotations.ParameterObject Pageable pageable,
        @RequestParam(name = "eagerload", required = false, defaultValue = "true") boolean eagerload
    ) {
        LOG.debug("REST request to get a page of Offres");
        Page<OffreDTO> page;
        if (eagerload) {
            page = offreService.findAllWithEagerRelationships(pageable);
        } else {
            page = offreService.findAll(pageable);
        }
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * {@code GET  /offres/:id} : get the "id" offre.
     *
     * @param id the id of the offreDTO to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the offreDTO, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/{id}")
    public ResponseEntity<OffreDTO> getOffre(@PathVariable("id") Long id) {
        LOG.debug("REST request to get Offre : {}", id);
        Optional<OffreDTO> offreDTO = offreService.findOne(id);
        return ResponseUtil.wrapOrNotFound(offreDTO);
    }

    /**
     * {@code DELETE  /offres/:id} : delete the "id" offre.
     *
     * @param id the id of the offreDTO to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/{id}")
    @PreAuthorize("hasAuthority(\"" + AuthoritiesConstants.RECRUTEUR + "\")")
    public ResponseEntity<Void> deleteOffre(@PathVariable("id") Long id) {
        LOG.debug("REST request to delete Offre : {}", id);
        offreService.delete(id);
        return ResponseEntity.noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString()))
            .build();
    }
}
