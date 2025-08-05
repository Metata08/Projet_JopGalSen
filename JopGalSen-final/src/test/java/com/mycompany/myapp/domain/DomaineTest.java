package com.mycompany.myapp.domain;

import static com.mycompany.myapp.domain.DomaineTestSamples.*;
import static org.assertj.core.api.Assertions.assertThat;

import com.mycompany.myapp.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

class DomaineTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Domaine.class);
        Domaine domaine1 = getDomaineSample1();
        Domaine domaine2 = new Domaine();
        assertThat(domaine1).isNotEqualTo(domaine2);

        domaine2.setId(domaine1.getId());
        assertThat(domaine1).isEqualTo(domaine2);

        domaine2 = getDomaineSample2();
        assertThat(domaine1).isNotEqualTo(domaine2);
    }
}
