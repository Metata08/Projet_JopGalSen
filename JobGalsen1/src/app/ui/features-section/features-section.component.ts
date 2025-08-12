import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'; // Import CommonModule for ngFor

interface Feature {
  icon: string;
  title: string;
  description: string;
}

@Component({
  selector: 'app-features-section',
  templateUrl: './features-section.component.html',
  styleUrls: ['./features-section.component.css'],
  imports: [CommonModule] 
})
export class FeaturesSectionComponent {
  features: Feature[] = [
    {
      icon: 'bi-search',
      title: 'Recherche Intelligente',
      description: 'Trouvez rapidement les offres qui correspondent à votre profil'
    },
    {
      icon: 'bi-people',
      title: 'Réseau Professionnel',
      description: 'Connectez-vous avec des professionnels et des entreprises leaders'
    },
    {
      icon: 'bi-award',
      title: 'Certification Validée',
      description: 'Mettez en valeur vos compétences avec des certifications'
    },
    {
      icon: 'bi-graph-up',
      title: 'Suivi de Carrière',
      description: 'Suivez votre évolution professionnelle'
    },
    {
      icon: 'bi-shield-lock',
      title: 'Données Sécurisées',
      description: 'Vos informations personnelles sont protégées'
    },
    {
      icon: 'bi-globe2',
      title: 'Opportunités Locales',
      description: 'Accédez aux meilleures opportunités d\'emploi'
    }
  ];
}