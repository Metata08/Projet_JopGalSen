package com.mycompany.myapp.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.mycompany.myapp.domain.enumeration.Statuts;
import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import java.io.Serializable;
import java.time.LocalDate;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

/**
 * A Candidature.
 */
@Entity
@Table(name = "candidature")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
@SuppressWarnings("common-java:DuplicatedBlocks")
public class Candidature implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @NotNull
    @Column(name = "date_candidature", nullable = false)
    private LocalDate dateCandidature;

    @NotNull
    @Enumerated(EnumType.STRING)
    @Column(name = "statut", nullable = false)
    private Statuts statut;

    @ManyToOne(fetch = FetchType.LAZY)
    @JsonIgnoreProperties(value = { "recruteur", "postes" }, allowSetters = true)
    private Offre offre;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "candidat_id", referencedColumnName = "user_id")
    @JsonIgnoreProperties(value = { "user" }, allowSetters = true)
    private Candidat candidat;

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Long getId() {
        return this.id;
    }

    public Candidature id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public LocalDate getDateCandidature() {
        return this.dateCandidature;
    }

    public Candidature dateCandidature(LocalDate dateCandidature) {
        this.setDateCandidature(dateCandidature);
        return this;
    }

    public void setDateCandidature(LocalDate dateCandidature) {
        this.dateCandidature = dateCandidature;
    }

    public Statuts getStatut() {
        return this.statut;
    }

    public Candidature statut(Statuts statut) {
        this.setStatut(statut);
        return this;
    }

    public void setStatut(Statuts statut) {
        this.statut = statut;
    }

    public Offre getOffre() {
        return this.offre;
    }

    public void setOffre(Offre offre) {
        this.offre = offre;
    }

    public Candidature offre(Offre offre) {
        this.setOffre(offre);
        return this;
    }

    public Candidat getCandidat() {
        return this.candidat;
    }

    public void setCandidat(Candidat candidat) {
        this.candidat = candidat;
    }

    public Candidature candidat(Candidat candidat) {
        this.setCandidat(candidat);
        return this;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Candidature)) {
            return false;
        }
        return getId() != null && getId().equals(((Candidature) o).getId());
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Candidature{" +
            "id=" + getId() +
            ", dateCandidature='" + getDateCandidature() + "'" +
            ", statut='" + getStatut() + "'" +
            "}";
    }
}
