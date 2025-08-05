package com.mycompany.myapp.service.dto;

import com.mycompany.myapp.domain.enumeration.TypeContrat;
import jakarta.persistence.Lob;
import jakarta.validation.constraints.*;
import java.io.Serializable;
import java.time.LocalDate;
import java.util.HashSet;
import java.util.Objects;
import java.util.Set;

/**
 * A DTO for the {@link com.mycompany.myapp.domain.Offre} entity.
 */
@SuppressWarnings("common-java:DuplicatedBlocks")
public class OffreDTO implements Serializable {

    private Long id;

    @NotNull
    private String titre;

    @Lob
    private String description;

    private String entreprise;

    private String localite;

    private String categorie;

    private String experience;

    private String exigences;

    private String benefice;

    private LocalDate dateDePostule;

    private LocalDate dateDeFin;

    private Boolean urgent;

    private Integer remuneration;

    @NotNull
    private TypeContrat contrat;

    private RecruteurDTO recruteur;

    private Set<PosteDTO> postes = new HashSet<>();

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitre() {
        return titre;
    }

    public void setTitre(String titre) {
        this.titre = titre;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getEntreprise() {
        return entreprise;
    }

    public void setEntreprise(String entreprise) {
        this.entreprise = entreprise;
    }

    public String getLocalite() {
        return localite;
    }

    public void setLocalite(String localite) {
        this.localite = localite;
    }

    public String getCategorie() {
        return categorie;
    }

    public void setCategorie(String categorie) {
        this.categorie = categorie;
    }

    public String getExperience() {
        return experience;
    }

    public void setExperience(String experience) {
        this.experience = experience;
    }

    public String getExigences() {
        return exigences;
    }

    public void setExigences(String exigences) {
        this.exigences = exigences;
    }

    public String getBenefice() {
        return benefice;
    }

    public void setBenefice(String benefice) {
        this.benefice = benefice;
    }

    public LocalDate getDateDePostule() {
        return dateDePostule;
    }

    public void setDateDePostule(LocalDate dateDePostule) {
        this.dateDePostule = dateDePostule;
    }

    public LocalDate getDateDeFin() {
        return dateDeFin;
    }

    public void setDateDeFin(LocalDate dateDeFin) {
        this.dateDeFin = dateDeFin;
    }

    public Boolean getUrgent() {
        return urgent;
    }

    public void setUrgent(Boolean urgent) {
        this.urgent = urgent;
    }

    public Integer getRemuneration() {
        return remuneration;
    }

    public void setRemuneration(Integer remuneration) {
        this.remuneration = remuneration;
    }

    public TypeContrat getContrat() {
        return contrat;
    }

    public void setContrat(TypeContrat contrat) {
        this.contrat = contrat;
    }

    public RecruteurDTO getRecruteur() {
        return recruteur;
    }

    public void setRecruteur(RecruteurDTO recruteur) {
        this.recruteur = recruteur;
    }

    public Set<PosteDTO> getPostes() {
        return postes;
    }

    public void setPostes(Set<PosteDTO> postes) {
        this.postes = postes;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof OffreDTO)) {
            return false;
        }

        OffreDTO offreDTO = (OffreDTO) o;
        if (this.id == null) {
            return false;
        }
        return Objects.equals(this.id, offreDTO.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(this.id);
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "OffreDTO{" +
            "id=" + getId() +
            ", titre='" + getTitre() + "'" +
            ", description='" + getDescription() + "'" +
            ", entreprise='" + getEntreprise() + "'" +
            ", localite='" + getLocalite() + "'" +
            ", categorie='" + getCategorie() + "'" +
            ", experience='" + getExperience() + "'" +
            ", exigences='" + getExigences() + "'" +
            ", benefice='" + getBenefice() + "'" +
            ", dateDePostule='" + getDateDePostule() + "'" +
            ", dateDeFin='" + getDateDeFin() + "'" +
            ", urgent='" + getUrgent() + "'" +
            ", remuneration=" + getRemuneration() +
            ", contrat='" + getContrat() + "'" +
            ", recruteur=" + getRecruteur() +
            ", postes=" + getPostes() +
            "}";
    }
}
