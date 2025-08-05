package com.mycompany.myapp.service.mapper;

import com.mycompany.myapp.domain.Candidat;
import com.mycompany.myapp.domain.Candidature;
import com.mycompany.myapp.domain.Offre;
import com.mycompany.myapp.service.dto.CandidatDTO;
import com.mycompany.myapp.service.dto.CandidatureDTO;
import com.mycompany.myapp.service.dto.OffreDTO;
import org.mapstruct.*;

/**
 * Mapper for the entity {@link Candidature} and its DTO {@link CandidatureDTO}.
 */
@Mapper(componentModel = "spring")
public interface CandidatureMapper extends EntityMapper<CandidatureDTO, Candidature> {
    @Mapping(target = "offre", source = "offre", qualifiedByName = "offreTitre")
    @Mapping(target = "candidat", source = "candidat", qualifiedByName = "candidatId")
    CandidatureDTO toDto(Candidature s);

    @Named("offreTitre")
    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "id", source = "id")
    @Mapping(target = "titre", source = "titre")
    OffreDTO toDtoOffreTitre(Offre offre);

    @Named("candidatId")
    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "id", source = "id")
    CandidatDTO toDtoCandidatId(Candidat candidat);
}
