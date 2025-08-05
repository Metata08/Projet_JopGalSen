package com.mycompany.myapp.service.dto;

import jakarta.validation.constraints.*;
import java.io.Serializable;
import java.util.Objects;

/**
 * A DTO for the {@link com.mycompany.myapp.domain.Domaine} entity.
 */
@SuppressWarnings("common-java:DuplicatedBlocks")
public class DomaineDTO implements Serializable {

    private Long id;

    @NotNull
    private String nomDomaine;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNomDomaine() {
        return nomDomaine;
    }

    public void setNomDomaine(String nomDomaine) {
        this.nomDomaine = nomDomaine;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof DomaineDTO)) {
            return false;
        }

        DomaineDTO domaineDTO = (DomaineDTO) o;
        if (this.id == null) {
            return false;
        }
        return Objects.equals(this.id, domaineDTO.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(this.id);
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "DomaineDTO{" +
            "id=" + getId() +
            ", nomDomaine='" + getNomDomaine() + "'" +
            "}";
    }
}
