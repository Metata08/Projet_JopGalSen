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
 * A Domaine.
 */
@Entity
@Table(name = "domaine")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
@SuppressWarnings("common-java:DuplicatedBlocks")
public class Domaine implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @NotNull
    @Column(name = "nom_domaine", nullable = false)
    private String nomDomaine;

    @OneToMany(fetch = FetchType.LAZY, mappedBy = "domaine")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    @JsonIgnoreProperties(value = { "offres", "domaine" }, allowSetters = true)
    private Set<Poste> postes = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Long getId() {
        return this.id;
    }

    public Domaine id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNomDomaine() {
        return this.nomDomaine;
    }

    public Domaine nomDomaine(String nomDomaine) {
        this.setNomDomaine(nomDomaine);
        return this;
    }

    public void setNomDomaine(String nomDomaine) {
        this.nomDomaine = nomDomaine;
    }

    public Set<Poste> getPostes() {
        return this.postes;
    }

    public void setPostes(Set<Poste> postes) {
        if (this.postes != null) {
            this.postes.forEach(i -> i.setDomaine(null));
        }
        if (postes != null) {
            postes.forEach(i -> i.setDomaine(this));
        }
        this.postes = postes;
    }

    public Domaine postes(Set<Poste> postes) {
        this.setPostes(postes);
        return this;
    }

    public Domaine addPostes(Poste poste) {
        this.postes.add(poste);
        poste.setDomaine(this);
        return this;
    }

    public Domaine removePostes(Poste poste) {
        this.postes.remove(poste);
        poste.setDomaine(null);
        return this;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Domaine)) {
            return false;
        }
        return getId() != null && getId().equals(((Domaine) o).getId());
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Domaine{" +
            "id=" + getId() +
            ", nomDomaine='" + getNomDomaine() + "'" +
            "}";
    }
}
