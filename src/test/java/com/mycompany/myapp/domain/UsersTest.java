package com.mycompany.myapp.domain;

import static com.mycompany.myapp.domain.NotificationTestSamples.*;
import static com.mycompany.myapp.domain.RecruteurTestSamples.*;
import static com.mycompany.myapp.domain.UsersTestSamples.*;
import static com.mycompany.myapp.domain.VisiteurTestSamples.*;
import static org.assertj.core.api.Assertions.assertThat;

import com.mycompany.myapp.web.rest.TestUtil;
import java.util.HashSet;
import java.util.Set;
import org.junit.jupiter.api.Test;

class UsersTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Users.class);
        Users users1 = getUsersSample1();
        Users users2 = new Users();
        assertThat(users1).isNotEqualTo(users2);

        users2.setId(users1.getId());
        assertThat(users1).isEqualTo(users2);

        users2 = getUsersSample2();
        assertThat(users1).isNotEqualTo(users2);
    }

    @Test
    void visiteurTest() {
        Users users = getUsersRandomSampleGenerator();
        Visiteur visiteurBack = getVisiteurRandomSampleGenerator();

        users.setVisiteur(visiteurBack);
        assertThat(users.getVisiteur()).isEqualTo(visiteurBack);

        users.visiteur(null);
        assertThat(users.getVisiteur()).isNull();
    }

    @Test
    void recruteurTest() {
        Users users = getUsersRandomSampleGenerator();
        Recruteur recruteurBack = getRecruteurRandomSampleGenerator();

        users.setRecruteur(recruteurBack);
        assertThat(users.getRecruteur()).isEqualTo(recruteurBack);

        users.recruteur(null);
        assertThat(users.getRecruteur()).isNull();
    }

    @Test
    void notificationsTest() {
        Users users = getUsersRandomSampleGenerator();
        Notification notificationBack = getNotificationRandomSampleGenerator();

        users.addNotifications(notificationBack);
        assertThat(users.getNotifications()).containsOnly(notificationBack);
        assertThat(notificationBack.getUser()).isEqualTo(users);

        users.removeNotifications(notificationBack);
        assertThat(users.getNotifications()).doesNotContain(notificationBack);
        assertThat(notificationBack.getUser()).isNull();

        users.notifications(new HashSet<>(Set.of(notificationBack)));
        assertThat(users.getNotifications()).containsOnly(notificationBack);
        assertThat(notificationBack.getUser()).isEqualTo(users);

        users.setNotifications(new HashSet<>());
        assertThat(users.getNotifications()).doesNotContain(notificationBack);
        assertThat(notificationBack.getUser()).isNull();
    }
}
