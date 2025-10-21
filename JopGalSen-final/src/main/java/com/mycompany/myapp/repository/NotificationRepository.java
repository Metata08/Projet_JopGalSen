package com.mycompany.myapp.repository;

import com.mycompany.myapp.domain.Notification;
import java.util.List;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

/**
 * Spring Data JPA repository for the Notification entity.
 */
@SuppressWarnings("unused")
@Repository
public interface NotificationRepository extends JpaRepository<Notification, Long> {
    @Query("select notification from Notification notification where notification.user.login = ?#{authentication.name}")
    Page<Notification> findByUserIsCurrentUser(Pageable pageable);
}
