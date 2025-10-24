import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RecruteurHeaderComponent } from '../../ui/recruteur-header/recruteur-header.component';
import { RecruteurService, Offre } from './service/recruteur.service';

@Component({
  selector: 'app-recruteur-dashbord',
  imports: [ CommonModule, FormsModule, ReactiveFormsModule, RecruteurHeaderComponent ],
  templateUrl: './recruteur-dashbord.component.html',
  styleUrls: ['./recruteur-dashbord.component.css']
})
export class RecruteurDashbordComponent implements OnInit {
  ongletActif: string = 'offres';
  offres: Offre[] = [];
  candidats: any[] = [];
  statistiques: any = null;
  chargement = true;
  erreur: string | null = null;

  constructor(
    private router: Router,
    private recruteurService: RecruteurService
  ) {}

  ngOnInit(): void {
    this.chargerDonnees();
  }

  chargerDonnees(): void {
    this.chargement = true;
    this.erreur = null;

    let compteurCharge = 0;
    const totalACharger = 3;

    const verifierChargementComplet = () => {
      compteurCharge++;
      if (compteurCharge >= totalACharger) {
        this.chargement = false;
      }
    };

    // Charger les offres
    this.recruteurService.getOffres().subscribe({
      next: (offres) => {
        this.offres = offres;
        console.log('Offres chargées:', offres);
        verifierChargementComplet();
      },
      error: (err) => {
        console.error('Erreur offres:', err);
        this.erreur = 'Erreur lors du chargement des offres';
        verifierChargementComplet();
      }
    });

    // Charger les candidats
    this.recruteurService.getCandidats().subscribe({
      next: (candidats) => {
        this.candidats = candidats;
        verifierChargementComplet();
      },
      error: (err) => {
        console.error('Erreur candidats:', err);
        verifierChargementComplet();
      }
    });

    // Charger les statistiques
    this.recruteurService.getStatistiques().subscribe({
      next: (stats) => {
        this.statistiques = stats;
        verifierChargementComplet();
      },
      error: (err) => {
        console.error('Erreur statistiques:', err);
        verifierChargementComplet();
      }
    });
  }

  changerOnglet(onglet: string): void {
    this.ongletActif = onglet;
  }

  naviguerCreerOffre(): void {
    this.router.navigate(['/create-emploi']);
  }

  // Créer une offre exemple
  creerOffreExemple(): void {
    this.recruteurService.creerOffreExemple().subscribe({
      next: (offre) => {
        console.log('Offre créée avec succès:', offre);
        this.chargerDonnees();
        this.afficherSucces('Offre créée avec succès !');
      },
      error: (error) => {
        console.error('Erreur création offre:', error);
        this.erreur = 'Erreur lors de la création de l\'offre';
      }
    });
  }

  // Créer une offre mobile
  creerOffreMobile(): void {
    this.recruteurService.creerOffreMobile().subscribe({
      next: (offre) => {
        console.log('Offre mobile créée:', offre);
        this.chargerDonnees();
        this.afficherSucces('Offre mobile créée avec succès !');
      },
      error: (error) => {
        console.error('Erreur création offre mobile:', error);
        this.erreur = 'Erreur lors de la création de l\'offre mobile';
      }
    });
  }

  // Créer une offre design
  creerOffreDesign(): void {
    this.recruteurService.creerOffreDesign().subscribe({
      next: (offre) => {
        console.log('Offre design créée:', offre);
        this.chargerDonnees();
        this.afficherSucces('Offre design créée avec succès !');
      },
      error: (error) => {
        console.error('Erreur création offre design:', error);
        this.erreur = 'Erreur lors de la création de l\'offre design';
      }
    });
  }

  voirDetailsOffre(offreId: number): void {
    this.router.navigate(['/offre', offreId]);
  }

  voirProfilCandidat(candidatId: string): void {
    this.router.navigate(['/candidat', candidatId]);
  }

  getClasseStatut(statut: string): string {
    const classesStatut: Record<string, string> = {
      'actif': 'badge bg-success',
      'brouillon': 'badge bg-warning',
      'fermé': 'badge bg-secondary',
      'en_attente': 'badge bg-warning',
      'examiné': 'badge bg-info',
      'accepté': 'badge bg-success',
      'refusé': 'badge bg-danger'
    };
    return classesStatut[statut] || 'badge bg-secondary';
  }

  getTexteStatut(statut: string): string {
    const textesStatut: Record<string, string> = {
      'actif': 'Active',
      'brouillon': 'Brouillon',
      'fermé': 'Fermée',
      'en_attente': 'En attente',
      'examiné': 'Examiné',
      'accepté': 'Accepté',
      'refusé': 'Refusé'
    };
    return textesStatut[statut] || statut;
  }

  formaterSalaire(remuneration: number): string {
    return this.recruteurService.formaterSalaire(remuneration);
  }

  private afficherSucces(message: string): void {
    alert(message);
  }

  rechargerDonnees(): void {
    this.chargerDonnees();
  }
}