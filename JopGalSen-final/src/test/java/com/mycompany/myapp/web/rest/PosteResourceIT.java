package com.mycompany.myapp.web.rest;

import static com.mycompany.myapp.domain.PosteAsserts.*;
import static com.mycompany.myapp.web.rest.TestUtil.createUpdateProxyForBean;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.mycompany.myapp.IntegrationTest;
import com.mycompany.myapp.domain.Poste;
import com.mycompany.myapp.repository.PosteRepository;
import com.mycompany.myapp.service.PosteService;
import com.mycompany.myapp.service.dto.PosteDTO;
import com.mycompany.myapp.service.mapper.PosteMapper;
import jakarta.persistence.EntityManager;
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
 * Integration tests for the {@link PosteResource} REST controller.
 */
@IntegrationTest
@ExtendWith(MockitoExtension.class)
@AutoConfigureMockMvc
@WithMockUser
class PosteResourceIT {

    private static final String DEFAULT_NOM_POSTE = "AAAAAAAAAA";
    private static final String UPDATED_NOM_POSTE = "BBBBBBBBBB";

    private static final String ENTITY_API_URL = "/api/postes";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    private static Random random = new Random();
    private static AtomicLong longCount = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    @Autowired
    private ObjectMapper om;

    @Autowired
    private PosteRepository posteRepository;

    @Mock
    private PosteRepository posteRepositoryMock;

    @Autowired
    private PosteMapper posteMapper;

    @Mock
    private PosteService posteServiceMock;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restPosteMockMvc;

    private Poste poste;

    private Poste insertedPoste;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Poste createEntity() {
        return new Poste().nomPoste(DEFAULT_NOM_POSTE);
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Poste createUpdatedEntity() {
        return new Poste().nomPoste(UPDATED_NOM_POSTE);
    }

    @BeforeEach
    void initTest() {
        poste = createEntity();
    }

    @AfterEach
    void cleanup() {
        if (insertedPoste != null) {
            posteRepository.delete(insertedPoste);
            insertedPoste = null;
        }
    }

    @Test
    @Transactional
    void createPoste() throws Exception {
        long databaseSizeBeforeCreate = getRepositoryCount();
        // Create the Poste
        PosteDTO posteDTO = posteMapper.toDto(poste);
        var returnedPosteDTO = om.readValue(
            restPosteMockMvc
                .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(om.writeValueAsBytes(posteDTO)))
                .andExpect(status().isCreated())
                .andReturn()
                .getResponse()
                .getContentAsString(),
            PosteDTO.class
        );

        // Validate the Poste in the database
        assertIncrementedRepositoryCount(databaseSizeBeforeCreate);
        var returnedPoste = posteMapper.toEntity(returnedPosteDTO);
        assertPosteUpdatableFieldsEquals(returnedPoste, getPersistedPoste(returnedPoste));

        insertedPoste = returnedPoste;
    }

    @Test
    @Transactional
    void createPosteWithExistingId() throws Exception {
        // Create the Poste with an existing ID
        poste.setId(1L);
        PosteDTO posteDTO = posteMapper.toDto(poste);

        long databaseSizeBeforeCreate = getRepositoryCount();

        // An entity with an existing ID cannot be created, so this API call must fail
        restPosteMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(om.writeValueAsBytes(posteDTO)))
            .andExpect(status().isBadRequest());

        // Validate the Poste in the database
        assertSameRepositoryCount(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    void checkNomPosteIsRequired() throws Exception {
        long databaseSizeBeforeTest = getRepositoryCount();
        // set the field null
        poste.setNomPoste(null);

        // Create the Poste, which fails.
        PosteDTO posteDTO = posteMapper.toDto(poste);

        restPosteMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(om.writeValueAsBytes(posteDTO)))
            .andExpect(status().isBadRequest());

        assertSameRepositoryCount(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    void getAllPostes() throws Exception {
        // Initialize the database
        insertedPoste = posteRepository.saveAndFlush(poste);

        // Get all the posteList
        restPosteMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(poste.getId().intValue())))
            .andExpect(jsonPath("$.[*].nomPoste").value(hasItem(DEFAULT_NOM_POSTE)));
    }

    @SuppressWarnings({ "unchecked" })
    void getAllPostesWithEagerRelationshipsIsEnabled() throws Exception {
        when(posteServiceMock.findAllWithEagerRelationships(any())).thenReturn(new PageImpl(new ArrayList<>()));

        restPosteMockMvc.perform(get(ENTITY_API_URL + "?eagerload=true")).andExpect(status().isOk());

        verify(posteServiceMock, times(1)).findAllWithEagerRelationships(any());
    }

    @SuppressWarnings({ "unchecked" })
    void getAllPostesWithEagerRelationshipsIsNotEnabled() throws Exception {
        when(posteServiceMock.findAllWithEagerRelationships(any())).thenReturn(new PageImpl(new ArrayList<>()));

        restPosteMockMvc.perform(get(ENTITY_API_URL + "?eagerload=false")).andExpect(status().isOk());
        verify(posteRepositoryMock, times(1)).findAll(any(Pageable.class));
    }

    @Test
    @Transactional
    void getPoste() throws Exception {
        // Initialize the database
        insertedPoste = posteRepository.saveAndFlush(poste);

        // Get the poste
        restPosteMockMvc
            .perform(get(ENTITY_API_URL_ID, poste.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(poste.getId().intValue()))
            .andExpect(jsonPath("$.nomPoste").value(DEFAULT_NOM_POSTE));
    }

    @Test
    @Transactional
    void getNonExistingPoste() throws Exception {
        // Get the poste
        restPosteMockMvc.perform(get(ENTITY_API_URL_ID, Long.MAX_VALUE)).andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    void putExistingPoste() throws Exception {
        // Initialize the database
        insertedPoste = posteRepository.saveAndFlush(poste);

        long databaseSizeBeforeUpdate = getRepositoryCount();

        // Update the poste
        Poste updatedPoste = posteRepository.findById(poste.getId()).orElseThrow();
        // Disconnect from session so that the updates on updatedPoste are not directly saved in db
        em.detach(updatedPoste);
        updatedPoste.nomPoste(UPDATED_NOM_POSTE);
        PosteDTO posteDTO = posteMapper.toDto(updatedPoste);

        restPosteMockMvc
            .perform(
                put(ENTITY_API_URL_ID, posteDTO.getId()).contentType(MediaType.APPLICATION_JSON).content(om.writeValueAsBytes(posteDTO))
            )
            .andExpect(status().isOk());

        // Validate the Poste in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
        assertPersistedPosteToMatchAllProperties(updatedPoste);
    }

    @Test
    @Transactional
    void putNonExistingPoste() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        poste.setId(longCount.incrementAndGet());

        // Create the Poste
        PosteDTO posteDTO = posteMapper.toDto(poste);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restPosteMockMvc
            .perform(
                put(ENTITY_API_URL_ID, posteDTO.getId()).contentType(MediaType.APPLICATION_JSON).content(om.writeValueAsBytes(posteDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the Poste in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithIdMismatchPoste() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        poste.setId(longCount.incrementAndGet());

        // Create the Poste
        PosteDTO posteDTO = posteMapper.toDto(poste);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restPosteMockMvc
            .perform(
                put(ENTITY_API_URL_ID, longCount.incrementAndGet())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(om.writeValueAsBytes(posteDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the Poste in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithMissingIdPathParamPoste() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        poste.setId(longCount.incrementAndGet());

        // Create the Poste
        PosteDTO posteDTO = posteMapper.toDto(poste);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restPosteMockMvc
            .perform(put(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(om.writeValueAsBytes(posteDTO)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the Poste in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void partialUpdatePosteWithPatch() throws Exception {
        // Initialize the database
        insertedPoste = posteRepository.saveAndFlush(poste);

        long databaseSizeBeforeUpdate = getRepositoryCount();

        // Update the poste using partial update
        Poste partialUpdatedPoste = new Poste();
        partialUpdatedPoste.setId(poste.getId());

        partialUpdatedPoste.nomPoste(UPDATED_NOM_POSTE);

        restPosteMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedPoste.getId())
                    .contentType("application/merge-patch+json")
                    .content(om.writeValueAsBytes(partialUpdatedPoste))
            )
            .andExpect(status().isOk());

        // Validate the Poste in the database

        assertSameRepositoryCount(databaseSizeBeforeUpdate);
        assertPosteUpdatableFieldsEquals(createUpdateProxyForBean(partialUpdatedPoste, poste), getPersistedPoste(poste));
    }

    @Test
    @Transactional
    void fullUpdatePosteWithPatch() throws Exception {
        // Initialize the database
        insertedPoste = posteRepository.saveAndFlush(poste);

        long databaseSizeBeforeUpdate = getRepositoryCount();

        // Update the poste using partial update
        Poste partialUpdatedPoste = new Poste();
        partialUpdatedPoste.setId(poste.getId());

        partialUpdatedPoste.nomPoste(UPDATED_NOM_POSTE);

        restPosteMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedPoste.getId())
                    .contentType("application/merge-patch+json")
                    .content(om.writeValueAsBytes(partialUpdatedPoste))
            )
            .andExpect(status().isOk());

        // Validate the Poste in the database

        assertSameRepositoryCount(databaseSizeBeforeUpdate);
        assertPosteUpdatableFieldsEquals(partialUpdatedPoste, getPersistedPoste(partialUpdatedPoste));
    }

    @Test
    @Transactional
    void patchNonExistingPoste() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        poste.setId(longCount.incrementAndGet());

        // Create the Poste
        PosteDTO posteDTO = posteMapper.toDto(poste);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restPosteMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, posteDTO.getId())
                    .contentType("application/merge-patch+json")
                    .content(om.writeValueAsBytes(posteDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the Poste in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithIdMismatchPoste() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        poste.setId(longCount.incrementAndGet());

        // Create the Poste
        PosteDTO posteDTO = posteMapper.toDto(poste);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restPosteMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, longCount.incrementAndGet())
                    .contentType("application/merge-patch+json")
                    .content(om.writeValueAsBytes(posteDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the Poste in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithMissingIdPathParamPoste() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        poste.setId(longCount.incrementAndGet());

        // Create the Poste
        PosteDTO posteDTO = posteMapper.toDto(poste);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restPosteMockMvc
            .perform(patch(ENTITY_API_URL).contentType("application/merge-patch+json").content(om.writeValueAsBytes(posteDTO)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the Poste in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void deletePoste() throws Exception {
        // Initialize the database
        insertedPoste = posteRepository.saveAndFlush(poste);

        long databaseSizeBeforeDelete = getRepositoryCount();

        // Delete the poste
        restPosteMockMvc
            .perform(delete(ENTITY_API_URL_ID, poste.getId()).accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        assertDecrementedRepositoryCount(databaseSizeBeforeDelete);
    }

    protected long getRepositoryCount() {
        return posteRepository.count();
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

    protected Poste getPersistedPoste(Poste poste) {
        return posteRepository.findById(poste.getId()).orElseThrow();
    }

    protected void assertPersistedPosteToMatchAllProperties(Poste expectedPoste) {
        assertPosteAllPropertiesEquals(expectedPoste, getPersistedPoste(expectedPoste));
    }

    protected void assertPersistedPosteToMatchUpdatableProperties(Poste expectedPoste) {
        assertPosteAllUpdatablePropertiesEquals(expectedPoste, getPersistedPoste(expectedPoste));
    }
}
