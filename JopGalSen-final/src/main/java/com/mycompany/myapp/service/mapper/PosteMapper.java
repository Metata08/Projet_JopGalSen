package com.mycompany.myapp.service.mapper;

import com.mycompany.myapp.domain.Domaine;
import com.mycompany.myapp.domain.Offre;
import com.mycompany.myapp.domain.Poste;
import com.mycompany.myapp.service.dto.DomaineDTO;
import com.mycompany.myapp.service.dto.OffreDTO;
import com.mycompany.myapp.service.dto.PosteDTO;
import java.util.Set;
import java.util.stream.Collectors;
import org.mapstruct.*;

/**
 * Mapper for the entity {@link Poste} and its DTO {@link PosteDTO}.
 */
@Mapper(componentModel = "spring")
public interface PosteMapper extends EntityMapper<PosteDTO, Poste> {
    @Mapping(target = "domaine", source = "domaine", qualifiedByName = "domaineNomDomaine")
    @Mapping(target = "offres", source = "offres", qualifiedByName = "offreIdSet")
    PosteDTO toDto(Poste s);

    @Mapping(target = "offres", ignore = true)
    @Mapping(target = "removeOffres", ignore = true)
    Poste toEntity(PosteDTO posteDTO);

    @Named("domaineNomDomaine")
    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "id", source = "id")
    @Mapping(target = "nomDomaine", source = "nomDomaine")
    DomaineDTO toDtoDomaineNomDomaine(Domaine domaine);

    @Named("offreId")
    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "id", source = "id")
    OffreDTO toDtoOffreId(Offre offre);

    @Named("offreIdSet")
    default Set<OffreDTO> toDtoOffreIdSet(Set<Offre> offre) {
        return offre.stream().map(this::toDtoOffreId).collect(Collectors.toSet());
    }
}
