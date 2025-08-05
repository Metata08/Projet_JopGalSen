package com.mycompany.myapp.domain;

import static com.mycompany.myapp.domain.CandidatTestSamples.*;
import static com.mycompany.myapp.domain.CandidatureTestSamples.*;
import static com.mycompany.myapp.domain.OffreTestSamples.*;
import static org.assertj.core.api.Assertions.assertThat;

import com.mycompany.myapp.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

class CandidatureTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Candidature.class);
        Candidature candidature1 = getCandidatureSample1();
        Candidature candidature2 = new Candidature();
        assertThat(candidature1).isNotEqualTo(candidature2);

        candidature2.setId(candidature1.getId());
        assertThat(candidature1).isEqualTo(candidature2);

        candidature2 = getCandidatureSample2();
        assertThat(candidature1).isNotEqualTo(candidature2);
    }

    @Test
    void offreTest() {
        Candidature candidature = getCandidatureRandomSampleGenerator();
        Offre offreBack = getOffreRandomSampleGenerator();

        candidature.setOffre(offreBack);
        assertThat(candidature.getOffre()).isEqualTo(offreBack);

        candidature.offre(null);
        assertThat(candidature.getOffre()).isNull();
    }

    @Test
    void candidatTest() {
        Candidature candidature = getCandidatureRandomSampleGenerator();
        Candidat candidatBack = getCandidatRandomSampleGenerator();

        candidature.setCandidat(candidatBack);
        assertThat(candidature.getCandidat()).isEqualTo(candidatBack);

        candidature.candidat(null);
        assertThat(candidature.getCandidat()).isNull();
    }
}
