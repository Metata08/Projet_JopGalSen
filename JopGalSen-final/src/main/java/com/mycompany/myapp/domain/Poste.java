package com.mycompany.myapp.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

/**
 * A Poste.
 */
@Entity
@Table(name = "poste")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
@SuppressWarnings("common-java:DuplicatedBlocks")
public class Poste implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @NotNull
    @Column(name = "nom_poste", nullable = false)
    private String nomPoste;

    @ManyToOne(fetch = FetchType.LAZY)
    private Domaine domaine;

    @ManyToMany(fetch = FetchType.LAZY, mappedBy = "postes")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    @JsonIgnoreProperties(value = { "recruteur", "postes" }, allowSetters = true)
    private Set<Offre> offres = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Long getId() {
        return this.id;
    }

    public Poste id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNomPoste() {
        return this.nomPoste;
    }

    public Poste nomPoste(String nomPoste) {
        this.setNomPoste(nomPoste);
        return this;
    }

    public void setNomPoste(String nomPoste) {
        this.nomPoste = nomPoste;
    }

    public Domaine getDomaine() {
        return this.domaine;
    }

    public void setDomaine(Domaine domaine) {
        this.domaine = domaine;
    }

    public Poste domaine(Domaine domaine) {
        this.setDomaine(domaine);
        return this;
    }

    public Set<Offre> getOffres() {
        return this.offres;
    }

    public void setOffres(Set<Offre> offres) {
        if (this.offres != null) {
            this.offres.forEach(i -> i.removePostes(this));
        }
        if (offres != null) {
            offres.forEach(i -> i.addPostes(this));
        }
        this.offres = offres;
    }

    public Poste offres(Set<Offre> offres) {
        this.setOffres(offres);
        return this;
    }

    public Poste addOffres(Offre offre) {
        this.offres.add(offre);
        offre.getPostes().add(this);
        return this;
    }

    public Poste removeOffres(Offre offre) {
        this.offres.remove(offre);
        offre.getPostes().remove(this);
        return this;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Poste)) {
            return false;
        }
        return getId() != null && getId().equals(((Poste) o).getId());
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Poste{" +
            "id=" + getId() +
            ", nomPoste='" + getNomPoste() + "'" +
            "}";
    }
}
