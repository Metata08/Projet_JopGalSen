package com.mycompany.myapp.domain;

import jakarta.persistence.*;
import java.io.Serializable;
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

    @Column(name = "entreprise")
    private String entreprise;

    @Column(name = "tel")
    private String tel;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(unique = true)
    private User user;

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

    public String getEntreprise() {
        return this.entreprise;
    }

    public Recruteur entreprise(String entreprise) {
        this.setEntreprise(entreprise);
        return this;
    }

    public void setEntreprise(String entreprise) {
        this.entreprise = entreprise;
    }

    public String getTel() {
        return this.tel;
    }

    public Recruteur tel(String tel) {
        this.setTel(tel);
        return this;
    }

    public void setTel(String tel) {
        this.tel = tel;
    }

    public User getUser() {
        return this.user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Recruteur user(User user) {
        this.setUser(user);
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
            ", entreprise='" + getEntreprise() + "'" +
            ", tel='" + getTel() + "'" +
            "}";
    }
}
