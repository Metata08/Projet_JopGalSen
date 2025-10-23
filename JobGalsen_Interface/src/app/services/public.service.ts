import { Injectable } from '@angular/core';
import { Observable, of, throwError, map } from 'rxjs';
import { delay } from 'rxjs/operators';
import { HttpClient, HttpParams, HttpResponse } from '@angular/common/http';
// Import des modèles
import { Job, MOCK_JOBS } from '../models/job.model';
import { Entreprise, EntrepriseStats, MOCK_Entreprises, MOCK_Entreprise_STATS } from '../models/entreprise.model';
import { Conseils, ConseilsCategory, MOCK_Conseils, MOCK_CATEGORIES } from '../models/conseils.model';
import { TeamMember, CompanyValue, MOCK_TEAM_MEMBERS, MOCK_VALUES } from '../models/a-propos.model';


export interface OffreDTO {
  id: number;
  title: string;
  company: string;
  location: string;
  type: string;
  category: string;
  salary: string;
  experience: string;
  description: string;
  requirements: string;
  benefits: string;
  deadline: string;
  postedDate: string;
  urgent?: boolean;
  skills: string[];
}

/**
 * Service public global pour la gestion des données de l'application
 * Fournit des méthodes CRUD pour tous les modèles de données
 * 
 * @providedIn: 'root' - Injection globale dans toute l'application
 */
@Injectable({
  providedIn: 'root'
})
export class PublicService {

  //url de l'api backend
  private  offresUrl = 'http://localhost:8080/api/offres';

  // Simulation d'un délai réseau pour les opérations asynchrones
  private readonly NETWORK_DELAY = 300;

  constructor(private http: HttpClient) { }

  // ===========================================================================
  // MÉTHODES POUR LES OFFRES D'EMPLOI (Jobs) - MISES À JOUR
  // ===========================================================================

  /**
   * Récupère toutes les offres d'emploi
   * @returns Observable avec la liste des offres
   */
  getOffres(page = 0, size = 10, sort = 'id,desc', eagerload = true): Observable<OffreDTO[]> {
    let params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString())
      .set('sort', sort)
      .set('eagerload', eagerload.toString());

    // On utilise HttpResponse pour récupérer aussi les headers si besoin (ex: total count)
    return this.http.get<OffreDTO[]>(this.offresUrl, { params, observe: 'response' }).pipe(
      map((res: HttpResponse<OffreDTO[]>) => {
        // Tu peux récupérer ici les informations de pagination dans res.headers si souhaité
        // Exemple : const totalCount = res.headers.get('X-Total-Count');
        // Pour simplicité, on retourne juste le corps
        return res.body || [];
      })
    );
  }
  getAllJobs(): Observable<Job[]> {
    return of(MOCK_JOBS).pipe(delay(this.NETWORK_DELAY));
  }

  /**
   * Récupère une offre d'emploi par son ID
   * @param id - ID de l'offre
   * @returns Observable avec l'offre ou undefined si non trouvée
   */
  getJobById(id: number): Observable<Job | undefined> {
    const job = MOCK_JOBS.find(j => j.id === id);
    return of(job).pipe(delay(this.NETWORK_DELAY));
  }

  /**
   * Récupère les offres urgentes
   * @returns Observable avec les offres marquées comme urgentes
   */
  getUrgentJobs(): Observable<Job[]> {
    const urgentJobs = MOCK_JOBS.filter(job => job.urgent);
    return of(urgentJobs).pipe(delay(this.NETWORK_DELAY));
  }

  /**
   * Récupère les offres par catégorie
   * @param category - Catégorie de l'offre
   * @returns Observable avec les offres de la catégorie
   */
  getJobsByCategory(category: string): Observable<Job[]> {
    const jobs = MOCK_JOBS.filter(job => 
      job.category.toLowerCase() === category.toLowerCase()
    );
    return of(jobs).pipe(delay(this.NETWORK_DELAY));
  }

  /**
   * Récupère les offres par type de contrat
   * @param type - Type de contrat (CDI, CDD, etc.)
   * @returns Observable avec les offres du type spécifié
   */
  getJobsByType(type: string): Observable<Job[]> {
    const jobs = MOCK_JOBS.filter(job => 
      job.type.toLowerCase() === type.toLowerCase()
    );
    return of(jobs).pipe(delay(this.NETWORK_DELAY));
  }

  /**
   * Récupère les offres par localisation
   * @param location - Localisation
   * @returns Observable avec les offres de la localisation
   */
  getJobsByLocation(location: string): Observable<Job[]> {
    const jobs = MOCK_JOBS.filter(job => 
      job.location.toLowerCase().includes(location.toLowerCase())
    );
    return of(jobs).pipe(delay(this.NETWORK_DELAY));
  }

  /**
   * Ajoute une nouvelle offre d'emploi
   * @param job - Offre à ajouter
   * @returns Observable avec l'offre ajoutée (avec nouvel ID)
   */
  addJob(job: Omit<Job, 'id'>): Observable<Job> {
    const newId = Math.max(...MOCK_JOBS.map(j => j.id)) + 1;
    const newJob: Job = { 
      ...job, 
      id: newId
    };
    MOCK_JOBS.push(newJob);
    return of(newJob).pipe(delay(this.NETWORK_DELAY));
  }

  /**
   * Met à jour une offre d'emploi existante
   * @param id - ID de l'offre à mettre à jour
   * @param updates - Données de mise à jour
   * @returns Observable avec l'offre mise à jour
   */
  updateJob(id: number, updates: Partial<Job>): Observable<Job> {
    const index = MOCK_JOBS.findIndex(j => j.id === id);
    if (index === -1) {
      return throwError(() => new Error(`Offre avec ID ${id} non trouvée`));
    }
    
    MOCK_JOBS[index] = { ...MOCK_JOBS[index], ...updates };
    return of(MOCK_JOBS[index]).pipe(delay(this.NETWORK_DELAY));
  }

  /**
   * Supprime une offre d'emploi
   * @param id - ID de l'offre à supprimer
   * @returns Observable avec true si suppression réussie
   */
  deleteJob(id: number): Observable<boolean> {
    const index = MOCK_JOBS.findIndex(j => j.id === id);
    if (index === -1) {
      return throwError(() => new Error(`Offre avec ID ${id} non trouvée`));
    }
    
    MOCK_JOBS.splice(index, 1);
    return of(true).pipe(delay(this.NETWORK_DELAY));
  }

  /**
   * Récupère les catégories d'emploi uniques
   * @returns Observable avec la liste des catégories
   */
  getJobCategories(): Observable<string[]> {
    const categories = [...new Set(MOCK_JOBS.map(job => job.category))];
    return of(categories).pipe(delay(this.NETWORK_DELAY));
  }

  /**
   * Récupère les types de contrat uniques
   * @returns Observable avec la liste des types
   */
  getJobTypes(): Observable<string[]> {
    const types = [...new Set(MOCK_JOBS.map(job => job.type))];
    return of(types).pipe(delay(this.NETWORK_DELAY));
  }

  /**
   * Récupère les localisations uniques
   * @returns Observable avec la liste des localisations
   */
  getJobLocations(): Observable<string[]> {
    const locations = [...new Set(MOCK_JOBS.map(job => job.location))];
    return of(locations).pipe(delay(this.NETWORK_DELAY));
  }

  // ===========================================================================
  // MÉTHODES POUR LES ENTREPRISES (Entreprises)
  // ===========================================================================

  /**
   * Récupère toutes les entreprises
   * @returns Observable avec la liste des entreprises
   */
  getAllEntreprises(): Observable<Entreprise[]> {
    return of(MOCK_Entreprises).pipe(delay(this.NETWORK_DELAY));
  }

  /**
   * Récupère une entreprise par son ID
   * @param id - ID de l'entreprise
   * @returns Observable avec l'entreprise ou undefined si non trouvée
   */
  getEntrepriseById(id: number): Observable<Entreprise | undefined> {
    const entreprise = MOCK_Entreprises.find(c => c.id === id);
    return of(entreprise).pipe(delay(this.NETWORK_DELAY));
  }

  /**
   * Récupère les statistiques des entreprises
   * @returns Observable avec les statistiques
   */
  getEntrepriseStats(): Observable<EntrepriseStats[]> {
    return of(MOCK_Entreprise_STATS).pipe(delay(this.NETWORK_DELAY));
  }

  /**
   * Ajoute une nouvelle entreprise
   * @param entreprise - Entreprise à ajouter
   * @returns Observable avec l'entreprise ajoutée (avec nouvel ID)
   */
  addEntreprise(entreprise: Omit<Entreprise, 'id'>): Observable<Entreprise> {
    const newId = Math.max(...MOCK_Entreprises.map(c => c.id)) + 1;
    const newEntreprise: Entreprise = { ...entreprise, id: newId };
    MOCK_Entreprises.push(newEntreprise);
    return of(newEntreprise).pipe(delay(this.NETWORK_DELAY));
  }

  // ===========================================================================
  // MÉTHODES POUR LES ARTICLES (Conseils)
  // ===========================================================================

  /**
   * Récupère tous les articles
   * @returns Observable avec la liste des articles
   */
  getAllConseils(): Observable<Conseils[]> {
    return of(MOCK_Conseils).pipe(delay(this.NETWORK_DELAY));
  }

  /**
   * Récupère un article par son ID
   * @param id - ID de l'article
   * @returns Observable avec l'article ou undefined si non trouvé
   */
  getConseilById(id: number): Observable<Conseils | undefined> {
    const article = MOCK_Conseils.find(a => a.id === id);
    return of(article).pipe(delay(this.NETWORK_DELAY));
  }

  /**
   * Récupère toutes les catégories d'articles
   * @returns Observable avec la liste des catégories
   */
  getConseilCategories(): Observable<ConseilsCategory[]> {
    return of(MOCK_CATEGORIES).pipe(delay(this.NETWORK_DELAY));
  }

  /**
   * Récupère les articles par catégorie
   * @param category - Nom de la catégorie
   * @returns Observable avec les articles de la catégorie
   */
  getConseilsByCategory(category: string): Observable<Conseils[]> {
    const articles = MOCK_Conseils.filter(a => a.category === category);
    return of(articles).pipe(delay(this.NETWORK_DELAY));
  }

  /**
   * Ajoute un nouvel article
   * @param conseil - Article à ajouter
   * @returns Observable avec l'article ajouté (avec nouvel ID)
   */
  addConseil(conseil: Omit<Conseils, 'id'>): Observable<Conseils> {
    const newId = Math.max(...MOCK_Conseils.map(a => a.id)) + 1;
    const newConseil: Conseils = { ...conseil, id: newId };
    MOCK_Conseils.push(newConseil);
    return of(newConseil).pipe(delay(this.NETWORK_DELAY));
  }

  // ===========================================================================
  // MÉTHODES POUR L'ÉQUIPE ET VALEURS (APropos)
  // ===========================================================================

  /**
   * Récupère tous les membres de l'équipe
   * @returns Observable avec la liste des membres
   */
  getTeamMembers(): Observable<TeamMember[]> {
    return of(MOCK_TEAM_MEMBERS).pipe(delay(this.NETWORK_DELAY));
  }

  /**
   * Récupère toutes les valeurs de l'entreprise
   * @returns Observable avec la liste des valeurs
   */
  getCompanyValues(): Observable<CompanyValue[]> {
    return of(MOCK_VALUES).pipe(delay(this.NETWORK_DELAY));
  }

  // ===========================================================================
  // MÉTHODES GÉNÉRIQUES DE RECHERCHE - MISES À JOUR
  // ===========================================================================

  /**
   * Recherche avancée des offres d'emploi
   * @param searchTerm - Terme de recherche
   * @param filters - Filtres optionnels
   * @returns Observable avec les offres correspondantes
   */
  searchJobs(
    searchTerm: string, 
    filters?: { category?: string; type?: string; location?: string; experience?: string }
  ): Observable<Job[]> {
    const term = searchTerm.toLowerCase();
    let results = MOCK_JOBS.filter(job => 
      job.title.toLowerCase().includes(term) ||
      job.company.toLowerCase().includes(term) ||
      job.description.toLowerCase().includes(term) ||
      job.requirements.toLowerCase().includes(term) ||
      job.skills.some(skill => skill.toLowerCase().includes(term))
    );

    // Application des filtres
    if (filters) {
      if (filters.category) {
        results = results.filter(job => 
          job.category.toLowerCase() === filters.category!.toLowerCase()
        );
      }
      if (filters.type) {
        results = results.filter(job => 
          job.type.toLowerCase() === filters.type!.toLowerCase()
        );
      }
      if (filters.location) {
        results = results.filter(job => 
          job.location.toLowerCase().includes(filters.location!.toLowerCase())
        );
      }
      if (filters.experience) {
        results = results.filter(job => 
          job.experience.toLowerCase().includes(filters.experience!.toLowerCase())
        );
      }
    }

    return of(results).pipe(delay(this.NETWORK_DELAY));
  }

  /**
   * Recherche des entreprises par terme
   * @param searchTerm - Terme de recherche
   * @returns Observable avec les entreprises correspondantes
   */
  searchEntreprises(searchTerm: string): Observable<Entreprise[]> {
    const term = searchTerm.toLowerCase();
    const results = MOCK_Entreprises.filter(entreprise =>
      entreprise.name.toLowerCase().includes(term) ||
      entreprise.sector.toLowerCase().includes(term) ||
      entreprise.description.toLowerCase().includes(term)
    );
    return of(results).pipe(delay(this.NETWORK_DELAY));
  }

  /**
   * Recherche des articles par terme
   * @param searchTerm - Terme de recherche
   * @returns Observable avec les articles correspondants
   */
  searchConseils(searchTerm: string): Observable<Conseils[]> {
    const term = searchTerm.toLowerCase();
    const results = MOCK_Conseils.filter(conseil =>
      conseil.title.toLowerCase().includes(term) ||
      conseil.excerpt.toLowerCase().includes(term) ||
      conseil.category.toLowerCase().includes(term) ||
      conseil.author.toLowerCase().includes(term)
    );
    return of(results).pipe(delay(this.NETWORK_DELAY));
  }

  /**
   * Recherche les offres avec date limite proche
   * @param days - Nombre de jours avant échéance
   * @returns Observable avec les offres urgentes
   */
  getJobsNearDeadline(days: number = 7): Observable<Job[]> {
    const today = new Date();
    const deadlineLimit = new Date();
    deadlineLimit.setDate(today.getDate() + days);

    const urgentJobs = MOCK_JOBS.filter(job => {
      const deadline = new Date(job.deadline);
      return deadline <= deadlineLimit && deadline >= today;
    });

    return of(urgentJobs).pipe(delay(this.NETWORK_DELAY));
  }
}