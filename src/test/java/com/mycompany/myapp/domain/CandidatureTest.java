package com.mycompany.myapp.domain;

import static com.mycompany.myapp.domain.CandidatureTestSamples.*;
import static com.mycompany.myapp.domain.OffreTestSamples.*;
import static com.mycompany.myapp.domain.VisiteurTestSamples.*;
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
    void visiteurTest() {
        Candidature candidature = getCandidatureRandomSampleGenerator();
        Visiteur visiteurBack = getVisiteurRandomSampleGenerator();

        candidature.setVisiteur(visiteurBack);
        assertThat(candidature.getVisiteur()).isEqualTo(visiteurBack);

        candidature.visiteur(null);
        assertThat(candidature.getVisiteur()).isNull();
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
}
