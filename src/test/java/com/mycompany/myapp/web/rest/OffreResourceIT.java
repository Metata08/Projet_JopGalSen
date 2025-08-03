package com.mycompany.myapp.web.rest;

import static com.mycompany.myapp.domain.OffreAsserts.*;
import static com.mycompany.myapp.web.rest.TestUtil.createUpdateProxyForBean;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.mycompany.myapp.IntegrationTest;
import com.mycompany.myapp.domain.Offre;
import com.mycompany.myapp.domain.enumeration.TypeContrat;
import com.mycompany.myapp.repository.OffreRepository;
import jakarta.persistence.EntityManager;
import java.time.Instant;
import java.time.temporal.ChronoUnit;
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
 * Integration tests for the {@link OffreResource} REST controller.
 */
@IntegrationTest
@AutoConfigureMockMvc
@WithMockUser
class OffreResourceIT {

    private static final String DEFAULT_TITLE = "AAAAAAAAAA";
    private static final String UPDATED_TITLE = "BBBBBBBBBB";

    private static final String DEFAULT_COMPANY = "AAAAAAAAAA";
    private static final String UPDATED_COMPANY = "BBBBBBBBBB";

    private static final String DEFAULT_LOCATION = "AAAAAAAAAA";
    private static final String UPDATED_LOCATION = "BBBBBBBBBB";

    private static final TypeContrat DEFAULT_TYPE = TypeContrat.CDD;
    private static final TypeContrat UPDATED_TYPE = TypeContrat.CDI;

    private static final String DEFAULT_SALARY = "AAAAAAAAAA";
    private static final String UPDATED_SALARY = "BBBBBBBBBB";

    private static final String DEFAULT_DESCRIPTION = "AAAAAAAAAA";
    private static final String UPDATED_DESCRIPTION = "BBBBBBBBBB";

    private static final String DEFAULT_SKILLS = "AAAAAAAAAA";
    private static final String UPDATED_SKILLS = "BBBBBBBBBB";

    private static final String DEFAULT_EXPERIENCE_LEVEL = "AAAAAAAAAA";
    private static final String UPDATED_EXPERIENCE_LEVEL = "BBBBBBBBBB";

    private static final Instant DEFAULT_POSTED_DATE = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_POSTED_DATE = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    private static final String ENTITY_API_URL = "/api/offres";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    private static Random random = new Random();
    private static AtomicLong longCount = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    @Autowired
    private ObjectMapper om;

    @Autowired
    private OffreRepository offreRepository;

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
            .title(DEFAULT_TITLE)
            .company(DEFAULT_COMPANY)
            .location(DEFAULT_LOCATION)
            .type(DEFAULT_TYPE)
            .salary(DEFAULT_SALARY)
            .description(DEFAULT_DESCRIPTION)
            .skills(DEFAULT_SKILLS)
            .experienceLevel(DEFAULT_EXPERIENCE_LEVEL)
            .postedDate(DEFAULT_POSTED_DATE);
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Offre createUpdatedEntity() {
        return new Offre()
            .title(UPDATED_TITLE)
            .company(UPDATED_COMPANY)
            .location(UPDATED_LOCATION)
            .type(UPDATED_TYPE)
            .salary(UPDATED_SALARY)
            .description(UPDATED_DESCRIPTION)
            .skills(UPDATED_SKILLS)
            .experienceLevel(UPDATED_EXPERIENCE_LEVEL)
            .postedDate(UPDATED_POSTED_DATE);
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
    void createOffre() throws Exception {
        long databaseSizeBeforeCreate = getRepositoryCount();
        // Create the Offre
        var returnedOffre = om.readValue(
            restOffreMockMvc
                .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(om.writeValueAsBytes(offre)))
                .andExpect(status().isCreated())
                .andReturn()
                .getResponse()
                .getContentAsString(),
            Offre.class
        );

        // Validate the Offre in the database
        assertIncrementedRepositoryCount(databaseSizeBeforeCreate);
        assertOffreUpdatableFieldsEquals(returnedOffre, getPersistedOffre(returnedOffre));

        insertedOffre = returnedOffre;
    }

    @Test
    @Transactional
    void createOffreWithExistingId() throws Exception {
        // Create the Offre with an existing ID
        offre.setId(1L);

        long databaseSizeBeforeCreate = getRepositoryCount();

        // An entity with an existing ID cannot be created, so this API call must fail
        restOffreMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(om.writeValueAsBytes(offre)))
            .andExpect(status().isBadRequest());

        // Validate the Offre in the database
        assertSameRepositoryCount(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    void checkTitleIsRequired() throws Exception {
        long databaseSizeBeforeTest = getRepositoryCount();
        // set the field null
        offre.setTitle(null);

        // Create the Offre, which fails.

        restOffreMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(om.writeValueAsBytes(offre)))
            .andExpect(status().isBadRequest());

        assertSameRepositoryCount(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    void checkCompanyIsRequired() throws Exception {
        long databaseSizeBeforeTest = getRepositoryCount();
        // set the field null
        offre.setCompany(null);

        // Create the Offre, which fails.

        restOffreMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(om.writeValueAsBytes(offre)))
            .andExpect(status().isBadRequest());

        assertSameRepositoryCount(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    void checkTypeIsRequired() throws Exception {
        long databaseSizeBeforeTest = getRepositoryCount();
        // set the field null
        offre.setType(null);

        // Create the Offre, which fails.

        restOffreMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(om.writeValueAsBytes(offre)))
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
            .andExpect(jsonPath("$.[*].title").value(hasItem(DEFAULT_TITLE)))
            .andExpect(jsonPath("$.[*].company").value(hasItem(DEFAULT_COMPANY)))
            .andExpect(jsonPath("$.[*].location").value(hasItem(DEFAULT_LOCATION)))
            .andExpect(jsonPath("$.[*].type").value(hasItem(DEFAULT_TYPE.toString())))
            .andExpect(jsonPath("$.[*].salary").value(hasItem(DEFAULT_SALARY)))
            .andExpect(jsonPath("$.[*].description").value(hasItem(DEFAULT_DESCRIPTION)))
            .andExpect(jsonPath("$.[*].skills").value(hasItem(DEFAULT_SKILLS)))
            .andExpect(jsonPath("$.[*].experienceLevel").value(hasItem(DEFAULT_EXPERIENCE_LEVEL)))
            .andExpect(jsonPath("$.[*].postedDate").value(hasItem(DEFAULT_POSTED_DATE.toString())));
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
            .andExpect(jsonPath("$.title").value(DEFAULT_TITLE))
            .andExpect(jsonPath("$.company").value(DEFAULT_COMPANY))
            .andExpect(jsonPath("$.location").value(DEFAULT_LOCATION))
            .andExpect(jsonPath("$.type").value(DEFAULT_TYPE.toString()))
            .andExpect(jsonPath("$.salary").value(DEFAULT_SALARY))
            .andExpect(jsonPath("$.description").value(DEFAULT_DESCRIPTION))
            .andExpect(jsonPath("$.skills").value(DEFAULT_SKILLS))
            .andExpect(jsonPath("$.experienceLevel").value(DEFAULT_EXPERIENCE_LEVEL))
            .andExpect(jsonPath("$.postedDate").value(DEFAULT_POSTED_DATE.toString()));
    }

    @Test
    @Transactional
    void getNonExistingOffre() throws Exception {
        // Get the offre
        restOffreMockMvc.perform(get(ENTITY_API_URL_ID, Long.MAX_VALUE)).andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    void putExistingOffre() throws Exception {
        // Initialize the database
        insertedOffre = offreRepository.saveAndFlush(offre);

        long databaseSizeBeforeUpdate = getRepositoryCount();

        // Update the offre
        Offre updatedOffre = offreRepository.findById(offre.getId()).orElseThrow();
        // Disconnect from session so that the updates on updatedOffre are not directly saved in db
        em.detach(updatedOffre);
        updatedOffre
            .title(UPDATED_TITLE)
            .company(UPDATED_COMPANY)
            .location(UPDATED_LOCATION)
            .type(UPDATED_TYPE)
            .salary(UPDATED_SALARY)
            .description(UPDATED_DESCRIPTION)
            .skills(UPDATED_SKILLS)
            .experienceLevel(UPDATED_EXPERIENCE_LEVEL)
            .postedDate(UPDATED_POSTED_DATE);

        restOffreMockMvc
            .perform(
                put(ENTITY_API_URL_ID, updatedOffre.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(om.writeValueAsBytes(updatedOffre))
            )
            .andExpect(status().isOk());

        // Validate the Offre in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
        assertPersistedOffreToMatchAllProperties(updatedOffre);
    }

    @Test
    @Transactional
    void putNonExistingOffre() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        offre.setId(longCount.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restOffreMockMvc
            .perform(put(ENTITY_API_URL_ID, offre.getId()).contentType(MediaType.APPLICATION_JSON).content(om.writeValueAsBytes(offre)))
            .andExpect(status().isBadRequest());

        // Validate the Offre in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithIdMismatchOffre() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        offre.setId(longCount.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restOffreMockMvc
            .perform(
                put(ENTITY_API_URL_ID, longCount.incrementAndGet())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(om.writeValueAsBytes(offre))
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

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restOffreMockMvc
            .perform(put(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(om.writeValueAsBytes(offre)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the Offre in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void partialUpdateOffreWithPatch() throws Exception {
        // Initialize the database
        insertedOffre = offreRepository.saveAndFlush(offre);

        long databaseSizeBeforeUpdate = getRepositoryCount();

        // Update the offre using partial update
        Offre partialUpdatedOffre = new Offre();
        partialUpdatedOffre.setId(offre.getId());

        partialUpdatedOffre
            .company(UPDATED_COMPANY)
            .location(UPDATED_LOCATION)
            .salary(UPDATED_SALARY)
            .description(UPDATED_DESCRIPTION)
            .experienceLevel(UPDATED_EXPERIENCE_LEVEL);

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
    void fullUpdateOffreWithPatch() throws Exception {
        // Initialize the database
        insertedOffre = offreRepository.saveAndFlush(offre);

        long databaseSizeBeforeUpdate = getRepositoryCount();

        // Update the offre using partial update
        Offre partialUpdatedOffre = new Offre();
        partialUpdatedOffre.setId(offre.getId());

        partialUpdatedOffre
            .title(UPDATED_TITLE)
            .company(UPDATED_COMPANY)
            .location(UPDATED_LOCATION)
            .type(UPDATED_TYPE)
            .salary(UPDATED_SALARY)
            .description(UPDATED_DESCRIPTION)
            .skills(UPDATED_SKILLS)
            .experienceLevel(UPDATED_EXPERIENCE_LEVEL)
            .postedDate(UPDATED_POSTED_DATE);

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
    void patchNonExistingOffre() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        offre.setId(longCount.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restOffreMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, offre.getId()).contentType("application/merge-patch+json").content(om.writeValueAsBytes(offre))
            )
            .andExpect(status().isBadRequest());

        // Validate the Offre in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithIdMismatchOffre() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        offre.setId(longCount.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restOffreMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, longCount.incrementAndGet())
                    .contentType("application/merge-patch+json")
                    .content(om.writeValueAsBytes(offre))
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

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restOffreMockMvc
            .perform(patch(ENTITY_API_URL).contentType("application/merge-patch+json").content(om.writeValueAsBytes(offre)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the Offre in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
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
