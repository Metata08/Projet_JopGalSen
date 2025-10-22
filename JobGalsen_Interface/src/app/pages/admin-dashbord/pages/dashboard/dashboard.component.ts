import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Chart, registerables } from 'chart.js';
import { AdminService, Stats } from '../../services/admin-service.service';
import { Subscription } from 'rxjs';

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
  stats: Stat[] = [];
  activities: Activity[] = [
    { id: 1, icon: 'bi-person-plus', title: 'Nouvel utilisateur inscrit', description: "Fatou Diallo s'est inscrite en tant que candidate", time: 'Il y a 5 minutes', color: 'text-primary', bgColor: 'bg-primary-subtle' },
    { id: 2, icon: 'bi-briefcase', title: 'Nouvelle offre publiée', description: 'Développeur Full Stack chez Tech Solutions', time: 'Il y a 15 minutes', color: 'text-success', bgColor: 'bg-success-subtle' },
    { id: 3, icon: 'bi-building', title: 'Nouvelle entreprise', description: 'Creative Agency a rejoint la plateforme', time: 'Il y a 1 heure', color: 'text-info', bgColor: 'bg-info-subtle' },
    { id: 4, icon: 'bi-file-earmark-text', title: 'Candidature reçue', description: 'Mamadou Seck a postulé pour Designer UI/UX', time: 'Il y a 2 heures', color: 'text-warning', bgColor: 'bg-warning-subtle' }
  ];

  private charts: { [key: string]: Chart } = {};
  private subscription = new Subscription();

  constructor(private adminService: AdminService) {}

  ngOnInit() {
    this.loadStats();
    this.loadChartData();
  }

  loadStats() {
    // Exemple : construire stats dynamiquement d'après Stats du service
    this.subscription.add(
      this.adminService.getStats().subscribe((stats: Stats) => {
        this.stats = [
          { title: 'Total Utilisateurs', value: stats.totalUsers.toLocaleString(), icon: 'bi-people', trend: '+12.5%', trendUp: true, color: 'primary' },
          { title: 'Offres Actives', value: stats.activeJobs.toString(), icon: 'bi-briefcase', trend: '+5.2%', trendUp: true, color: 'success' },
          { title: 'Candidatures', value: stats.applications.toLocaleString(), icon: 'bi-file-text', trend: '+23.1%', trendUp: true, color: 'info' },
          { title: 'Taux de Placement', value: stats.placementRate + '%', icon: 'bi-graph-up', trend: '+8.3%', trendUp: true, color: 'warning' }
        ];
      })
    );
  }

  loadChartData() {
    this.subscription.add(
      this.adminService.getChartData().subscribe(data => {
        this.initUserGrowthChart(data.userGrowth);
        this.initJobsSectorChart(data.jobsBySector);
        this.initApplicationTrendChart(data.applicationTrend);
      })
    );
  }

  initUserGrowthChart(userGrowth: { month: string, users: number }[]) {
    const ctx = document.getElementById('userGrowthChart') as HTMLCanvasElement;
    if (this.charts['userGrowthChart']) {
      this.charts['userGrowthChart'].destroy();
    }
    this.charts['userGrowthChart'] = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: userGrowth.map(u => u.month),
        datasets: [{
          label: 'Nouveaux utilisateurs',
          data: userGrowth.map(u => u.users),
          backgroundColor: 'rgba(13, 110, 253, 0.8)'
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false
      }
    });
  }

  initJobsSectorChart(jobsBySector: { sector: string, jobs: number }[]) {
    const ctx = document.getElementById('jobsSectorChart') as HTMLCanvasElement;
    if (this.charts['jobsSectorChart']) {
      this.charts['jobsSectorChart'].destroy();
    }
    this.charts['jobsSectorChart'] = new Chart(ctx, {
      type: 'pie',
      data: {
        labels: jobsBySector.map(js => js.sector),
        datasets: [{
          data: jobsBySector.map(js => js.jobs),
          backgroundColor: ['#0d6efd', '#198754', '#ffc107', '#dc3545', '#6f42c1', '#6c757d'] // ajouter plus de couleurs si nécessaire
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false
      }
    });
  }

  initApplicationTrendChart(applicationTrend: { date: string, applications: number }[]) {
    const ctx = document.getElementById('applicationTrendChart') as HTMLCanvasElement;
    if (this.charts['applicationTrendChart']) {
      this.charts['applicationTrendChart'].destroy();
    }
    this.charts['applicationTrendChart'] = new Chart(ctx, {
      type: 'line',
      data: {
        labels: applicationTrend.map(a => a.date),
        datasets: [{
          label: 'Candidatures',
          data: applicationTrend.map(a => a.applications),
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

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
