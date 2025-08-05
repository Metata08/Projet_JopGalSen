package com.mycompany.myapp.web.rest;

import static com.mycompany.myapp.domain.CandidatureAsserts.*;
import static com.mycompany.myapp.web.rest.TestUtil.createUpdateProxyForBean;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.mycompany.myapp.IntegrationTest;
import com.mycompany.myapp.domain.Candidature;
import com.mycompany.myapp.domain.enumeration.Statuts;
import com.mycompany.myapp.repository.CandidatureRepository;
import com.mycompany.myapp.service.CandidatureService;
import com.mycompany.myapp.service.dto.CandidatureDTO;
import com.mycompany.myapp.service.mapper.CandidatureMapper;
import jakarta.persistence.EntityManager;
import java.time.LocalDate;
import java.time.ZoneId;
import java.util.ArrayList;
import java.util.Random;
import java.util.concurrent.atomic.AtomicLong;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;

/**
 * Integration tests for the {@link CandidatureResource} REST controller.
 */
@IntegrationTest
@ExtendWith(MockitoExtension.class)
@AutoConfigureMockMvc
@WithMockUser
class CandidatureResourceIT {

    private static final LocalDate DEFAULT_DATE_CANDIDATURE = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_DATE_CANDIDATURE = LocalDate.now(ZoneId.systemDefault());

    private static final Statuts DEFAULT_STATUT = Statuts.EN_ATTENTE;
    private static final Statuts UPDATED_STATUT = Statuts.ACCEPTEE;

    private static final String ENTITY_API_URL = "/api/candidatures";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    private static Random random = new Random();
    private static AtomicLong longCount = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    @Autowired
    private ObjectMapper om;

    @Autowired
    private CandidatureRepository candidatureRepository;

    @Mock
    private CandidatureRepository candidatureRepositoryMock;

    @Autowired
    private CandidatureMapper candidatureMapper;

    @Mock
    private CandidatureService candidatureServiceMock;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restCandidatureMockMvc;

    private Candidature candidature;

    private Candidature insertedCandidature;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Candidature createEntity() {
        return new Candidature().dateCandidature(DEFAULT_DATE_CANDIDATURE).statut(DEFAULT_STATUT);
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Candidature createUpdatedEntity() {
        return new Candidature().dateCandidature(UPDATED_DATE_CANDIDATURE).statut(UPDATED_STATUT);
    }

    @BeforeEach
    void initTest() {
        candidature = createEntity();
    }

    @AfterEach
    void cleanup() {
        if (insertedCandidature != null) {
            candidatureRepository.delete(insertedCandidature);
            insertedCandidature = null;
        }
    }

    @Test
    @Transactional
    void createCandidature() throws Exception {
        long databaseSizeBeforeCreate = getRepositoryCount();
        // Create the Candidature
        CandidatureDTO candidatureDTO = candidatureMapper.toDto(candidature);
        var returnedCandidatureDTO = om.readValue(
            restCandidatureMockMvc
                .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(om.writeValueAsBytes(candidatureDTO)))
                .andExpect(status().isCreated())
                .andReturn()
                .getResponse()
                .getContentAsString(),
            CandidatureDTO.class
        );

        // Validate the Candidature in the database
        assertIncrementedRepositoryCount(databaseSizeBeforeCreate);
        var returnedCandidature = candidatureMapper.toEntity(returnedCandidatureDTO);
        assertCandidatureUpdatableFieldsEquals(returnedCandidature, getPersistedCandidature(returnedCandidature));

        insertedCandidature = returnedCandidature;
    }

    @Test
    @Transactional
    void createCandidatureWithExistingId() throws Exception {
        // Create the Candidature with an existing ID
        candidature.setId(1L);
        CandidatureDTO candidatureDTO = candidatureMapper.toDto(candidature);

        long databaseSizeBeforeCreate = getRepositoryCount();

        // An entity with an existing ID cannot be created, so this API call must fail
        restCandidatureMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(om.writeValueAsBytes(candidatureDTO)))
            .andExpect(status().isBadRequest());

        // Validate the Candidature in the database
        assertSameRepositoryCount(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    void checkDateCandidatureIsRequired() throws Exception {
        long databaseSizeBeforeTest = getRepositoryCount();
        // set the field null
        candidature.setDateCandidature(null);

        // Create the Candidature, which fails.
        CandidatureDTO candidatureDTO = candidatureMapper.toDto(candidature);

        restCandidatureMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(om.writeValueAsBytes(candidatureDTO)))
            .andExpect(status().isBadRequest());

        assertSameRepositoryCount(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    void checkStatutIsRequired() throws Exception {
        long databaseSizeBeforeTest = getRepositoryCount();
        // set the field null
        candidature.setStatut(null);

        // Create the Candidature, which fails.
        CandidatureDTO candidatureDTO = candidatureMapper.toDto(candidature);

        restCandidatureMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(om.writeValueAsBytes(candidatureDTO)))
            .andExpect(status().isBadRequest());

        assertSameRepositoryCount(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    void getAllCandidatures() throws Exception {
        // Initialize the database
        insertedCandidature = candidatureRepository.saveAndFlush(candidature);

        // Get all the candidatureList
        restCandidatureMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(candidature.getId().intValue())))
            .andExpect(jsonPath("$.[*].dateCandidature").value(hasItem(DEFAULT_DATE_CANDIDATURE.toString())))
            .andExpect(jsonPath("$.[*].statut").value(hasItem(DEFAULT_STATUT.toString())));
    }

    @SuppressWarnings({ "unchecked" })
    void getAllCandidaturesWithEagerRelationshipsIsEnabled() throws Exception {
        when(candidatureServiceMock.findAllWithEagerRelationships(any())).thenReturn(new PageImpl(new ArrayList<>()));

        restCandidatureMockMvc.perform(get(ENTITY_API_URL + "?eagerload=true")).andExpect(status().isOk());

        verify(candidatureServiceMock, times(1)).findAllWithEagerRelationships(any());
    }

    @SuppressWarnings({ "unchecked" })
    void getAllCandidaturesWithEagerRelationshipsIsNotEnabled() throws Exception {
        when(candidatureServiceMock.findAllWithEagerRelationships(any())).thenReturn(new PageImpl(new ArrayList<>()));

        restCandidatureMockMvc.perform(get(ENTITY_API_URL + "?eagerload=false")).andExpect(status().isOk());
        verify(candidatureRepositoryMock, times(1)).findAll(any(Pageable.class));
    }

    @Test
    @Transactional
    void getCandidature() throws Exception {
        // Initialize the database
        insertedCandidature = candidatureRepository.saveAndFlush(candidature);

        // Get the candidature
        restCandidatureMockMvc
            .perform(get(ENTITY_API_URL_ID, candidature.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(candidature.getId().intValue()))
            .andExpect(jsonPath("$.dateCandidature").value(DEFAULT_DATE_CANDIDATURE.toString()))
            .andExpect(jsonPath("$.statut").value(DEFAULT_STATUT.toString()));
    }

    @Test
    @Transactional
    void getNonExistingCandidature() throws Exception {
        // Get the candidature
        restCandidatureMockMvc.perform(get(ENTITY_API_URL_ID, Long.MAX_VALUE)).andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    void putExistingCandidature() throws Exception {
        // Initialize the database
        insertedCandidature = candidatureRepository.saveAndFlush(candidature);

        long databaseSizeBeforeUpdate = getRepositoryCount();

        // Update the candidature
        Candidature updatedCandidature = candidatureRepository.findById(candidature.getId()).orElseThrow();
        // Disconnect from session so that the updates on updatedCandidature are not directly saved in db
        em.detach(updatedCandidature);
        updatedCandidature.dateCandidature(UPDATED_DATE_CANDIDATURE).statut(UPDATED_STATUT);
        CandidatureDTO candidatureDTO = candidatureMapper.toDto(updatedCandidature);

        restCandidatureMockMvc
            .perform(
                put(ENTITY_API_URL_ID, candidatureDTO.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(om.writeValueAsBytes(candidatureDTO))
            )
            .andExpect(status().isOk());

        // Validate the Candidature in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
        assertPersistedCandidatureToMatchAllProperties(updatedCandidature);
    }

    @Test
    @Transactional
    void putNonExistingCandidature() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        candidature.setId(longCount.incrementAndGet());

        // Create the Candidature
        CandidatureDTO candidatureDTO = candidatureMapper.toDto(candidature);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restCandidatureMockMvc
            .perform(
                put(ENTITY_API_URL_ID, candidatureDTO.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(om.writeValueAsBytes(candidatureDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the Candidature in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithIdMismatchCandidature() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        candidature.setId(longCount.incrementAndGet());

        // Create the Candidature
        CandidatureDTO candidatureDTO = candidatureMapper.toDto(candidature);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restCandidatureMockMvc
            .perform(
                put(ENTITY_API_URL_ID, longCount.incrementAndGet())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(om.writeValueAsBytes(candidatureDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the Candidature in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithMissingIdPathParamCandidature() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        candidature.setId(longCount.incrementAndGet());

        // Create the Candidature
        CandidatureDTO candidatureDTO = candidatureMapper.toDto(candidature);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restCandidatureMockMvc
            .perform(put(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(om.writeValueAsBytes(candidatureDTO)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the Candidature in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void partialUpdateCandidatureWithPatch() throws Exception {
        // Initialize the database
        insertedCandidature = candidatureRepository.saveAndFlush(candidature);

        long databaseSizeBeforeUpdate = getRepositoryCount();

        // Update the candidature using partial update
        Candidature partialUpdatedCandidature = new Candidature();
        partialUpdatedCandidature.setId(candidature.getId());

        partialUpdatedCandidature.dateCandidature(UPDATED_DATE_CANDIDATURE);

        restCandidatureMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedCandidature.getId())
                    .contentType("application/merge-patch+json")
                    .content(om.writeValueAsBytes(partialUpdatedCandidature))
            )
            .andExpect(status().isOk());

        // Validate the Candidature in the database

        assertSameRepositoryCount(databaseSizeBeforeUpdate);
        assertCandidatureUpdatableFieldsEquals(
            createUpdateProxyForBean(partialUpdatedCandidature, candidature),
            getPersistedCandidature(candidature)
        );
    }

    @Test
    @Transactional
    void fullUpdateCandidatureWithPatch() throws Exception {
        // Initialize the database
        insertedCandidature = candidatureRepository.saveAndFlush(candidature);

        long databaseSizeBeforeUpdate = getRepositoryCount();

        // Update the candidature using partial update
        Candidature partialUpdatedCandidature = new Candidature();
        partialUpdatedCandidature.setId(candidature.getId());

        partialUpdatedCandidature.dateCandidature(UPDATED_DATE_CANDIDATURE).statut(UPDATED_STATUT);

        restCandidatureMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedCandidature.getId())
                    .contentType("application/merge-patch+json")
                    .content(om.writeValueAsBytes(partialUpdatedCandidature))
            )
            .andExpect(status().isOk());

        // Validate the Candidature in the database

        assertSameRepositoryCount(databaseSizeBeforeUpdate);
        assertCandidatureUpdatableFieldsEquals(partialUpdatedCandidature, getPersistedCandidature(partialUpdatedCandidature));
    }

    @Test
    @Transactional
    void patchNonExistingCandidature() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        candidature.setId(longCount.incrementAndGet());

        // Create the Candidature
        CandidatureDTO candidatureDTO = candidatureMapper.toDto(candidature);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restCandidatureMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, candidatureDTO.getId())
                    .contentType("application/merge-patch+json")
                    .content(om.writeValueAsBytes(candidatureDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the Candidature in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithIdMismatchCandidature() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        candidature.setId(longCount.incrementAndGet());

        // Create the Candidature
        CandidatureDTO candidatureDTO = candidatureMapper.toDto(candidature);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restCandidatureMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, longCount.incrementAndGet())
                    .contentType("application/merge-patch+json")
                    .content(om.writeValueAsBytes(candidatureDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the Candidature in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithMissingIdPathParamCandidature() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        candidature.setId(longCount.incrementAndGet());

        // Create the Candidature
        CandidatureDTO candidatureDTO = candidatureMapper.toDto(candidature);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restCandidatureMockMvc
            .perform(patch(ENTITY_API_URL).contentType("application/merge-patch+json").content(om.writeValueAsBytes(candidatureDTO)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the Candidature in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void deleteCandidature() throws Exception {
        // Initialize the database
        insertedCandidature = candidatureRepository.saveAndFlush(candidature);

        long databaseSizeBeforeDelete = getRepositoryCount();

        // Delete the candidature
        restCandidatureMockMvc
            .perform(delete(ENTITY_API_URL_ID, candidature.getId()).accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        assertDecrementedRepositoryCount(databaseSizeBeforeDelete);
    }

    protected long getRepositoryCount() {
        return candidatureRepository.count();
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

    protected Candidature getPersistedCandidature(Candidature candidature) {
        return candidatureRepository.findById(candidature.getId()).orElseThrow();
    }

    protected void assertPersistedCandidatureToMatchAllProperties(Candidature expectedCandidature) {
        assertCandidatureAllPropertiesEquals(expectedCandidature, getPersistedCandidature(expectedCandidature));
    }

    protected void assertPersistedCandidatureToMatchUpdatableProperties(Candidature expectedCandidature) {
        assertCandidatureAllUpdatablePropertiesEquals(expectedCandidature, getPersistedCandidature(expectedCandidature));
    }
}
