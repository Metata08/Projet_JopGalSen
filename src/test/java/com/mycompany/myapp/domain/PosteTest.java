package com.mycompany.myapp.domain;

import static com.mycompany.myapp.domain.DomaineTestSamples.*;
import static com.mycompany.myapp.domain.OffreTestSamples.*;
import static com.mycompany.myapp.domain.PosteTestSamples.*;
import static org.assertj.core.api.Assertions.assertThat;

import com.mycompany.myapp.web.rest.TestUtil;
import java.util.HashSet;
import java.util.Set;
import org.junit.jupiter.api.Test;

class PosteTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Poste.class);
        Poste poste1 = getPosteSample1();
        Poste poste2 = new Poste();
        assertThat(poste1).isNotEqualTo(poste2);

        poste2.setId(poste1.getId());
        assertThat(poste1).isEqualTo(poste2);

        poste2 = getPosteSample2();
        assertThat(poste1).isNotEqualTo(poste2);
    }

    @Test
    void offresTest() {
        Poste poste = getPosteRandomSampleGenerator();
        Offre offreBack = getOffreRandomSampleGenerator();

        poste.addOffres(offreBack);
        assertThat(poste.getOffres()).containsOnly(offreBack);
        assertThat(offreBack.getPoste()).isEqualTo(poste);

        poste.removeOffres(offreBack);
        assertThat(poste.getOffres()).doesNotContain(offreBack);
        assertThat(offreBack.getPoste()).isNull();

        poste.offres(new HashSet<>(Set.of(offreBack)));
        assertThat(poste.getOffres()).containsOnly(offreBack);
        assertThat(offreBack.getPoste()).isEqualTo(poste);

        poste.setOffres(new HashSet<>());
        assertThat(poste.getOffres()).doesNotContain(offreBack);
        assertThat(offreBack.getPoste()).isNull();
    }

    @Test
    void domaineTest() {
        Poste poste = getPosteRandomSampleGenerator();
        Domaine domaineBack = getDomaineRandomSampleGenerator();

        poste.setDomaine(domaineBack);
        assertThat(poste.getDomaine()).isEqualTo(domaineBack);

        poste.domaine(null);
        assertThat(poste.getDomaine()).isNull();
    }
}
