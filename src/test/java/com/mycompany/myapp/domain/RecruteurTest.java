package com.mycompany.myapp.domain;

import static com.mycompany.myapp.domain.OffreTestSamples.*;
import static com.mycompany.myapp.domain.RecruteurTestSamples.*;
import static com.mycompany.myapp.domain.UsersTestSamples.*;
import static org.assertj.core.api.Assertions.assertThat;

import com.mycompany.myapp.web.rest.TestUtil;
import java.util.HashSet;
import java.util.Set;
import org.junit.jupiter.api.Test;

class RecruteurTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Recruteur.class);
        Recruteur recruteur1 = getRecruteurSample1();
        Recruteur recruteur2 = new Recruteur();
        assertThat(recruteur1).isNotEqualTo(recruteur2);

        recruteur2.setId(recruteur1.getId());
        assertThat(recruteur1).isEqualTo(recruteur2);

        recruteur2 = getRecruteurSample2();
        assertThat(recruteur1).isNotEqualTo(recruteur2);
    }

    @Test
    void offresTest() {
        Recruteur recruteur = getRecruteurRandomSampleGenerator();
        Offre offreBack = getOffreRandomSampleGenerator();

        recruteur.addOffres(offreBack);
        assertThat(recruteur.getOffres()).containsOnly(offreBack);
        assertThat(offreBack.getRecruteur()).isEqualTo(recruteur);

        recruteur.removeOffres(offreBack);
        assertThat(recruteur.getOffres()).doesNotContain(offreBack);
        assertThat(offreBack.getRecruteur()).isNull();

        recruteur.offres(new HashSet<>(Set.of(offreBack)));
        assertThat(recruteur.getOffres()).containsOnly(offreBack);
        assertThat(offreBack.getRecruteur()).isEqualTo(recruteur);

        recruteur.setOffres(new HashSet<>());
        assertThat(recruteur.getOffres()).doesNotContain(offreBack);
        assertThat(offreBack.getRecruteur()).isNull();
    }

    @Test
    void userTest() {
        Recruteur recruteur = getRecruteurRandomSampleGenerator();
        Users usersBack = getUsersRandomSampleGenerator();

        recruteur.setUser(usersBack);
        assertThat(recruteur.getUser()).isEqualTo(usersBack);
        assertThat(usersBack.getRecruteur()).isEqualTo(recruteur);

        recruteur.user(null);
        assertThat(recruteur.getUser()).isNull();
        assertThat(usersBack.getRecruteur()).isNull();
    }
}
