import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NavigationComponent } from '../../ui/navigation/navigation.component';
import { FooterComponent } from '../../ui/footer/footer.component';
import { ReactiveFormsModule } from '@angular/forms';

import { Job } from '../../models/job.model'; 
import { PublicService } from '../../services/public.service';

@Component({
  selector: 'app-offres',
  standalone: true,
  imports: [CommonModule, NavigationComponent, FooterComponent, ReactiveFormsModule],
  templateUrl: './offres.component.html',
  styleUrls: ['./offres.component.css']
})
export class OffresComponent implements OnInit {
  
  searchForm: FormGroup;
  jobs: Job[] = [];
  filteredJobs: Job[] = [];
  isLoading: boolean = false;
  
  // Options dynamiques depuis le service
  locations: string[] = [];
  categories: string[] = [];
  types: string[] = [];
  
  // Options pour les selects
  sortOptions = [
    { value: 'recent', label: 'Plus récent' },
    { value: 'salary', label: 'Salaire' },
    { value: 'deadline', label: 'Date limite' },
    { value: 'urgent', label: 'Offres urgentes' }
  ];

  experienceOptions = [
    { value: '', label: 'Tous les niveaux' },
    { value: '0-2', label: 'Débutant (0-2 ans)' },
    { value: '2-5', label: 'Intermédiaire (2-5 ans)' },
    { value: '5+', label: 'Senior (5+ ans)' }
  ];

  constructor(
    private fb: FormBuilder,
    private publicService: PublicService
  ) {
    this.searchForm = this.fb.group({
      search: [''],
      category: [''],
      type: [''],
      location: [''],
      experience: [''],
      sort: ['']
    });
  }

  ngOnInit(): void {
    this.loadJobs();
    this.loadFilterOptions();
    this.setupFormListeners();
  }

  /**
   * Charge toutes les offres d'emploi depuis le service
   */
  private loadJobs(): void {
    this.isLoading = true;
    this.publicService.getOffres().subscribe({
      next: (jobs) => {
        this.jobs = jobs;
        this.filteredJobs = [...jobs];
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Erreur lors du chargement des offres:', error);
        this.isLoading = false;
      }
    });
  }

  /**
   * Charge les options de filtre depuis le service
   */
  private loadFilterOptions(): void {
    // Charger les localisations
    this.publicService.getJobLocations().subscribe({
      next: (locations) => {
        this.locations = locations;
      }
    });

    // Charger les catégories
    this.publicService.getJobCategories().subscribe({
      next: (categories) => {
        this.categories = categories;
      }
    });

    // Charger les types
    this.publicService.getJobTypes().subscribe({
      next: (types) => {
        this.types = types;
      }
    });
  }

  /**
   * Configure les écouteurs pour les changements de formulaire
   */
  private setupFormListeners(): void {
    this.searchForm.valueChanges.subscribe(value => {
      this.filterJobs();
    });
  }

  /**
   * Filtre les offres selon les critères de recherche
   */
  private filterJobs(): void {
    const { search, category, type, location, experience, sort } = this.searchForm.value;
    
    let filtered = [...this.jobs];

    // Filtre par recherche texte
    if (search) {
      const term = search.toLowerCase();
      filtered = filtered.filter(job => 
        job.title.toLowerCase().includes(term) ||
        job.company.toLowerCase().includes(term) ||
        job.description.toLowerCase().includes(term) ||
        job.requirements.toLowerCase().includes(term) ||
        job.skills.some(skill => skill.toLowerCase().includes(term))
      );
    }

    // Filtres avancés
    if (category) {
      filtered = filtered.filter(job => job.category === category);
    }

    if (type) {
      filtered = filtered.filter(job => job.type === type);
    }

    if (location) {
      filtered = filtered.filter(job => job.location.includes(location));
    }

    if (experience) {
      filtered = filtered.filter(job => {
        const jobExp = job.experience.toLowerCase();
        return jobExp.includes(experience);
      });
    }

    // Tri
    if (sort) {
      filtered = this.sortJobs(filtered, sort);
    }

    this.filteredJobs = filtered;
  }

  /**
   * Trie les offres selon le critère sélectionné
   */
  private sortJobs(jobs: Job[], sortBy: string): Job[] {
    switch (sortBy) {
      case 'recent':
        return jobs.sort((a, b) => new Date(b.postedDate).getTime() - new Date(a.postedDate).getTime());
      case 'salary':
        return jobs.sort((a, b) => this.parseSalary(b.salary) - this.parseSalary(a.salary));
      case 'deadline':
        return jobs.sort((a, b) => new Date(a.deadline).getTime() - new Date(b.deadline).getTime());
      case 'urgent':
        return jobs.sort((a, b) => (b.urgent ? 1 : 0) - (a.urgent ? 1 : 0));
      default:
        return jobs;
    }
  }

  /**
   * Parse le salaire pour le tri
   */
  private parseSalary(salary: string): number {
    const match = salary.match(/\d+/g);
    return match ? parseInt(match[0]) : 0;
  }

  /**
   * Formate la date pour l'affichage
   */
  formatDate(date: string): string {
    return new Date(date).toLocaleDateString('fr-FR');
  }

  /**
   * Vérifie si une offre est urgente (date limite proche)
   */
  isJobUrgent(job: Job): boolean {
    const deadline = new Date(job.deadline);
    const today = new Date();
    const diffTime = deadline.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays <= 3;
  }

  onSearch(): void {
    this.filterJobs();
  }

  onApply(job: Job): void {
    console.log('Postuler à:', job.title);
    // Logique de postulation
  }

  onViewDetails(job: Job): void {
    console.log('Voir détails:', job.title);
    this.publicService.getJobById(job.id).subscribe({
      next: (jobDetail) => {
        console.log('Détails du job:', jobDetail);
        // Navigation vers page détail ou ouverture modal
      },
      error: (error) => {
        console.error('Erreur lors du chargement des détails:', error);
      }
    });
  }

  onLoadMore(): void {
    console.log('Charger plus d\'offres');
    // Logique pour charger plus d'offres - pagination à implémenter
  }

  /**
   * Réinitialise tous les filtres
   */
  onResetFilters(): void {
    this.searchForm.reset();
    this.filteredJobs = [...this.jobs];
  }
}