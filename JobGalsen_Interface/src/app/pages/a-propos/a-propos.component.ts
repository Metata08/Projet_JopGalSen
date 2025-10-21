import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavigationComponent } from '../../ui/navigation/navigation.component';
import { FooterComponent } from '../../ui/footer/footer.component';

// Import des modèles et service
import { TeamMember, CompanyValue } from '../../models/a-propos.model';
import { PublicService } from '../../services/public.service';

@Component({
  selector: 'app-a-propos',
  standalone: true,
  imports: [CommonModule, NavigationComponent, FooterComponent],
  templateUrl: './a-propos.component.html',
  styleUrls: ['./a-propos.component.css']
})
export class AProposComponent implements OnInit {
  
  teamMembers: TeamMember[] = [];
  values: CompanyValue[] = [];
  isLoading: boolean = false;

  // Remplacement des icônes Lucide React par des emojis ou classes Bootstrap
  contactIcons = {
    mail: "📧",
    phone: "📞",
    mapPin: "📍"
  };

  constructor(private publicService: PublicService) { }

  ngOnInit(): void {
    this.loadTeamMembers();
    this.loadCompanyValues();
  }

  /**
   * Charge les membres de l'équipe depuis le service
   */
  private loadTeamMembers(): void {
    this.isLoading = true;
    this.publicService.getTeamMembers().subscribe({
      next: (members) => {
        this.teamMembers = members;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Erreur lors du chargement des membres:', error);
        this.isLoading = false;
      }
    });
  }

  /**
   * Charge les valeurs de l'entreprise depuis le service
   */
  private loadCompanyValues(): void {
    this.publicService.getCompanyValues().subscribe({
      next: (values) => {
        this.values = values;
      },
      error: (error) => {
        console.error('Erreur lors du chargement des valeurs:', error);
      }
    });
  }

  onJoinUs(): void {
    console.log("Rejoignez-nous cliqué");
    // Logique pour rejoindre l'équipe
  }

  /**
   * Statistiques fixes - pourraient aussi venir du service si besoin
   */
  getStats() {
    return [
      { value: '10,000+', label: 'Candidats inscrits' },
      { value: '500+', label: 'Entreprises partenaires' },
      { value: '2,500+', label: 'Emplois pourvus' },
      { value: '95%', label: 'Taux de satisfaction' }
    ];
  }

  /**
   * Retourne la classe de badge selon le rôle
   */
  getRoleBadgeClass(role: string): string {
    const roleClasses: { [key: string]: string } = {
      'Developpeur Front-End': 'bg-primary bg-opacity-10 text-primary',
      'Developpeuse Back-End': 'bg-info bg-opacity-10 text-info',
      'Developpeur Back-End': 'bg-success bg-opacity-10 text-success'
    };
    
    return roleClasses[role] || 'bg-secondary bg-opacity-10 text-dark';
  }
}