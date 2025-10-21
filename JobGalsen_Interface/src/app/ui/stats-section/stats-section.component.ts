import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-stats-section',
  imports: [CommonModule],
  standalone: true,
  templateUrl: './stats-section.component.html',
  styleUrls: ['./stats-section.component.css']
})
export class StatsSectionComponent {
  stats = [
    {
      icon: 'bi-people',
      number: "15,000+",
      label: "Candidats inscrits",
      description: "Professionnels actifs",
      color: "text-primary"
    },
    {
      icon: 'bi-briefcase',
      number: "2,500+",
      label: "Offres d'emploi",
      description: "Disponibles maintenant",
      color: "text-accent"
    },
    {
      icon: 'bi-award',
      number: "500+",
      label: "Entreprises partenaires",
      description: "Nous font confiance",
      color: "text-success"
    },
    {
      icon: 'bi-graph-up',
      number: "85%",
      label: "Taux de placement",
      description: "En moins de 30 jours",
      color: "text-warning"
    }
  ];

  locations = [
    { city: "Dakar", percentage: 45, count: "1,125 offres" },
    { city: "Thiès", percentage: 20, count: "500 offres" },
    { city: "Saint-Louis", percentage: 15, count: "375 offres" },
    { city: "Kaolack", percentage: 10, count: "250 offres" },
    { city: "Ziguinchor", percentage: 10, count: "250 offres" }
  ];

  sectors = [
    { name: "Technologie", percentage: 30, count: "750 offres", growth: "+15%" },
    { name: "Finance & Banque", percentage: 25, count: "625 offres", growth: "+12%" },
    { name: "Télécommunications", percentage: 20, count: "500 offres", growth: "+8%" },
    { name: "Énergie", percentage: 15, count: "375 offres", growth: "+10%" },
    { name: "Autres", percentage: 10, count: "250 offres", growth: "+5%" }
  ];
}