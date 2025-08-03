package com.mycompany.myapp.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import java.io.Serializable;
import java.time.Instant;
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

    @Lob
    @Column(name = "motivation_letter")
    private String motivationLetter;

    @Column(name = "cv_file_url")
    private String cvFileUrl;

    @Column(name = "date_candidature")
    private Instant dateCandidature;

    @ManyToOne(fetch = FetchType.LAZY)
    @JsonIgnoreProperties(value = { "user" }, allowSetters = true)
    private Visiteur visiteur;

    @ManyToOne(fetch = FetchType.LAZY)
    @JsonIgnoreProperties(value = { "recruteur", "poste" }, allowSetters = true)
    private Offre offre;

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

    public String getMotivationLetter() {
        return this.motivationLetter;
    }

    public Candidature motivationLetter(String motivationLetter) {
        this.setMotivationLetter(motivationLetter);
        return this;
    }

    public void setMotivationLetter(String motivationLetter) {
        this.motivationLetter = motivationLetter;
    }

    public String getCvFileUrl() {
        return this.cvFileUrl;
    }

    public Candidature cvFileUrl(String cvFileUrl) {
        this.setCvFileUrl(cvFileUrl);
        return this;
    }

    public void setCvFileUrl(String cvFileUrl) {
        this.cvFileUrl = cvFileUrl;
    }

    public Instant getDateCandidature() {
        return this.dateCandidature;
    }

    public Candidature dateCandidature(Instant dateCandidature) {
        this.setDateCandidature(dateCandidature);
        return this;
    }

    public void setDateCandidature(Instant dateCandidature) {
        this.dateCandidature = dateCandidature;
    }

    public Visiteur getVisiteur() {
        return this.visiteur;
    }

    public void setVisiteur(Visiteur visiteur) {
        this.visiteur = visiteur;
    }

    public Candidature visiteur(Visiteur visiteur) {
        this.setVisiteur(visiteur);
        return this;
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
            ", motivationLetter='" + getMotivationLetter() + "'" +
            ", cvFileUrl='" + getCvFileUrl() + "'" +
            ", dateCandidature='" + getDateCandidature() + "'" +
            "}";
    }
}
