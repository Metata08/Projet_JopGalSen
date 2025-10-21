import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface StatItem {
  icon: string;
  value: string;
  label: string;
}

@Component({
  selector: 'app-ctasection',
  imports: [CommonModule],
  templateUrl: './ctasection.component.html',
  styleUrl: './ctasection.component.css',
  standalone: true
})

export class CTASectionComponent {
  stats: StatItem[] = [
    {
      icon: 'bi-people',
      value: '15,000+',
      label: 'Candidats actifs'
    },
    {
      icon: 'bi-briefcase',
      value: '2,500+',
      label: 'Offres d\'emploi'
    },
    {
      icon: 'bi-graph-up',
      value: '85%',
      label: 'Taux de placement'
    }
  ];

  benefits = [
    'Accès gratuit à toutes les offres d\'emploi',
    'Profil professionnel optimisé',
    'Notifications en temps réel',
    'Conseils carrière personnalisés'
  ];
}