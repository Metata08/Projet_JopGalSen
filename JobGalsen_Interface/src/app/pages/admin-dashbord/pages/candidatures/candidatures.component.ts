import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Application {
  id: number;
  candidate: string;
  job: string;
  company: string;
  status: 'pending' | 'reviewed' | 'accepted' | 'rejected';
  date: string;
}

@Component({
  selector: 'app-candidatures',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './candidatures.component.html',
  styleUrls: ['./candidatures.component.css']
})
export class AdminCandidaturesComponent {
  searchTerm = '';
  
  mockApplications: Application[] = [
    { id: 1, candidate: 'Fatou Diallo', job: 'Développeur Full Stack', company: 'Tech Solutions', status: 'pending', date: '2024-01-15' },
    { id: 2, candidate: 'Mamadou Seck', job: 'Designer UI/UX', company: 'Creative Agency', status: 'reviewed', date: '2024-01-14' },
    { id: 3, candidate: 'Aissatou Fall', job: 'Chef de Projet', company: 'Business Corp', status: 'accepted', date: '2024-01-13' },
    { id: 4, candidate: 'Ousmane Ba', job: 'Analyste Financier', company: 'Finance Group', status: 'rejected', date: '2024-01-12' },
    { id: 5, candidate: 'Khadija Ndiaye', job: 'Responsable Marketing', company: 'Marketing Pro', status: 'pending', date: '2024-01-11' }
  ];

  get filteredApplications(): Application[] {
    return this.mockApplications.filter(app =>
      app.candidate.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      app.job.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  get totalApplications(): number { return this.mockApplications.length; }
  get pendingApplications(): number { return this.mockApplications.filter(a => a.status === 'pending').length; }
  get acceptedApplications(): number { return this.mockApplications.filter(a => a.status === 'accepted').length; }
  get rejectedApplications(): number { return this.mockApplications.filter(a => a.status === 'rejected').length; }

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
