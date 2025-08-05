package com.mycompany.myapp.domain;

import static com.mycompany.myapp.domain.OffreTestSamples.*;
import static com.mycompany.myapp.domain.PosteTestSamples.*;
import static com.mycompany.myapp.domain.RecruteurTestSamples.*;
import static org.assertj.core.api.Assertions.assertThat;

import com.mycompany.myapp.web.rest.TestUtil;
import java.util.HashSet;
import java.util.Set;
import org.junit.jupiter.api.Test;

class OffreTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Offre.class);
        Offre offre1 = getOffreSample1();
        Offre offre2 = new Offre();
        assertThat(offre1).isNotEqualTo(offre2);

        offre2.setId(offre1.getId());
        assertThat(offre1).isEqualTo(offre2);

        offre2 = getOffreSample2();
        assertThat(offre1).isNotEqualTo(offre2);
    }

    @Test
    void recruteurTest() {
        Offre offre = getOffreRandomSampleGenerator();
        Recruteur recruteurBack = getRecruteurRandomSampleGenerator();

        offre.setRecruteur(recruteurBack);
        assertThat(offre.getRecruteur()).isEqualTo(recruteurBack);

        offre.recruteur(null);
        assertThat(offre.getRecruteur()).isNull();
    }

    @Test
    void postesTest() {
        Offre offre = getOffreRandomSampleGenerator();
        Poste posteBack = getPosteRandomSampleGenerator();

        offre.addPostes(posteBack);
        assertThat(offre.getPostes()).containsOnly(posteBack);

        offre.removePostes(posteBack);
        assertThat(offre.getPostes()).doesNotContain(posteBack);

        offre.postes(new HashSet<>(Set.of(posteBack)));
        assertThat(offre.getPostes()).containsOnly(posteBack);

        offre.setPostes(new HashSet<>());
        assertThat(offre.getPostes()).doesNotContain(posteBack);
    }
}
