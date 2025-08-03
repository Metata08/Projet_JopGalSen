package com.mycompany.myapp.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import java.io.Serializable;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

/**
 * A Visiteur.
 */
@Entity
@Table(name = "visiteur")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
@SuppressWarnings("common-java:DuplicatedBlocks")
public class Visiteur implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "cv")
    private String cv;

    @JsonIgnoreProperties(value = { "visiteur", "recruteur", "notifications" }, allowSetters = true)
    @OneToOne(fetch = FetchType.LAZY, mappedBy = "visiteur")
    private Users user;

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Long getId() {
        return this.id;
    }

    public Visiteur id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getCv() {
        return this.cv;
    }

    public Visiteur cv(String cv) {
        this.setCv(cv);
        return this;
    }

    public void setCv(String cv) {
        this.cv = cv;
    }

    public Users getUser() {
        return this.user;
    }

    public void setUser(Users users) {
        if (this.user != null) {
            this.user.setVisiteur(null);
        }
        if (users != null) {
            users.setVisiteur(this);
        }
        this.user = users;
    }

    public Visiteur user(Users users) {
        this.setUser(users);
        return this;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Visiteur)) {
            return false;
        }
        return getId() != null && getId().equals(((Visiteur) o).getId());
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Visiteur{" +
            "id=" + getId() +
            ", cv='" + getCv() + "'" +
            "}";
    }
}
