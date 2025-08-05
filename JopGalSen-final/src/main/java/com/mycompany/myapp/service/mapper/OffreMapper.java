package com.mycompany.myapp.service.mapper;

import com.mycompany.myapp.domain.Offre;
import com.mycompany.myapp.domain.Poste;
import com.mycompany.myapp.domain.Recruteur;
import com.mycompany.myapp.service.dto.OffreDTO;
import com.mycompany.myapp.service.dto.PosteDTO;
import com.mycompany.myapp.service.dto.RecruteurDTO;
import java.util.Set;
import java.util.stream.Collectors;
import org.mapstruct.*;

/**
 * Mapper for the entity {@link Offre} and its DTO {@link OffreDTO}.
 */
@Mapper(componentModel = "spring")
public interface OffreMapper extends EntityMapper<OffreDTO, Offre> {
    @Mapping(target = "recruteur", source = "recruteur", qualifiedByName = "recruteurEntreprise")
    @Mapping(target = "postes", source = "postes", qualifiedByName = "posteNomPosteSet")
    OffreDTO toDto(Offre s);

    @Mapping(target = "removePostes", ignore = true)
    Offre toEntity(OffreDTO offreDTO);

    @Named("recruteurEntreprise")
    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "id", source = "id")
    @Mapping(target = "entreprise", source = "entreprise")
    RecruteurDTO toDtoRecruteurEntreprise(Recruteur recruteur);

    @Named("posteNomPoste")
    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "id", source = "id")
    @Mapping(target = "nomPoste", source = "nomPoste")
    PosteDTO toDtoPosteNomPoste(Poste poste);

    @Named("posteNomPosteSet")
    default Set<PosteDTO> toDtoPosteNomPosteSet(Set<Poste> poste) {
        return poste.stream().map(this::toDtoPosteNomPoste).collect(Collectors.toSet());
    }
}
