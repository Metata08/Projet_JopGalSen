import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AdminService, Application } from '../../services/admin-service.service';

@Component({
  selector: 'app-candidatures',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './candidatures.component.html',
  styleUrls: ['./candidatures.component.css']
})
export class AdminCandidaturesComponent implements OnInit {

  searchTerm = '';
  applications: Application[] = [];

  constructor(private adminService: AdminService) {}

  ngOnInit(): void {
    this.loadApplications();
  }

  // Chargement des candidatures depuis le service
  loadApplications(): void {
    this.adminService.getApplications().subscribe({
      next: (data) => this.applications = data,
      error: (err) => console.error('Erreur lors du chargement des candidatures', err)
    });
  }

  // Mise à jour du statut d’une candidature
  updateStatus(id: number, status: Application['status']): void {
    this.adminService.updateApplicationStatus(id, status).subscribe({
      next: () => {
        const app = this.applications.find(a => a.id === id);
        if (app) app.status = status;
      },
      error: (err) => console.error('Erreur lors de la mise à jour du statut', err)
    });
  }

  // Filtres dynamiques
  get filteredApplications(): Application[] {
    return this.applications.filter(app =>
      app.candidate.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      app.job.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  // Statistiques dynamiques
  get totalApplications(): number { return this.applications.length; }
  get pendingApplications(): number { return this.applications.filter(a => a.status === 'pending').length; }
  get acceptedApplications(): number { return this.applications.filter(a => a.status === 'accepted').length; }
  get rejectedApplications(): number { return this.applications.filter(a => a.status === 'rejected').length; }

  getInitials(name: string): string {
    return name.split(' ').map(word => word[0]).join('').toUpperCase();
  }

  getStatusBadge(status: string): string {
    const badges = {
      pending: 'bg-warning',
      reviewed: 'bg-info',
      accepted: 'bg-success',
      rejected: 'bg-danger'
    };
    return badges[status as keyof typeof badges] || 'bg-secondary';
  }

  getStatusText(status: string): string {
    const texts = {
      pending: 'En attente',
      reviewed: 'Examinée',
      accepted: 'Acceptée',
      rejected: 'Rejetée'
    };
    return texts[status as keyof typeof texts] || status;
  }
}
