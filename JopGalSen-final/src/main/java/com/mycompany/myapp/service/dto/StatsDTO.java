package com.mycompany.myapp.service.dto;

public class StatsDTO {
private Long offresActives;
    private Long candidatsInscrits;
    private Long entreprises;

    // Constructeur, Getters et Setters

    public StatsDTO() {
        // Constructeur vide nécessaire pour la sérialisation
    }

    public Long getOffresActives() {
        return offresActives;
    }

    public void setOffresActives(Long offresActives) {
        this.offresActives = offresActives;
    }

    public Long getCandidatsInscrits() {
        return candidatsInscrits;
    }

    public void setCandidatsInscrits(Long candidatsInscrits) {
        this.candidatsInscrits = candidatsInscrits;
    }

    public Long getEntreprises() {
        return entreprises;
    }

    public void setEntreprises(Long entreprises) {
        this.entreprises = entreprises;
    }
}
