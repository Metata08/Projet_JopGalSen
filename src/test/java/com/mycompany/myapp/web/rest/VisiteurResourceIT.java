package com.mycompany.myapp.web.rest;

import static com.mycompany.myapp.domain.VisiteurAsserts.*;
import static com.mycompany.myapp.web.rest.TestUtil.createUpdateProxyForBean;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.mycompany.myapp.IntegrationTest;
import com.mycompany.myapp.domain.Visiteur;
import com.mycompany.myapp.repository.VisiteurRepository;
import jakarta.persistence.EntityManager;
import java.util.Random;
import java.util.concurrent.atomic.AtomicLong;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;

/**
 * Integration tests for the {@link VisiteurResource} REST controller.
 */
@IntegrationTest
@AutoConfigureMockMvc
@WithMockUser
class VisiteurResourceIT {

    private static final String DEFAULT_CV = "AAAAAAAAAA";
    private static final String UPDATED_CV = "BBBBBBBBBB";

    private static final String ENTITY_API_URL = "/api/visiteurs";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    private static Random random = new Random();
    private static AtomicLong longCount = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    @Autowired
    private ObjectMapper om;

    @Autowired
    private VisiteurRepository visiteurRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restVisiteurMockMvc;

    private Visiteur visiteur;

    private Visiteur insertedVisiteur;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Visiteur createEntity() {
        return new Visiteur().cv(DEFAULT_CV);
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Visiteur createUpdatedEntity() {
        return new Visiteur().cv(UPDATED_CV);
    }

    @BeforeEach
    void initTest() {
        visiteur = createEntity();
    }

    @AfterEach
    void cleanup() {
        if (insertedVisiteur != null) {
            visiteurRepository.delete(insertedVisiteur);
            insertedVisiteur = null;
        }
    }

    @Test
    @Transactional
    void createVisiteur() throws Exception {
        long databaseSizeBeforeCreate = getRepositoryCount();
        // Create the Visiteur
        var returnedVisiteur = om.readValue(
            restVisiteurMockMvc
                .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(om.writeValueAsBytes(visiteur)))
                .andExpect(status().isCreated())
                .andReturn()
                .getResponse()
                .getContentAsString(),
            Visiteur.class
        );

        // Validate the Visiteur in the database
        assertIncrementedRepositoryCount(databaseSizeBeforeCreate);
        assertVisiteurUpdatableFieldsEquals(returnedVisiteur, getPersistedVisiteur(returnedVisiteur));

        insertedVisiteur = returnedVisiteur;
    }

    @Test
    @Transactional
    void createVisiteurWithExistingId() throws Exception {
        // Create the Visiteur with an existing ID
        visiteur.setId(1L);

        long databaseSizeBeforeCreate = getRepositoryCount();

        // An entity with an existing ID cannot be created, so this API call must fail
        restVisiteurMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(om.writeValueAsBytes(visiteur)))
            .andExpect(status().isBadRequest());

        // Validate the Visiteur in the database
        assertSameRepositoryCount(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    void getAllVisiteurs() throws Exception {
        // Initialize the database
        insertedVisiteur = visiteurRepository.saveAndFlush(visiteur);

        // Get all the visiteurList
        restVisiteurMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(visiteur.getId().intValue())))
            .andExpect(jsonPath("$.[*].cv").value(hasItem(DEFAULT_CV)));
    }

    @Test
    @Transactional
    void getVisiteur() throws Exception {
        // Initialize the database
        insertedVisiteur = visiteurRepository.saveAndFlush(visiteur);

        // Get the visiteur
        restVisiteurMockMvc
            .perform(get(ENTITY_API_URL_ID, visiteur.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(visiteur.getId().intValue()))
            .andExpect(jsonPath("$.cv").value(DEFAULT_CV));
    }

    @Test
    @Transactional
    void getNonExistingVisiteur() throws Exception {
        // Get the visiteur
        restVisiteurMockMvc.perform(get(ENTITY_API_URL_ID, Long.MAX_VALUE)).andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    void putExistingVisiteur() throws Exception {
        // Initialize the database
        insertedVisiteur = visiteurRepository.saveAndFlush(visiteur);

        long databaseSizeBeforeUpdate = getRepositoryCount();

        // Update the visiteur
        Visiteur updatedVisiteur = visiteurRepository.findById(visiteur.getId()).orElseThrow();
        // Disconnect from session so that the updates on updatedVisiteur are not directly saved in db
        em.detach(updatedVisiteur);
        updatedVisiteur.cv(UPDATED_CV);

        restVisiteurMockMvc
            .perform(
                put(ENTITY_API_URL_ID, updatedVisiteur.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(om.writeValueAsBytes(updatedVisiteur))
            )
            .andExpect(status().isOk());

        // Validate the Visiteur in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
        assertPersistedVisiteurToMatchAllProperties(updatedVisiteur);
    }

    @Test
    @Transactional
    void putNonExistingVisiteur() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        visiteur.setId(longCount.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restVisiteurMockMvc
            .perform(
                put(ENTITY_API_URL_ID, visiteur.getId()).contentType(MediaType.APPLICATION_JSON).content(om.writeValueAsBytes(visiteur))
            )
            .andExpect(status().isBadRequest());

        // Validate the Visiteur in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithIdMismatchVisiteur() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        visiteur.setId(longCount.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restVisiteurMockMvc
            .perform(
                put(ENTITY_API_URL_ID, longCount.incrementAndGet())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(om.writeValueAsBytes(visiteur))
            )
            .andExpect(status().isBadRequest());

        // Validate the Visiteur in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithMissingIdPathParamVisiteur() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        visiteur.setId(longCount.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restVisiteurMockMvc
            .perform(put(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(om.writeValueAsBytes(visiteur)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the Visiteur in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void partialUpdateVisiteurWithPatch() throws Exception {
        // Initialize the database
        insertedVisiteur = visiteurRepository.saveAndFlush(visiteur);

        long databaseSizeBeforeUpdate = getRepositoryCount();

        // Update the visiteur using partial update
        Visiteur partialUpdatedVisiteur = new Visiteur();
        partialUpdatedVisiteur.setId(visiteur.getId());

        restVisiteurMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedVisiteur.getId())
                    .contentType("application/merge-patch+json")
                    .content(om.writeValueAsBytes(partialUpdatedVisiteur))
            )
            .andExpect(status().isOk());

        // Validate the Visiteur in the database

        assertSameRepositoryCount(databaseSizeBeforeUpdate);
        assertVisiteurUpdatableFieldsEquals(createUpdateProxyForBean(partialUpdatedVisiteur, visiteur), getPersistedVisiteur(visiteur));
    }

    @Test
    @Transactional
    void fullUpdateVisiteurWithPatch() throws Exception {
        // Initialize the database
        insertedVisiteur = visiteurRepository.saveAndFlush(visiteur);

        long databaseSizeBeforeUpdate = getRepositoryCount();

        // Update the visiteur using partial update
        Visiteur partialUpdatedVisiteur = new Visiteur();
        partialUpdatedVisiteur.setId(visiteur.getId());

        partialUpdatedVisiteur.cv(UPDATED_CV);

        restVisiteurMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedVisiteur.getId())
                    .contentType("application/merge-patch+json")
                    .content(om.writeValueAsBytes(partialUpdatedVisiteur))
            )
            .andExpect(status().isOk());

        // Validate the Visiteur in the database

        assertSameRepositoryCount(databaseSizeBeforeUpdate);
        assertVisiteurUpdatableFieldsEquals(partialUpdatedVisiteur, getPersistedVisiteur(partialUpdatedVisiteur));
    }

    @Test
    @Transactional
    void patchNonExistingVisiteur() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        visiteur.setId(longCount.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restVisiteurMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, visiteur.getId())
                    .contentType("application/merge-patch+json")
                    .content(om.writeValueAsBytes(visiteur))
            )
            .andExpect(status().isBadRequest());

        // Validate the Visiteur in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithIdMismatchVisiteur() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        visiteur.setId(longCount.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restVisiteurMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, longCount.incrementAndGet())
                    .contentType("application/merge-patch+json")
                    .content(om.writeValueAsBytes(visiteur))
            )
            .andExpect(status().isBadRequest());

        // Validate the Visiteur in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithMissingIdPathParamVisiteur() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        visiteur.setId(longCount.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restVisiteurMockMvc
            .perform(patch(ENTITY_API_URL).contentType("application/merge-patch+json").content(om.writeValueAsBytes(visiteur)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the Visiteur in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void deleteVisiteur() throws Exception {
        // Initialize the database
        insertedVisiteur = visiteurRepository.saveAndFlush(visiteur);

        long databaseSizeBeforeDelete = getRepositoryCount();

        // Delete the visiteur
        restVisiteurMockMvc
            .perform(delete(ENTITY_API_URL_ID, visiteur.getId()).accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        assertDecrementedRepositoryCount(databaseSizeBeforeDelete);
    }

    protected long getRepositoryCount() {
        return visiteurRepository.count();
    }

    protected void assertIncrementedRepositoryCount(long countBefore) {
        assertThat(countBefore + 1).isEqualTo(getRepositoryCount());
    }

    protected void assertDecrementedRepositoryCount(long countBefore) {
        assertThat(countBefore - 1).isEqualTo(getRepositoryCount());
    }

    protected void assertSameRepositoryCount(long countBefore) {
        assertThat(countBefore).isEqualTo(getRepositoryCount());
    }

    protected Visiteur getPersistedVisiteur(Visiteur visiteur) {
        return visiteurRepository.findById(visiteur.getId()).orElseThrow();
    }

    protected void assertPersistedVisiteurToMatchAllProperties(Visiteur expectedVisiteur) {
        assertVisiteurAllPropertiesEquals(expectedVisiteur, getPersistedVisiteur(expectedVisiteur));
    }

    protected void assertPersistedVisiteurToMatchUpdatableProperties(Visiteur expectedVisiteur) {
        assertVisiteurAllUpdatablePropertiesEquals(expectedVisiteur, getPersistedVisiteur(expectedVisiteur));
    }
}
