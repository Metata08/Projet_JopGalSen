package com.mycompany.myapp.web.rest;

import static com.mycompany.myapp.domain.OffreAsserts.*;
import static com.mycompany.myapp.web.rest.TestUtil.createUpdateProxyForBean;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.mockito.ArgumentMatchers.*;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.mycompany.myapp.IntegrationTest;
import com.mycompany.myapp.domain.Offre;
import com.mycompany.myapp.domain.enumeration.TypeContrat;
import com.mycompany.myapp.repository.OffreRepository;
import com.mycompany.myapp.security.AuthoritiesConstants;
import com.mycompany.myapp.service.OffreService;
import com.mycompany.myapp.service.dto.OffreDTO;
import com.mycompany.myapp.service.mapper.OffreMapper;
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
 * Integration tests for the {@link OffreResource} REST controller.
 */
@IntegrationTest
@ExtendWith(MockitoExtension.class)
@AutoConfigureMockMvc
@WithMockUser
class OffreResourceIT {

    private static final String DEFAULT_TITRE = "AAAAAAAAAA";
    private static final String UPDATED_TITRE = "BBBBBBBBBB";

    private static final String DEFAULT_DESCRIPTION = "AAAAAAAAAA";
    private static final String UPDATED_DESCRIPTION = "BBBBBBBBBB";

    private static final String DEFAULT_ENTREPRISE = "AAAAAAAAAA";
    private static final String UPDATED_ENTREPRISE = "BBBBBBBBBB";

    private static final String DEFAULT_LOCALITE = "AAAAAAAAAA";
    private static final String UPDATED_LOCALITE = "BBBBBBBBBB";

    private static final String DEFAULT_CATEGORIE = "AAAAAAAAAA";
    private static final String UPDATED_CATEGORIE = "BBBBBBBBBB";

    private static final String DEFAULT_EXPERIENCE = "AAAAAAAAAA";
    private static final String UPDATED_EXPERIENCE = "BBBBBBBBBB";

    private static final String DEFAULT_EXIGENCES = "AAAAAAAAAA";
    private static final String UPDATED_EXIGENCES = "BBBBBBBBBB";

    private static final String DEFAULT_BENEFICE = "AAAAAAAAAA";
    private static final String UPDATED_BENEFICE = "BBBBBBBBBB";

    private static final LocalDate DEFAULT_DATE_DE_POSTULE = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_DATE_DE_POSTULE = LocalDate.now(ZoneId.systemDefault());

    private static final LocalDate DEFAULT_DATE_DE_FIN = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_DATE_DE_FIN = LocalDate.now(ZoneId.systemDefault());

    private static final Boolean DEFAULT_URGENT = false;
    private static final Boolean UPDATED_URGENT = true;

    private static final Integer DEFAULT_REMUNERATION = 1;
    private static final Integer UPDATED_REMUNERATION = 2;

    private static final TypeContrat DEFAULT_CONTRAT = TypeContrat.CDD;
    private static final TypeContrat UPDATED_CONTRAT = TypeContrat.CDI;

    private static final String ENTITY_API_URL = "/api/offres";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    private static Random random = new Random();
    private static AtomicLong longCount = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    @Autowired
    private ObjectMapper om;

    @Autowired
    private OffreRepository offreRepository;

    @Mock
    private OffreRepository offreRepositoryMock;

    @Autowired
    private OffreMapper offreMapper;

    @Mock
    private OffreService offreServiceMock;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restOffreMockMvc;

    private Offre offre;

    private Offre insertedOffre;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Offre createEntity() {
        return new Offre()
            .titre(DEFAULT_TITRE)
            .description(DEFAULT_DESCRIPTION)
            .entreprise(DEFAULT_ENTREPRISE)
            .localite(DEFAULT_LOCALITE)
            .categorie(DEFAULT_CATEGORIE)
            .experience(DEFAULT_EXPERIENCE)
            .exigences(DEFAULT_EXIGENCES)
            .benefice(DEFAULT_BENEFICE)
            .dateDePostule(DEFAULT_DATE_DE_POSTULE)
            .dateDeFin(DEFAULT_DATE_DE_FIN)
            .urgent(DEFAULT_URGENT)
            .remuneration(DEFAULT_REMUNERATION)
            .contrat(DEFAULT_CONTRAT);
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Offre createUpdatedEntity() {
        return new Offre()
            .titre(UPDATED_TITRE)
            .description(UPDATED_DESCRIPTION)
            .entreprise(UPDATED_ENTREPRISE)
            .localite(UPDATED_LOCALITE)
            .categorie(UPDATED_CATEGORIE)
            .experience(UPDATED_EXPERIENCE)
            .exigences(UPDATED_EXIGENCES)
            .benefice(UPDATED_BENEFICE)
            .dateDePostule(UPDATED_DATE_DE_POSTULE)
            .dateDeFin(UPDATED_DATE_DE_FIN)
            .urgent(UPDATED_URGENT)
            .remuneration(UPDATED_REMUNERATION)
            .contrat(UPDATED_CONTRAT);
    }

    @BeforeEach
    void initTest() {
        offre = createEntity();
    }

    @AfterEach
    void cleanup() {
        if (insertedOffre != null) {
            offreRepository.delete(insertedOffre);
            insertedOffre = null;
        }
    }

    @Test
    @Transactional
    @WithMockUser(authorities = AuthoritiesConstants.RECRUTEUR)
    void createOffre() throws Exception {
        long databaseSizeBeforeCreate = getRepositoryCount();
        // Create the Offre
        OffreDTO offreDTO = offreMapper.toDto(offre);
        var returnedOffreDTO = om.readValue(
            restOffreMockMvc
                .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(om.writeValueAsBytes(offreDTO)))
                .andExpect(status().isCreated())
                .andReturn()
                .getResponse()
                .getContentAsString(),
            OffreDTO.class
        );

        // Validate the Offre in the database
        assertIncrementedRepositoryCount(databaseSizeBeforeCreate);
        var returnedOffre = offreMapper.toEntity(returnedOffreDTO);
        assertOffreUpdatableFieldsEquals(returnedOffre, getPersistedOffre(returnedOffre));

        insertedOffre = returnedOffre;
    }

    @Test
    @Transactional
    @WithMockUser(authorities = AuthoritiesConstants.RECRUTEUR)
    void createOffreWithExistingId() throws Exception {
        // Create the Offre with an existing ID
        offre.setId(1L);
        OffreDTO offreDTO = offreMapper.toDto(offre);

        long databaseSizeBeforeCreate = getRepositoryCount();

        // An entity with an existing ID cannot be created, so this API call must fail
        restOffreMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(om.writeValueAsBytes(offreDTO)))
            .andExpect(status().isBadRequest());

        // Validate the Offre in the database
        assertSameRepositoryCount(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    void checkTitreIsRequired() throws Exception {
        long databaseSizeBeforeTest = getRepositoryCount();
        // set the field null
        offre.setTitre(null);

        // Create the Offre, which fails.
        OffreDTO offreDTO = offreMapper.toDto(offre);

        restOffreMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(om.writeValueAsBytes(offreDTO)))
            .andExpect(status().isBadRequest());

        assertSameRepositoryCount(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    void checkContratIsRequired() throws Exception {
        long databaseSizeBeforeTest = getRepositoryCount();
        // set the field null
        offre.setContrat(null);

        // Create the Offre, which fails.
        OffreDTO offreDTO = offreMapper.toDto(offre);

        restOffreMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(om.writeValueAsBytes(offreDTO)))
            .andExpect(status().isBadRequest());

        assertSameRepositoryCount(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    void getAllOffres() throws Exception {
        // Initialize the database
        insertedOffre = offreRepository.saveAndFlush(offre);

        // Get all the offreList
        restOffreMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(offre.getId().intValue())))
            .andExpect(jsonPath("$.[*].titre").value(hasItem(DEFAULT_TITRE)))
            .andExpect(jsonPath("$.[*].description").value(hasItem(DEFAULT_DESCRIPTION)))
            .andExpect(jsonPath("$.[*].entreprise").value(hasItem(DEFAULT_ENTREPRISE)))
            .andExpect(jsonPath("$.[*].localite").value(hasItem(DEFAULT_LOCALITE)))
            .andExpect(jsonPath("$.[*].categorie").value(hasItem(DEFAULT_CATEGORIE)))
            .andExpect(jsonPath("$.[*].experience").value(hasItem(DEFAULT_EXPERIENCE)))
            .andExpect(jsonPath("$.[*].exigences").value(hasItem(DEFAULT_EXIGENCES)))
            .andExpect(jsonPath("$.[*].benefice").value(hasItem(DEFAULT_BENEFICE)))
            .andExpect(jsonPath("$.[*].dateDePostule").value(hasItem(DEFAULT_DATE_DE_POSTULE.toString())))
            .andExpect(jsonPath("$.[*].dateDeFin").value(hasItem(DEFAULT_DATE_DE_FIN.toString())))
            .andExpect(jsonPath("$.[*].urgent").value(hasItem(DEFAULT_URGENT)))
            .andExpect(jsonPath("$.[*].remuneration").value(hasItem(DEFAULT_REMUNERATION)))
            .andExpect(jsonPath("$.[*].contrat").value(hasItem(DEFAULT_CONTRAT.toString())));
    }

    @SuppressWarnings({ "unchecked" })
    void getAllOffresWithEagerRelationshipsIsEnabled() throws Exception {
        when(offreServiceMock.findAllWithEagerRelationships(any())).thenReturn(new PageImpl(new ArrayList<>()));

        restOffreMockMvc.perform(get(ENTITY_API_URL + "?eagerload=true")).andExpect(status().isOk());

        verify(offreServiceMock, times(1)).findAllWithEagerRelationships(any());
    }

    @SuppressWarnings({ "unchecked" })
    void getAllOffresWithEagerRelationshipsIsNotEnabled() throws Exception {
        when(offreServiceMock.findAllWithEagerRelationships(any())).thenReturn(new PageImpl(new ArrayList<>()));

        restOffreMockMvc.perform(get(ENTITY_API_URL + "?eagerload=false")).andExpect(status().isOk());
        verify(offreRepositoryMock, times(1)).findAll(any(Pageable.class));
    }

    @Test
    @Transactional
    void getOffre() throws Exception {
        // Initialize the database
        insertedOffre = offreRepository.saveAndFlush(offre);

        // Get the offre
        restOffreMockMvc
            .perform(get(ENTITY_API_URL_ID, offre.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(offre.getId().intValue()))
            .andExpect(jsonPath("$.titre").value(DEFAULT_TITRE))
            .andExpect(jsonPath("$.description").value(DEFAULT_DESCRIPTION))
            .andExpect(jsonPath("$.entreprise").value(DEFAULT_ENTREPRISE))
            .andExpect(jsonPath("$.localite").value(DEFAULT_LOCALITE))
            .andExpect(jsonPath("$.categorie").value(DEFAULT_CATEGORIE))
            .andExpect(jsonPath("$.experience").value(DEFAULT_EXPERIENCE))
            .andExpect(jsonPath("$.exigences").value(DEFAULT_EXIGENCES))
            .andExpect(jsonPath("$.benefice").value(DEFAULT_BENEFICE))
            .andExpect(jsonPath("$.dateDePostule").value(DEFAULT_DATE_DE_POSTULE.toString()))
            .andExpect(jsonPath("$.dateDeFin").value(DEFAULT_DATE_DE_FIN.toString()))
            .andExpect(jsonPath("$.urgent").value(DEFAULT_URGENT))
            .andExpect(jsonPath("$.remuneration").value(DEFAULT_REMUNERATION))
            .andExpect(jsonPath("$.contrat").value(DEFAULT_CONTRAT.toString()));
    }

    @Test
    @Transactional
    void getNonExistingOffre() throws Exception {
        // Get the offre
        restOffreMockMvc.perform(get(ENTITY_API_URL_ID, Long.MAX_VALUE)).andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    @WithMockUser(authorities = AuthoritiesConstants.RECRUTEUR)
    void putExistingOffre() throws Exception {
        // Initialize the database
        insertedOffre = offreRepository.saveAndFlush(offre);

        long databaseSizeBeforeUpdate = getRepositoryCount();

        // Update the offre
        Offre updatedOffre = offreRepository.findById(offre.getId()).orElseThrow();
        // Disconnect from session so that the updates on updatedOffre are not directly saved in db
        em.detach(updatedOffre);
        updatedOffre
            .titre(UPDATED_TITRE)
            .description(UPDATED_DESCRIPTION)
            .entreprise(UPDATED_ENTREPRISE)
            .localite(UPDATED_LOCALITE)
            .categorie(UPDATED_CATEGORIE)
            .experience(UPDATED_EXPERIENCE)
            .exigences(UPDATED_EXIGENCES)
            .benefice(UPDATED_BENEFICE)
            .dateDePostule(UPDATED_DATE_DE_POSTULE)
            .dateDeFin(UPDATED_DATE_DE_FIN)
            .urgent(UPDATED_URGENT)
            .remuneration(UPDATED_REMUNERATION)
            .contrat(UPDATED_CONTRAT);
        OffreDTO offreDTO = offreMapper.toDto(updatedOffre);

        restOffreMockMvc
            .perform(
                put(ENTITY_API_URL_ID, offreDTO.getId()).contentType(MediaType.APPLICATION_JSON).content(om.writeValueAsBytes(offreDTO))
            )
            .andExpect(status().isOk());

        // Validate the Offre in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
        assertPersistedOffreToMatchAllProperties(updatedOffre);
    }

    @Test
    @Transactional
    @WithMockUser(authorities = AuthoritiesConstants.RECRUTEUR)
    void putNonExistingOffre() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        offre.setId(longCount.incrementAndGet());

        // Create the Offre
        OffreDTO offreDTO = offreMapper.toDto(offre);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restOffreMockMvc
            .perform(
                put(ENTITY_API_URL_ID, offreDTO.getId()).contentType(MediaType.APPLICATION_JSON).content(om.writeValueAsBytes(offreDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the Offre in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    @WithMockUser(authorities = AuthoritiesConstants.RECRUTEUR)
    void putWithIdMismatchOffre() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        offre.setId(longCount.incrementAndGet());

        // Create the Offre
        OffreDTO offreDTO = offreMapper.toDto(offre);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restOffreMockMvc
            .perform(
                put(ENTITY_API_URL_ID, longCount.incrementAndGet())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(om.writeValueAsBytes(offreDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the Offre in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithMissingIdPathParamOffre() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        offre.setId(longCount.incrementAndGet());

        // Create the Offre
        OffreDTO offreDTO = offreMapper.toDto(offre);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restOffreMockMvc
            .perform(put(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(om.writeValueAsBytes(offreDTO)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the Offre in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    @WithMockUser(authorities = AuthoritiesConstants.RECRUTEUR)
    void partialUpdateOffreWithPatch() throws Exception {
        // Initialize the database
        insertedOffre = offreRepository.saveAndFlush(offre);

        long databaseSizeBeforeUpdate = getRepositoryCount();

        // Update the offre using partial update
        Offre partialUpdatedOffre = new Offre();
        partialUpdatedOffre.setId(offre.getId());

        partialUpdatedOffre
            .description(UPDATED_DESCRIPTION)
            .localite(UPDATED_LOCALITE)
            .categorie(UPDATED_CATEGORIE)
            .experience(UPDATED_EXPERIENCE)
            .benefice(UPDATED_BENEFICE)
            .dateDePostule(UPDATED_DATE_DE_POSTULE)
            .contrat(UPDATED_CONTRAT);

        restOffreMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedOffre.getId())
                    .contentType("application/merge-patch+json")
                    .content(om.writeValueAsBytes(partialUpdatedOffre))
            )
            .andExpect(status().isOk());

        // Validate the Offre in the database

        assertSameRepositoryCount(databaseSizeBeforeUpdate);
        assertOffreUpdatableFieldsEquals(createUpdateProxyForBean(partialUpdatedOffre, offre), getPersistedOffre(offre));
    }

    @Test
    @Transactional
    @WithMockUser(authorities = AuthoritiesConstants.RECRUTEUR)
    void fullUpdateOffreWithPatch() throws Exception {
        // Initialize the database
        insertedOffre = offreRepository.saveAndFlush(offre);

        long databaseSizeBeforeUpdate = getRepositoryCount();

        // Update the offre using partial update
        Offre partialUpdatedOffre = new Offre();
        partialUpdatedOffre.setId(offre.getId());

        partialUpdatedOffre
            .titre(UPDATED_TITRE)
            .description(UPDATED_DESCRIPTION)
            .entreprise(UPDATED_ENTREPRISE)
            .localite(UPDATED_LOCALITE)
            .categorie(UPDATED_CATEGORIE)
            .experience(UPDATED_EXPERIENCE)
            .exigences(UPDATED_EXIGENCES)
            .benefice(UPDATED_BENEFICE)
            .dateDePostule(UPDATED_DATE_DE_POSTULE)
            .dateDeFin(UPDATED_DATE_DE_FIN)
            .urgent(UPDATED_URGENT)
            .remuneration(UPDATED_REMUNERATION)
            .contrat(UPDATED_CONTRAT);

        restOffreMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedOffre.getId())
                    .contentType("application/merge-patch+json")
                    .content(om.writeValueAsBytes(partialUpdatedOffre))
            )
            .andExpect(status().isOk());

        // Validate the Offre in the database

        assertSameRepositoryCount(databaseSizeBeforeUpdate);
        assertOffreUpdatableFieldsEquals(partialUpdatedOffre, getPersistedOffre(partialUpdatedOffre));
    }

    @Test
    @Transactional
    @WithMockUser(authorities = AuthoritiesConstants.RECRUTEUR)
    void patchNonExistingOffre() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        offre.setId(longCount.incrementAndGet());

        // Create the Offre
        OffreDTO offreDTO = offreMapper.toDto(offre);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restOffreMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, offreDTO.getId())
                    .contentType("application/merge-patch+json")
                    .content(om.writeValueAsBytes(offreDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the Offre in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    @WithMockUser(authorities = AuthoritiesConstants.RECRUTEUR)
    void patchWithIdMismatchOffre() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        offre.setId(longCount.incrementAndGet());

        // Create the Offre
        OffreDTO offreDTO = offreMapper.toDto(offre);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restOffreMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, longCount.incrementAndGet())
                    .contentType("application/merge-patch+json")
                    .content(om.writeValueAsBytes(offreDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the Offre in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithMissingIdPathParamOffre() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        offre.setId(longCount.incrementAndGet());

        // Create the Offre
        OffreDTO offreDTO = offreMapper.toDto(offre);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restOffreMockMvc
            .perform(patch(ENTITY_API_URL).contentType("application/merge-patch+json").content(om.writeValueAsBytes(offreDTO)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the Offre in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    @WithMockUser(authorities = AuthoritiesConstants.RECRUTEUR)
    void deleteOffre() throws Exception {
        // Initialize the database
        insertedOffre = offreRepository.saveAndFlush(offre);

        long databaseSizeBeforeDelete = getRepositoryCount();

        // Delete the offre
        restOffreMockMvc
            .perform(delete(ENTITY_API_URL_ID, offre.getId()).accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        assertDecrementedRepositoryCount(databaseSizeBeforeDelete);
    }

    protected long getRepositoryCount() {
        return offreRepository.count();
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

    protected Offre getPersistedOffre(Offre offre) {
        return offreRepository.findById(offre.getId()).orElseThrow();
    }

    protected void assertPersistedOffreToMatchAllProperties(Offre expectedOffre) {
        assertOffreAllPropertiesEquals(expectedOffre, getPersistedOffre(expectedOffre));
    }

    protected void assertPersistedOffreToMatchUpdatableProperties(Offre expectedOffre) {
        assertOffreAllUpdatablePropertiesEquals(expectedOffre, getPersistedOffre(expectedOffre));
    }
}
