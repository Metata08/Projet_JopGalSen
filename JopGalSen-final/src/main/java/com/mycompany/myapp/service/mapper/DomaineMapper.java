package com.mycompany.myapp.service.mapper;

import com.mycompany.myapp.domain.Domaine;
import com.mycompany.myapp.service.dto.DomaineDTO;
import org.mapstruct.*;

/**
 * Mapper for the entity {@link Domaine} and its DTO {@link DomaineDTO}.
 */
@Mapper(componentModel = "spring")
public interface DomaineMapper extends EntityMapper<DomaineDTO, Domaine> {}
