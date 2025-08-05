package com.mycompany.myapp.service.mapper;

import com.mycompany.myapp.domain.Notification;
import com.mycompany.myapp.domain.User;
import com.mycompany.myapp.service.dto.NotificationDTO;
import com.mycompany.myapp.service.dto.UserDTO;
import org.mapstruct.*;

/**
 * Mapper for the entity {@link Notification} and its DTO {@link NotificationDTO}.
 */
@Mapper(componentModel = "spring")
public interface NotificationMapper extends EntityMapper<NotificationDTO, Notification> {
    @Mapping(target = "user", source = "user", qualifiedByName = "userId")
    NotificationDTO toDto(Notification s);

    @Named("userId")
    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "id", source = "id")
    UserDTO toDtoUserId(User user);
}
