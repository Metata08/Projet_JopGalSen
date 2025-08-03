package com.mycompany.myapp.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.mycompany.myapp.domain.enumeration.TypeContrat;
import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import java.io.Serializable;
import java.time.Instant;
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
    @Column(name = "title", nullable = false)
    private String title;

    @NotNull
    @Column(name = "company", nullable = false)
    private String company;

    @Column(name = "location")
    private String location;

    @NotNull
    @Enumerated(EnumType.STRING)
    @Column(name = "type", nullable = false)
    private TypeContrat type;

    @Column(name = "salary")
    private String salary;

    @Lob
    @Column(name = "description")
    private String description;

    @Column(name = "skills")
    private String skills;

    @Column(name = "experience_level")
    private String experienceLevel;

    @Column(name = "posted_date")
    private Instant postedDate;

    @ManyToOne(fetch = FetchType.LAZY)
    @JsonIgnoreProperties(value = { "offres", "user" }, allowSetters = true)
    private Recruteur recruteur;

    @ManyToOne(fetch = FetchType.LAZY)
    @JsonIgnoreProperties(value = { "offres", "domaine" }, allowSetters = true)
    private Poste poste;

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

    public String getTitle() {
        return this.title;
    }

    public Offre title(String title) {
        this.setTitle(title);
        return this;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getCompany() {
        return this.company;
    }

    public Offre company(String company) {
        this.setCompany(company);
        return this;
    }

    public void setCompany(String company) {
        this.company = company;
    }

    public String getLocation() {
        return this.location;
    }

    public Offre location(String location) {
        this.setLocation(location);
        return this;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public TypeContrat getType() {
        return this.type;
    }

    public Offre type(TypeContrat type) {
        this.setType(type);
        return this;
    }

    public void setType(TypeContrat type) {
        this.type = type;
    }

    public String getSalary() {
        return this.salary;
    }

    public Offre salary(String salary) {
        this.setSalary(salary);
        return this;
    }

    public void setSalary(String salary) {
        this.salary = salary;
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

    public String getSkills() {
        return this.skills;
    }

    public Offre skills(String skills) {
        this.setSkills(skills);
        return this;
    }

    public void setSkills(String skills) {
        this.skills = skills;
    }

    public String getExperienceLevel() {
        return this.experienceLevel;
    }

    public Offre experienceLevel(String experienceLevel) {
        this.setExperienceLevel(experienceLevel);
        return this;
    }

    public void setExperienceLevel(String experienceLevel) {
        this.experienceLevel = experienceLevel;
    }

    public Instant getPostedDate() {
        return this.postedDate;
    }

    public Offre postedDate(Instant postedDate) {
        this.setPostedDate(postedDate);
        return this;
    }

    public void setPostedDate(Instant postedDate) {
        this.postedDate = postedDate;
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

    public Poste getPoste() {
        return this.poste;
    }

    public void setPoste(Poste poste) {
        this.poste = poste;
    }

    public Offre poste(Poste poste) {
        this.setPoste(poste);
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
            ", title='" + getTitle() + "'" +
            ", company='" + getCompany() + "'" +
            ", location='" + getLocation() + "'" +
            ", type='" + getType() + "'" +
            ", salary='" + getSalary() + "'" +
            ", description='" + getDescription() + "'" +
            ", skills='" + getSkills() + "'" +
            ", experienceLevel='" + getExperienceLevel() + "'" +
            ", postedDate='" + getPostedDate() + "'" +
            "}";
    }
}
