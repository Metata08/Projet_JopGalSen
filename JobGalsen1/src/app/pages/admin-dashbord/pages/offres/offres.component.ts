import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Job {
  id: number;
  title: string;
  company: string;
  status: 'active' | 'pending' | 'expired';
  applicants: number;
  date: string;
}

@Component({
  selector: 'app-offres',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './offres.component.html',
  styleUrls: ['./offres.component.css']
})
export class AdminOffresComponent {
  searchTerm = '';
  
  mockJobs: Job[] = [
    { id: 1, title: 'Développeur Full Stack', company: 'Tech Solutions', status: 'active', applicants: 23, date: '2024-01-15' },
    { id: 2, title: 'Designer UI/UX', company: 'Creative Agency', status: 'pending', applicants: 15, date: '2024-01-14' },
    { id: 3, title: 'Chef de Projet', company: 'Business Corp', status: 'active', applicants: 31, date: '2024-01-13' },
    { id: 4, title: 'Analyste Financier', company: 'Finance Group', status: 'expired', applicants: 8, date: '2024-01-10' },
    { id: 5, title: 'Responsable Marketing', company: 'Marketing Pro', status: 'active', applicants: 19, date: '2024-01-12' }
  ];

  get filteredJobs(): Job[] {
    return this.mockJobs.filter(job =>
      job.title.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      job.company.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  get totalJobs(): number { return this.mockJobs.length; }
  get activeJobs(): number { return this.mockJobs.filter(j => j.status === 'active').length; }
  get pendingJobs(): number { return this.mockJobs.filter(j => j.status === 'pending').length; }
  get expiredJobs(): number { return this.mockJobs.filter(j => j.status === 'expired').length; }

  getStatusBadge(status: string): string {
    const badges = {
      active: 'bg-success',
      pending: 'bg-warning',
      expired: 'bg-danger'
    };
    return badges[status as keyof typeof badges] || 'bg-secondary';
  }

  getStatusText(status: string): string {
    const texts = {
      active: 'Active',
      pending: 'En attente',
      expired: 'Expirée'
    };
    return texts[status as keyof typeof texts] || status;
  }
}
