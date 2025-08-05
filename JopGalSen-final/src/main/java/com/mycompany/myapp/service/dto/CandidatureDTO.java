package com.mycompany.myapp.service.dto;

import com.mycompany.myapp.domain.enumeration.Statuts;
import jakarta.validation.constraints.*;
import java.io.Serializable;
import java.time.LocalDate;
import java.util.Objects;

/**
 * A DTO for the {@link com.mycompany.myapp.domain.Candidature} entity.
 */
@SuppressWarnings("common-java:DuplicatedBlocks")
public class CandidatureDTO implements Serializable {

    private Long id;

    @NotNull
    private LocalDate dateCandidature;

    @NotNull
    private Statuts statut;

    private OffreDTO offre;

    private CandidatDTO candidat;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public LocalDate getDateCandidature() {
        return dateCandidature;
    }

    public void setDateCandidature(LocalDate dateCandidature) {
        this.dateCandidature = dateCandidature;
    }

    public Statuts getStatut() {
        return statut;
    }

    public void setStatut(Statuts statut) {
        this.statut = statut;
    }

    public OffreDTO getOffre() {
        return offre;
    }

    public void setOffre(OffreDTO offre) {
        this.offre = offre;
    }

    public CandidatDTO getCandidat() {
        return candidat;
    }

    public void setCandidat(CandidatDTO candidat) {
        this.candidat = candidat;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof CandidatureDTO)) {
            return false;
        }

        CandidatureDTO candidatureDTO = (CandidatureDTO) o;
        if (this.id == null) {
            return false;
        }
        return Objects.equals(this.id, candidatureDTO.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(this.id);
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "CandidatureDTO{" +
            "id=" + getId() +
            ", dateCandidature='" + getDateCandidature() + "'" +
            ", statut='" + getStatut() + "'" +
            ", offre=" + getOffre() +
            ", candidat=" + getCandidat() +
            "}";
    }
}
