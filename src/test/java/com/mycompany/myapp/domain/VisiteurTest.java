package com.mycompany.myapp.domain;

import static com.mycompany.myapp.domain.UsersTestSamples.*;
import static com.mycompany.myapp.domain.VisiteurTestSamples.*;
import static org.assertj.core.api.Assertions.assertThat;

import com.mycompany.myapp.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

class VisiteurTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Visiteur.class);
        Visiteur visiteur1 = getVisiteurSample1();
        Visiteur visiteur2 = new Visiteur();
        assertThat(visiteur1).isNotEqualTo(visiteur2);

        visiteur2.setId(visiteur1.getId());
        assertThat(visiteur1).isEqualTo(visiteur2);

        visiteur2 = getVisiteurSample2();
        assertThat(visiteur1).isNotEqualTo(visiteur2);
    }

    @Test
    void userTest() {
        Visiteur visiteur = getVisiteurRandomSampleGenerator();
        Users usersBack = getUsersRandomSampleGenerator();

        visiteur.setUser(usersBack);
        assertThat(visiteur.getUser()).isEqualTo(usersBack);
        assertThat(usersBack.getVisiteur()).isEqualTo(visiteur);

        visiteur.user(null);
        assertThat(visiteur.getUser()).isNull();
        assertThat(usersBack.getVisiteur()).isNull();
    }
}
