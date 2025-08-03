package com.mycompany.myapp.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.mycompany.myapp.domain.enumeration.TypeRecruteur;
import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

/**
 * A Recruteur.
 */
@Entity
@Table(name = "recruteur")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
@SuppressWarnings("common-java:DuplicatedBlocks")
public class Recruteur implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @NotNull
    @Enumerated(EnumType.STRING)
    @Column(name = "type", nullable = false)
    private TypeRecruteur type;

    @OneToMany(fetch = FetchType.LAZY, mappedBy = "recruteur")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    @JsonIgnoreProperties(value = { "recruteur", "poste" }, allowSetters = true)
    private Set<Offre> offres = new HashSet<>();

    @JsonIgnoreProperties(value = { "visiteur", "recruteur", "notifications" }, allowSetters = true)
    @OneToOne(fetch = FetchType.LAZY, mappedBy = "recruteur")
    private Users user;

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Long getId() {
        return this.id;
    }

    public Recruteur id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public TypeRecruteur getType() {
        return this.type;
    }

    public Recruteur type(TypeRecruteur type) {
        this.setType(type);
        return this;
    }

    public void setType(TypeRecruteur type) {
        this.type = type;
    }

    public Set<Offre> getOffres() {
        return this.offres;
    }

    public void setOffres(Set<Offre> offres) {
        if (this.offres != null) {
            this.offres.forEach(i -> i.setRecruteur(null));
        }
        if (offres != null) {
            offres.forEach(i -> i.setRecruteur(this));
        }
        this.offres = offres;
    }

    public Recruteur offres(Set<Offre> offres) {
        this.setOffres(offres);
        return this;
    }

    public Recruteur addOffres(Offre offre) {
        this.offres.add(offre);
        offre.setRecruteur(this);
        return this;
    }

    public Recruteur removeOffres(Offre offre) {
        this.offres.remove(offre);
        offre.setRecruteur(null);
        return this;
    }

    public Users getUser() {
        return this.user;
    }

    public void setUser(Users users) {
        if (this.user != null) {
            this.user.setRecruteur(null);
        }
        if (users != null) {
            users.setRecruteur(this);
        }
        this.user = users;
    }

    public Recruteur user(Users users) {
        this.setUser(users);
        return this;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Recruteur)) {
            return false;
        }
        return getId() != null && getId().equals(((Recruteur) o).getId());
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Recruteur{" +
            "id=" + getId() +
            ", type='" + getType() + "'" +
            "}";
    }
}
