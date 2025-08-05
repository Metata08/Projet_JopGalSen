package com.mycompany.myapp.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.mycompany.myapp.domain.enumeration.TypeContrat;
import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import java.io.Serializable;
import java.time.LocalDate;
import java.util.HashSet;
import java.util.Set;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

/**
 * A Offre.
 */
@Entity
@Table(name = "offre")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
@SuppressWarnings("common-java:DuplicatedBlocks")
public class Offre implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @NotNull
    @Column(name = "titre", nullable = false)
    private String titre;

    @Lob
    @Column(name = "description")
    private String description;

    @Column(name = "entreprise")
    private String entreprise;

    @Column(name = "localite")
    private String localite;

    @Column(name = "categorie")
    private String categorie;

    @Column(name = "experience")
    private String experience;

    @Column(name = "exigences")
    private String exigences;

    @Column(name = "benefice")
    private String benefice;

    @Column(name = "date_de_postule")
    private LocalDate dateDePostule;

    @Column(name = "date_de_fin")
    private LocalDate dateDeFin;

    @Column(name = "urgent")
    private Boolean urgent;

    @Column(name = "remuneration")
    private Integer remuneration;

    @NotNull
    @Enumerated(EnumType.STRING)
    @Column(name = "contrat", nullable = false)
    private TypeContrat contrat;

    @ManyToOne(fetch = FetchType.LAZY)
    @JsonIgnoreProperties(value = { "user" }, allowSetters = true)
    private Recruteur recruteur;

    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(
        name = "rel_offre__postes",
        joinColumns = @JoinColumn(name = "offre_id"),
        inverseJoinColumns = @JoinColumn(name = "postes_id")
    )
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    @JsonIgnoreProperties(value = { "domaine", "offres" }, allowSetters = true)
    private Set<Poste> postes = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Long getId() {
        return this.id;
    }

    public Offre id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitre() {
        return this.titre;
    }

    public Offre titre(String titre) {
        this.setTitre(titre);
        return this;
    }

    public void setTitre(String titre) {
        this.titre = titre;
    }

    public String getDescription() {
        return this.description;
    }

    public Offre description(String description) {
        this.setDescription(description);
        return this;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getEntreprise() {
        return this.entreprise;
    }

    public Offre entreprise(String entreprise) {
        this.setEntreprise(entreprise);
        return this;
    }

    public void setEntreprise(String entreprise) {
        this.entreprise = entreprise;
    }

    public String getLocalite() {
        return this.localite;
    }

    public Offre localite(String localite) {
        this.setLocalite(localite);
        return this;
    }

    public void setLocalite(String localite) {
        this.localite = localite;
    }

    public String getCategorie() {
        return this.categorie;
    }

    public Offre categorie(String categorie) {
        this.setCategorie(categorie);
        return this;
    }

    public void setCategorie(String categorie) {
        this.categorie = categorie;
    }

    public String getExperience() {
        return this.experience;
    }

    public Offre experience(String experience) {
        this.setExperience(experience);
        return this;
    }

    public void setExperience(String experience) {
        this.experience = experience;
    }

    public String getExigences() {
        return this.exigences;
    }

    public Offre exigences(String exigences) {
        this.setExigences(exigences);
        return this;
    }

    public void setExigences(String exigences) {
        this.exigences = exigences;
    }

    public String getBenefice() {
        return this.benefice;
    }

    public Offre benefice(String benefice) {
        this.setBenefice(benefice);
        return this;
    }

    public void setBenefice(String benefice) {
        this.benefice = benefice;
    }

    public LocalDate getDateDePostule() {
        return this.dateDePostule;
    }

    public Offre dateDePostule(LocalDate dateDePostule) {
        this.setDateDePostule(dateDePostule);
        return this;
    }

    public void setDateDePostule(LocalDate dateDePostule) {
        this.dateDePostule = dateDePostule;
    }

    public LocalDate getDateDeFin() {
        return this.dateDeFin;
    }

    public Offre dateDeFin(LocalDate dateDeFin) {
        this.setDateDeFin(dateDeFin);
        return this;
    }

    public void setDateDeFin(LocalDate dateDeFin) {
        this.dateDeFin = dateDeFin;
    }

    public Boolean getUrgent() {
        return this.urgent;
    }

    public Offre urgent(Boolean urgent) {
        this.setUrgent(urgent);
        return this;
    }

    public void setUrgent(Boolean urgent) {
        this.urgent = urgent;
    }

    public Integer getRemuneration() {
        return this.remuneration;
    }

    public Offre remuneration(Integer remuneration) {
        this.setRemuneration(remuneration);
        return this;
    }

    public void setRemuneration(Integer remuneration) {
        this.remuneration = remuneration;
    }

    public TypeContrat getContrat() {
        return this.contrat;
    }

    public Offre contrat(TypeContrat contrat) {
        this.setContrat(contrat);
        return this;
    }

    public void setContrat(TypeContrat contrat) {
        this.contrat = contrat;
    }

    public Recruteur getRecruteur() {
        return this.recruteur;
    }

    public void setRecruteur(Recruteur recruteur) {
        this.recruteur = recruteur;
    }

    public Offre recruteur(Recruteur recruteur) {
        this.setRecruteur(recruteur);
        return this;
    }

    public Set<Poste> getPostes() {
        return this.postes;
    }

    public void setPostes(Set<Poste> postes) {
        this.postes = postes;
    }

    public Offre postes(Set<Poste> postes) {
        this.setPostes(postes);
        return this;
    }

    public Offre addPostes(Poste poste) {
        this.postes.add(poste);
        return this;
    }

    public Offre removePostes(Poste poste) {
        this.postes.remove(poste);
        return this;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Offre)) {
            return false;
        }
        return getId() != null && getId().equals(((Offre) o).getId());
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Offre{" +
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
            "}";
    }
}
