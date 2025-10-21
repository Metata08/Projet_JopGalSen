package com.mycompany.myapp.service.impl;

import com.mycompany.myapp.domain.Notification;
import com.mycompany.myapp.repository.NotificationRepository;
import com.mycompany.myapp.security.AuthoritiesConstants;
import com.mycompany.myapp.security.SecurityUtils;
import com.mycompany.myapp.service.NotificationService;
import com.mycompany.myapp.service.dto.NotificationDTO;
import com.mycompany.myapp.service.mapper.NotificationMapper;
import java.util.Optional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Service Implementation for managing {@link com.mycompany.myapp.domain.Notification}.
 */
@Service
@Transactional
public class NotificationServiceImpl implements NotificationService {

    private static final Logger LOG = LoggerFactory.getLogger(NotificationServiceImpl.class);

    private final NotificationRepository notificationRepository;
    private final NotificationMapper notificationMapper;

    public NotificationServiceImpl(NotificationRepository notificationRepository, NotificationMapper notificationMapper) {
        this.notificationRepository = notificationRepository;
        this.notificationMapper = notificationMapper;
    }

    @Override
    public NotificationDTO save(NotificationDTO notificationDTO) {
        LOG.debug("Request to save Notification : {}", notificationDTO);
        
        Notification notification = notificationMapper.toEntity(notificationDTO);
        notification = notificationRepository.save(notification);
        return notificationMapper.toDto(notification);
    }

    @Override
    public NotificationDTO update(NotificationDTO notificationDTO) {
        LOG.debug("Request to update Notification : {}", notificationDTO);
        
      
        checkOwnership(notificationDTO.getId());

        Notification notification = notificationMapper.toEntity(notificationDTO);
        notification = notificationRepository.save(notification);
        return notificationMapper.toDto(notification);
    }

    @Override
    public Optional<NotificationDTO> partialUpdate(NotificationDTO notificationDTO) {
        LOG.debug("Request to partially update Notification : {}", notificationDTO);

        
        checkOwnership(notificationDTO.getId());
        
        return notificationRepository
            .findById(notificationDTO.getId())
            .map(existingNotification -> {
                notificationMapper.partialUpdate(existingNotification, notificationDTO);
                return existingNotification;
            })
            .map(notificationRepository::save)
            .map(notificationMapper::toDto);
    }

    @Override
    @Transactional(readOnly = true)
    public Page<NotificationDTO> findAll(Pageable pageable) {
        LOG.debug("Request to get all Notifications");
        
        if (SecurityUtils.hasCurrentUserThisAuthority(AuthoritiesConstants.ADMIN)) {
            return notificationRepository.findAll(pageable).map(notificationMapper::toDto);
        } else {
            // Pour les autres utilisateurs, on retourne seulement leurs propres notifications.
            return notificationRepository
                .findByUserIsCurrentUser(pageable)
                .map(notificationMapper::toDto);
        }
    }

    @Override
    @Transactional(readOnly = true)
    public Optional<NotificationDTO> findOne(Long id) {
        LOG.debug("Request to get Notification : {}", id);
        
        //  retourner que si l'utilisateur est le propriétaire ou un admin
        return notificationRepository
            .findById(id)
            .filter(this::isOwnerOrAdmin)
            .map(notificationMapper::toDto);
    }

    @Override
    public void delete(Long id) {
        LOG.debug("Request to delete Notification : {}", id);

        checkOwnership(id);

        notificationRepository.deleteById(id);
    }

    
    private void checkOwnership(Long notificationId) {
        notificationRepository.findById(notificationId)
            .ifPresent(notification -> {
                if (!isOwnerOrAdmin(notification)) {
                    throw new AccessDeniedException("Vous n'avez pas les droits pour modifier cette notification.");
                }
            });
    }
    
   
    private boolean isOwnerOrAdmin(Notification notification) {
        // L'utilisateur est-il admin ?
        if (SecurityUtils.hasCurrentUserThisAuthority(AuthoritiesConstants.ADMIN)) {
            return true;
        }
        // Sinon, est-il le propriétaire ?
        String currentUserLogin = SecurityUtils.getCurrentUserLogin().orElse(null);
        return notification.getUser() != null && notification.getUser().getLogin().equals(currentUserLogin);
    }
}