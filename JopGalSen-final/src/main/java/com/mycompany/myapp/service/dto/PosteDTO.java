package com.mycompany.myapp.service.dto;

import jakarta.validation.constraints.*;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Objects;
import java.util.Set;

/**
 * A DTO for the {@link com.mycompany.myapp.domain.Poste} entity.
 */
@SuppressWarnings("common-java:DuplicatedBlocks")
public class PosteDTO implements Serializable {

    private Long id;

    @NotNull
    private String nomPoste;

    private DomaineDTO domaine;

    private Set<OffreDTO> offres = new HashSet<>();

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNomPoste() {
        return nomPoste;
    }

    public void setNomPoste(String nomPoste) {
        this.nomPoste = nomPoste;
    }

    public DomaineDTO getDomaine() {
        return domaine;
    }

    public void setDomaine(DomaineDTO domaine) {
        this.domaine = domaine;
    }

    public Set<OffreDTO> getOffres() {
        return offres;
    }

    public void setOffres(Set<OffreDTO> offres) {
        this.offres = offres;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof PosteDTO)) {
            return false;
        }

        PosteDTO posteDTO = (PosteDTO) o;
        if (this.id == null) {
            return false;
        }
        return Objects.equals(this.id, posteDTO.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(this.id);
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "PosteDTO{" +
            "id=" + getId() +
            ", nomPoste='" + getNomPoste() + "'" +
            ", domaine=" + getDomaine() +
            ", offres=" + getOffres() +
            "}";
    }
}
