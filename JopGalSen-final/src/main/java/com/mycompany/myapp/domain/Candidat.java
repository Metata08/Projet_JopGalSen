package com.mycompany.myapp.domain;

import jakarta.persistence.*;
import java.io.Serializable;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

/**
 * A Candidat.
 */
@Entity
@Table(name = "candidat")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
@SuppressWarnings("common-java:DuplicatedBlocks")
public class Candidat implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Lob
    @Column(name = "cv")
    private byte[] cv;

    @Column(name = "cv_content_type")
    private String cvContentType;

    @Column(name = "tel")
    private String tel;

    @Lob
    @Column(name = "profil")
    private String profil;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(unique = true)
    private User user;

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Long getId() {
        return this.id;
    }

    public Candidat id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public byte[] getCv() {
        return this.cv;
    }

    public Candidat cv(byte[] cv) {
        this.setCv(cv);
        return this;
    }

    public void setCv(byte[] cv) {
        this.cv = cv;
    }

    public String getCvContentType() {
        return this.cvContentType;
    }

    public Candidat cvContentType(String cvContentType) {
        this.cvContentType = cvContentType;
        return this;
    }

    public void setCvContentType(String cvContentType) {
        this.cvContentType = cvContentType;
    }

    public String getTel() {
        return this.tel;
    }

    public Candidat tel(String tel) {
        this.setTel(tel);
        return this;
    }

    public void setTel(String tel) {
        this.tel = tel;
    }

    public String getProfil() {
        return this.profil;
    }

    public Candidat profil(String profil) {
        this.setProfil(profil);
        return this;
    }

    public void setProfil(String profil) {
        this.profil = profil;
    }

    public User getUser() {
        return this.user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Candidat user(User user) {
        this.setUser(user);
        return this;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Candidat)) {
            return false;
        }
        return getId() != null && getId().equals(((Candidat) o).getId());
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Candidat{" +
            "id=" + getId() +
            ", cv='" + getCv() + "'" +
            ", cvContentType='" + getCvContentType() + "'" +
            ", tel='" + getTel() + "'" +
            ", profil='" + getProfil() + "'" +
            "}";
    }
}
