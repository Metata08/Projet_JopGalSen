import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface Activity {
  id: number;
  user: string;
  action: string;
  target: string;
  time: string;
  type: 'user' | 'job' | 'application' | 'company';
}

@Component({
  selector: 'app-recent-activity',
  standalone : true,
  imports : [CommonModule],
  templateUrl: './recent-activity.component.html',
  styleUrls: ['./recent-activity.component.css']
})
export class RecentActivityComponent {
  activities: Activity[] = [
    {
      id: 1,
      user: "Fatou Diallo",
      action: "a postulé à",
      target: "Développeur Full Stack",
      time: "Il y a 5 min",
      type: "application"
    },
    {
      id: 2,
      user: "Tech Solutions",
      action: "a publié une nouvelle offre",
      target: "Designer UI/UX",
      time: "Il y a 15 min",
      type: "job"
    },
    {
      id: 3,
      user: "Mamadou Seck",
      action: "s'est inscrit en tant que",
      target: "Recruteur",
      time: "Il y a 1 heure",
      type: "user"
    },
    {
      id: 4,
      user: "Creative Agency",
      action: "a été vérifiée",
      target: "Entreprise",
      time: "Il y a 2 heures",
      type: "company"
    },
    {
      id: 5,
      user: "Aissatou Fall",
      action: "a été acceptée pour",
      target: "Chef de Projet",
      time: "Il y a 3 heures",
      type: "application"
    }
  ];

  getActivityIcon(type: string): string {
    switch (type) {
      case 'user':
        return 'bi-person-plus';
      case 'job':
        return 'bi-briefcase';
      case 'application':
        return 'bi-file-text';
      case 'company':
        return 'bi-building';
      default:
        return 'bi-activity';
    }
  }

  getActivityColor(type: string): string {
    switch (type) {
      case 'user':
        return 'text-primary';
      case 'job':
        return 'text-success';
      case 'application':
        return 'text-info';
      case 'company':
        return 'text-warning';
      default:
        return 'text-secondary';
    }
  }
}