import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NavigationComponent } from '../../ui/navigation/navigation.component';
import { FooterComponent } from '../../ui/footer/footer.component';
import { ReactiveFormsModule } from '@angular/forms';

// Import des modèles et service
import { Conseils, ConseilsCategory } from '../../models/conseils.model';
import { PublicService } from '../../services/public.service';

@Component({
  selector: 'app-conseils',
  standalone: true,
  imports: [CommonModule, NavigationComponent, FooterComponent, ReactiveFormsModule],
  templateUrl: './conseils.component.html',
  styleUrls: ['./conseils.component.css']
})
export class ConseilsComponent implements OnInit {
  
  newsletterForm: FormGroup;
  
  conseils: Conseils[] = [];
  categories: ConseilsCategory[] = [];
  filteredConseils: Conseils[] = [];
  isLoading: boolean = false;
  
  // Icônes Bootstrap pour remplacer Lucide React
  icons = {
    bookOpen: 'bi bi-journal-text',
    target: 'bi bi-bullseye',
    user: 'bi bi-person',
    calendar: 'bi bi-calendar',
    arrowRight: 'bi bi-arrow-right',
    users: 'bi bi-people'
  };

  constructor(
    private fb: FormBuilder,
    private publicService: PublicService
  ) {
    this.newsletterForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }

  ngOnInit(): void {
    this.loadConseils();
    this.loadCategories();
  }

  /**
   * Charge tous les conseils depuis le service
   */
  private loadConseils(): void {
    this.isLoading = true;
    this.publicService.getAllConseils().subscribe({
      next: (conseils) => {
        this.conseils = conseils;
        this.filteredConseils = [...conseils];
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Erreur lors du chargement des conseils:', error);
        this.isLoading = false;
      }
    });
  }

  /**
   * Charge les catégories depuis le service
   */
  private loadCategories(): void {
    this.publicService.getConseilCategories().subscribe({
      next: (categories) => {
        this.categories = categories;
      },
      error: (error) => {
        console.error('Erreur lors du chargement des catégories:', error);
      }
    });
  }

  onReadConseil(conseil: Conseils): void {
    console.log('Lire conseil:', conseil.title);
    // Logique pour lire le conseil - pourrait utiliser getConseilById
    this.publicService.getConseilById(conseil.id).subscribe({
      next: (conseilDetail) => {
        console.log('Détails du conseil:', conseilDetail);
        // Navigation vers page détail du conseil
      },
      error: (error) => {
        console.error('Erreur lors du chargement du conseil:', error);
      }
    });
  }

  onViewAllConseils(): void {
    console.log('Voir tous les conseils');
    this.filteredConseils = [...this.conseils];
  }

  onCategoryClick(category: ConseilsCategory): void {
    console.log('Catégorie sélectionnée:', category.name);
    // Filtrage des conseils par catégorie
    this.publicService.getConseilsByCategory(category.name).subscribe({
      next: (conseils) => {
        this.filteredConseils = conseils;
      },
      error: (error) => {
        console.error('Erreur lors du filtrage par catégorie:', error);
      }
    });
  }

  onBookAppointment(): void {
    console.log('Prendre rendez-vous coaching');
    // Logique pour prise de rendez-vous
  }

  onSubscribeNewsletter(): void {
    if (this.newsletterForm.valid) {
      const email = this.newsletterForm.value.email;
      console.log('Inscription newsletter:', email);
      // Logique d'inscription à la newsletter
      // this.publicService.subscribeToNewsletter(email).subscribe(...);
      this.newsletterForm.reset();
      
      // Réinitialiser les filtres après l'inscription
      this.filteredConseils = [...this.conseils];
    }
  }

  /**
   * Recherche de conseils par terme
   */
  onSearch(event: Event): void {
    const searchTerm = (event.target as HTMLInputElement).value.toLowerCase();
    
    if (!searchTerm) {
      this.filteredConseils = [...this.conseils];
      return;
    }

    this.filteredConseils = this.conseils.filter(conseil =>
      conseil.title.toLowerCase().includes(searchTerm) ||
      conseil.excerpt.toLowerCase().includes(searchTerm) ||
      conseil.category.toLowerCase().includes(searchTerm) ||
      conseil.author.toLowerCase().includes(searchTerm)
    );
  }

  /**
   * Retourne la classe de badge selon la catégorie
   */
  getCategoryBadgeClass(category: string): string {
    const categoryClasses: { [key: string]: string } = {
      'Entretien': 'bg-primary bg-opacity-10 text-primary',
      'Compétences': 'bg-info bg-opacity-10 text-info',
      'Carrière': 'bg-success bg-opacity-10 text-success',
      'Réseautage': 'bg-warning bg-opacity-10 text-warning',
      'Formation': 'bg-purple bg-opacity-10 text-purple'
    };
    
    return categoryClasses[category] || 'bg-secondary bg-opacity-10 text-dark';
  }

  /**
   * Formate la date pour l'affichage
   */
  formatDate(dateString: string): string {
    return new Date(dateString).toLocaleDateString('fr-FR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  }
}