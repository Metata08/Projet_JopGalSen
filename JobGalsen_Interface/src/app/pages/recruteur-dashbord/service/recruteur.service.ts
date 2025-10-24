import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, switchMap, catchError, map } from 'rxjs';
import { AuthService } from '../../../auth.service';

// Interface Offre en français
export interface Offre {
  id?: number;
  titre: string;
  description: string;
  entreprise: string;
  localite: string;
  categorie: string;
  experience: string;
  exigences: string;
  benefice: string;
  dateDePostule: string;
  dateDeFin: string;
  urgent?: boolean;
  remuneration: number;
  contrat: string;
  recruteur?: any;
  postes: string[];
}

@Injectable({
  providedIn: 'root'
})
export class RecruteurService {

  private apiUrl = 'http://localhost:8080/api';

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) {}

  // Récupère l'ID du recruteur connecté de manière dynamique
  private getCurrentRecruiterId(): Observable<string> {
    return this.authService.currentUserId$.pipe(
      switchMap(id => {
        if (id) {
          return of(id.toString());
        }
        throw new Error('Recruteur non connecté');
      })
    );
  }

  // ----------------------------------------
  // Offres d'emploi
  // ----------------------------------------

  // Récupérer les offres
  getOffres(): Observable<Offre[]> {
    return this.getCurrentRecruiterId().pipe(
      switchMap(recruteurId =>
        this.http.get<Offre[]>(`${this.apiUrl}/offres/recruteur/${recruteurId}`)
      ),
      catchError(error => {
        console.error('Erreur lors de la récupération des offres:', error);
        return of([]);
      })
    );
  }

  getOffreById(id: string): Observable<Offre> {
    return this.http.get<Offre>(`${this.apiUrl}/offres/${id}`);
  }

  // Créer une offre
  creerOffre(offreData: Omit<Offre, 'id'>): Observable<Offre> {
    return this.getCurrentRecruiterId().pipe(
      switchMap(recruteurId => {
        const offrePayload = {
          ...offreData,
          recruteurId: recruteurId,
          dateDePostule: new Date().toISOString().split('T')[0] // Date du jour
        };

        console.log('Création offre avec payload:', offrePayload);
        
        return this.http.post<Offre>(`${this.apiUrl}/offres`, offrePayload);
      }),
      catchError(error => {
        console.error('Erreur création offre:', error);
        throw error;
      })
    );
  }

  // Méthode pour créer une offre exemple
  creerOffreExemple(): Observable<Offre> {
    const offreExemple: Omit<Offre, 'id'> = {
      titre: 'Développeur Full Stack Senior',
      description: 'Nous recherchons un développeur full stack expérimenté pour rejoindre notre équipe technique. Vous serez responsable du développement et de la maintenance des applications web.',
      entreprise: 'Tech Solutions SARL',
      localite: 'Dakar, Sénégal',
      categorie: 'Développement',
      experience: '5+ ans',
      exigences: 'Master en informatique, 5 ans d\'expérience minimum, Maîtrise de Angular et Spring Boot, Connaissance des bases de données relationnelles, Expérience en méthodologie Agile',
      benefice: 'Assurance santé, Tickets restaurant, Formation continue, Travail flexible, Équipe dynamique',
      dateDePostule: new Date().toISOString().split('T')[0],
      dateDeFin: '2024-12-31',
      urgent: true,
      remuneration: 1500000,
      contrat: 'CDI',
      postes: ['JavaScript', 'Angular', 'TypeScript', 'Java', 'Spring Boot', 'MySQL', 'Git']
    };

    return this.creerOffre(offreExemple);
  }

  // Créer une offre mobile
  creerOffreMobile(): Observable<Offre> {
    const offreMobile: Omit<Offre, 'id'> = {
      titre: 'Développeur Mobile React Native',
      description: 'Rejoignez notre équipe mobile pour développer des applications innovantes. Vous travaillerez sur des projets variés avec les dernières technologies.',
      entreprise: 'StartUp Innovante',
      localite: 'Dakar Plateau',
      categorie: 'Développement Mobile',
      experience: '3+ ans',
      exigences: '3 ans d\'expérience en développement mobile, Maîtrise de React Native, Connaissance des APIs REST, Expérience avec les stores d\'applications',
      benefice: 'Salaire compétitif, Equity, Télétravail partiel, Environnement startup',
      dateDePostule: new Date().toISOString().split('T')[0],
      dateDeFin: '2024-11-30',
      urgent: false,
      remuneration: 1200000,
      contrat: 'CDI',
      postes: ['React Native', 'JavaScript', 'TypeScript', 'Redux', 'Firebase', 'REST API']
    };

    return this.creerOffre(offreMobile);
  }

  // Créer une offre design
  creerOffreDesign(): Observable<Offre> {
    const offreDesign: Omit<Offre, 'id'> = {
      titre: 'Designer UI/UX Senior',
      description: 'Nous cherchons un designer UI/UX créatif pour concevoir des interfaces utilisateur exceptionnelles. Vous travaillerez sur des projets web et mobile.',
      entreprise: 'Agence Creative',
      localite: 'Almadies, Dakar',
      categorie: 'Design',
      experience: '4+ ans',
      exigences: 'Portfolio solide, 4 ans d\'expérience en design UI/UX, Maîtrise de Figma et Adobe Creative Suite, Connaissance des principes d\'UX',
      benefice: 'Projets variés, Environnement créatif, Équipe talentueuse, Formation continue',
      dateDePostule: new Date().toISOString().split('T')[0],
      dateDeFin: '2024-10-15',
      urgent: true,
      remuneration: 1000000,
      contrat: 'CDI',
      postes: ['Figma', 'UI Design', 'UX Design', 'Adobe XD', 'Prototyping', 'User Research']
    };

    return this.creerOffre(offreDesign);
  }

  // Mettre à jour une offre
  mettreAJourOffre(id: number, offreData: Partial<Offre>): Observable<Offre> {
    return this.http.put<Offre>(`${this.apiUrl}/offres/${id}`, offreData);
  }

  // Supprimer une offre
  supprimerOffre(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/offres/${id}`);
  }

  // Formater le salaire pour l'affichage
  formaterSalaire(remuneration: number): string {
    if (remuneration >= 1000000) {
      return `${(remuneration / 1000000).toFixed(1)}M XOF`;
    } else if (remuneration >= 1000) {
      return `${(remuneration / 1000).toFixed(0)}K XOF`;
    }
    return `${remuneration} XOF`;
  }

  // ----------------------------------------
  // Candidats
  // ----------------------------------------

  getCandidats(): Observable<any[]> {
    return this.getCurrentRecruiterId().pipe(
      switchMap(recruteurId =>
        of(this.mockGetCandidats(recruteurId))
      ),
      catchError(error => {
        console.error('Erreur lors de la récupération des candidats:', error);
        return of([]);
      })
    );
  }

  // ----------------------------------------
  // Statistiques
  // ----------------------------------------

  getStatistiques(): Observable<any> {
    return of(this.mockGetStatistiques());
  }

  // ----------------------------------------
  // Méthodes mock pour le développement
  // ----------------------------------------

  private mockGetCandidats(recruteurId: string): any[] {
    return [
      {
        id: '1',
        nom: 'Aminata Diallo',
        email: 'aminata.diallo@email.com',
        poste: 'Développeur Full Stack Senior',
        statut: 'en_attente',
        score: 85,
        dateCandidature: '2024-01-16',
        recruteurId: recruteurId,
        offreId: '1',
        telephone: '+221 77 123 45 67'
      },
      {
        id: '2',
        nom: 'Moussa Sow',
        email: 'moussa.sow@email.com',
        poste: 'Développeur Frontend',
        statut: 'examiné',
        score: 92,
        dateCandidature: '2024-01-15',
        recruteurId: recruteurId,
        offreId: '1',
        telephone: '+221 76 234 56 78'
      }
    ];
  }

  private mockGetStatistiques(): any {
    return {
      candidatures: 5,
      vuesProfil: 20,
      offresSauvegardees: 30,
      entretiens: 10,
      tauxCandidature: 0.25,
      tauxEntretien: 0.2,
      derniereMiseAJour: new Date(),
      progressionHebdomadaire: {
        candidatures: 5,
        vuesProfil: 20,
        entretiens: 2
      }
    };
  }
}