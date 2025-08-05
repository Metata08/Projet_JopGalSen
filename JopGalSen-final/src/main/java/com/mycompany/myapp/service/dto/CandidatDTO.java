package com.mycompany.myapp.service.dto;

import jakarta.persistence.Lob;
import java.io.Serializable;
import java.util.Objects;

/**
 * A DTO for the {@link com.mycompany.myapp.domain.Candidat} entity.
 */
@SuppressWarnings("common-java:DuplicatedBlocks")
public class CandidatDTO implements Serializable {

    private Long id;

    @Lob
    private byte[] cv;

    private String cvContentType;

    private String tel;

    @Lob
    private String profil;

    private UserDTO user;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public byte[] getCv() {
        return cv;
    }

    public void setCv(byte[] cv) {
        this.cv = cv;
    }

    public String getCvContentType() {
        return cvContentType;
    }

    public void setCvContentType(String cvContentType) {
        this.cvContentType = cvContentType;
    }

    public String getTel() {
        return tel;
    }

    public void setTel(String tel) {
        this.tel = tel;
    }

    public String getProfil() {
        return profil;
    }

    public void setProfil(String profil) {
        this.profil = profil;
    }

    public UserDTO getUser() {
        return user;
    }

    public void setUser(UserDTO user) {
        this.user = user;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof CandidatDTO)) {
            return false;
        }

        CandidatDTO candidatDTO = (CandidatDTO) o;
        if (this.id == null) {
            return false;
        }
        return Objects.equals(this.id, candidatDTO.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(this.id);
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "CandidatDTO{" +
            "id=" + getId() +
            ", cv='" + getCv() + "'" +
            ", tel='" + getTel() + "'" +
            ", profil='" + getProfil() + "'" +
            ", user=" + getUser() +
            "}";
    }
}
