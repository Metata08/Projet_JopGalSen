import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavigationComponent } from '../../ui/navigation/navigation.component';
import { FooterComponent } from '../../ui/footer/footer.component';

// Import des modèles et service
import { Entreprise, EntrepriseStats } from '../../models/entreprise.model';
import { PublicService } from '../../services/public.service';

@Component({
  selector: 'app-entreprises',
  standalone: true,
  imports: [CommonModule, NavigationComponent, FooterComponent],
  templateUrl: './entreprises.component.html',
  styleUrls: ['./entreprises.component.css']
})
export class EntreprisesComponent implements OnInit {
  
  entreprises: Entreprise[] = [];
  stats: EntrepriseStats[] = [];
  isLoading: boolean = false;
  filteredEntreprises: Entreprise[] = [];

  // Icônes Bootstrap pour remplacer Lucide React
  icons = {
    mapPin: 'bi bi-geo-alt',
    users: 'bi bi-people',
    building: 'bi bi-building',
    star: 'bi bi-star'
  };

  // Options de filtre
  sectors: string[] = [];
  locations: string[] = [];

  constructor(private publicService: PublicService) { }

  ngOnInit(): void {
    this.loadEntreprises();
    this.loadStats();
    this.loadFilterOptions();
  }

  /**
   * Charge toutes les entreprises depuis le service
   */
  private loadEntreprises(): void {
    this.isLoading = true;
    this.publicService.getAllEntreprises().subscribe({
      next: (entreprises) => {
        this.entreprises = entreprises;
        this.filteredEntreprises = [...entreprises];
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Erreur lors du chargement des entreprises:', error);
        this.isLoading = false;
      }
    });
  }

  /**
   * Charge les statistiques depuis le service
   */
  private loadStats(): void {
    this.publicService.getEntrepriseStats().subscribe({
      next: (stats) => {
        this.stats = stats;
      },
      error: (error) => {
        console.error('Erreur lors du chargement des statistiques:', error);
      }
    });
  }

  /**
   * Charge les options de filtre depuis les données
   */
  private loadFilterOptions(): void {
    // Extraire les secteurs uniques
    this.sectors = [...new Set(this.entreprises.map(entreprise => entreprise.sector))];
    
    // Extraire les localisations uniques
    this.locations = [...new Set(this.entreprises.map(entreprise => entreprise.location))];
  }

  /**
   * Filtre les entreprises par secteur
   */
  filterBySector(sector: string): void {
    if (sector === 'all') {
      this.filteredEntreprises = [...this.entreprises];
    } else {
      this.filteredEntreprises = this.entreprises.filter(entreprise => 
        entreprise.sector === sector
      );
    }
  }

  /**
   * Filtre les entreprises par localisation
   */
  filterByLocation(location: string): void {
    if (location === 'all') {
      this.filteredEntreprises = [...this.entreprises];
    } else {
      this.filteredEntreprises = this.entreprises.filter(entreprise => 
        entreprise.location === location
      );
    }
  }

  /**
   * Recherche d'entreprises par terme
   */
  onSearch(event: Event): void {
    const searchTerm = (event.target as HTMLInputElement).value.toLowerCase();
    
    if (!searchTerm) {
      this.filteredEntreprises = [...this.entreprises];
      return;
    }

    this.filteredEntreprises = this.entreprises.filter(entreprise =>
      entreprise.name.toLowerCase().includes(searchTerm) ||
      entreprise.sector.toLowerCase().includes(searchTerm) ||
      entreprise.description.toLowerCase().includes(searchTerm)
    );
  }

  onFollowEntreprise(entreprise: Entreprise): void {
    console.log('Suivre entreprise:', entreprise.name);
    // Logique pour suivre l'entreprise - pourrait utiliser le service
  }

  onViewJobs(entreprise: Entreprise): void {
    console.log('Voir offres de:', entreprise.name);
    // Recherche des offres de cette entreprise
    this.publicService.searchJobs(entreprise.name).subscribe({
      next: (jobs) => {
        console.log(`Offres de ${entreprise.name}:`, jobs);
        // Navigation vers page offres avec filtre
      },
      error: (error) => {
        console.error('Erreur lors de la recherche des offres:', error);
      }
    });
  }

  onViewAllEntreprises(): void {
    console.log('Voir toutes les entreprises');
    this.filteredEntreprises = [...this.entreprises];
  }

  /**
   * Génère les étoiles pour l'affichage du rating
   */
  generateStars(rating: number): { filled: boolean }[] {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push({ 
        filled: i <= Math.floor(rating),
        half: i === Math.ceil(rating) && !Number.isInteger(rating)
      });
    }
    return stars;
  }

  /**
   * Retourne la classe CSS pour les étoiles
   */
  getStarClass(star: { filled: boolean; half: boolean }): string {
    if (star.filled) {
      return 'bi bi-star-fill text-warning';
    } else if (star.half) {
      return 'bi bi-star-half text-warning';
    } else {
      return 'bi bi-star text-muted';
    }
  }

  /**
   * Retourne la classe de badge selon le secteur
   */
  getSectorBadgeClass(sector: string): string {
    const sectorClasses: { [key: string]: string } = {
      'Technologie': 'bg-primary bg-opacity-10 text-primary',
      'Conseil Digital': 'bg-info bg-opacity-10 text-info',
      'Fintech': 'bg-success bg-opacity-10 text-success',
      'AgriTech': 'bg-warning bg-opacity-10 text-warning'
    };
    
    return sectorClasses[sector] || 'bg-secondary bg-opacity-10 text-dark';
  }
}