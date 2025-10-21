import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

interface Stat {
  title: string;
  value: string;
  icon: string;
  trend: string;
  trendUp: boolean;
  color: string;
}

interface Activity {
  id: number;
  icon: string;
  title: string;
  description: string;
  time: string;
  color: string;
  bgColor: string;
}

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  stats: Stat[] = [
    { title: 'Total Utilisateurs', value: '2,847', icon: 'bi-people', trend: '+12.5%', trendUp: true, color: 'primary' },
    { title: 'Offres Actives', value: '185', icon: 'bi-briefcase', trend: '+5.2%', trendUp: true, color: 'success' },
    { title: 'Candidatures', value: '1,249', icon: 'bi-file-text', trend: '+23.1%', trendUp: true, color: 'info' },
    { title: 'Taux de Placement', value: '68%', icon: 'bi-graph-up', trend: '+8.3%', trendUp: true, color: 'warning' }
  ];

  activities: Activity[] = [
    { id: 1, icon: 'bi-person-plus', title: 'Nouvel utilisateur inscrit', description: "Fatou Diallo s'est inscrite en tant que candidate", time: 'Il y a 5 minutes', color: 'text-primary', bgColor: 'bg-primary-subtle' },
    { id: 2, icon: 'bi-briefcase', title: 'Nouvelle offre publiée', description: 'Développeur Full Stack chez Tech Solutions', time: 'Il y a 15 minutes', color: 'text-success', bgColor: 'bg-success-subtle' },
    { id: 3, icon: 'bi-building', title: 'Nouvelle entreprise', description: 'Creative Agency a rejoint la plateforme', time: 'Il y a 1 heure', color: 'text-info', bgColor: 'bg-info-subtle' },
    { id: 4, icon: 'bi-file-earmark-text', title: 'Candidature reçue', description: 'Mamadou Seck a postulé pour Designer UI/UX', time: 'Il y a 2 heures', color: 'text-warning', bgColor: 'bg-warning-subtle' }
  ];

  ngOnInit() {
    this.initUserGrowthChart();
    this.initJobsSectorChart();
    this.initApplicationTrendChart();
  }

  initUserGrowthChart() {
    const ctx = document.getElementById('userGrowthChart') as HTMLCanvasElement;
    new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Jun'],
        datasets: [{
          label: 'Nouveaux utilisateurs',
          data: [120, 190, 180, 250, 280, 320],
          backgroundColor: 'rgba(13, 110, 253, 0.8)'
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false
      }
    });
  }

  initJobsSectorChart() {
    const ctx = document.getElementById('jobsSectorChart') as HTMLCanvasElement;
    new Chart(ctx, {
      type: 'pie',
      data: {
        labels: ['Technologie', 'Finance', 'Marketing', 'Design', 'Gestion'],
        datasets: [{
          data: [35, 25, 20, 12, 8],
          backgroundColor: ['#0d6efd', '#198754', '#ffc107', '#dc3545', '#6f42c1']
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false
      }
    });
  }

  initApplicationTrendChart() {
    const ctx = document.getElementById('applicationTrendChart') as HTMLCanvasElement;
    new Chart(ctx, {
      type: 'line',
      data: {
        labels: ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'],
        datasets: [{
          label: 'Candidatures',
          data: [65, 75, 85, 80, 95, 70, 88],
          borderColor: '#0d6efd',
          backgroundColor: 'rgba(13, 110, 253, 0.1)',
          fill: true,
          tension: 0.4
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false
      }
    });
  }
}
