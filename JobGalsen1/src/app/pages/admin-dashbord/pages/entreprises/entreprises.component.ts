import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Company {
  id: number;
  name: string;
  sector: string;
  size: string;
  status: 'verified' | 'pending';
  jobs: number;
}

@Component({
  selector: 'app-entreprises',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './entreprises.component.html',
  styleUrls: ['./entreprises.component.css']
})
export class AdminEntreprisesComponent {
  searchTerm = '';
  
  mockCompanies: Company[] = [
    { id: 1, name: 'Tech Solutions', sector: 'Technologie', size: '50-100', status: 'verified', jobs: 12 },
    { id: 2, name: 'Creative Agency', sector: 'Marketing', size: '10-50', status: 'pending', jobs: 5 },
    { id: 3, name: 'Business Corp', sector: 'Finance', size: '100+', status: 'verified', jobs: 8 },
    { id: 4, name: 'Finance Group', sector: 'Finance', size: '50-100', status: 'verified', jobs: 15 },
    { id: 5, name: 'Marketing Pro', sector: 'Marketing', size: '10-50', status: 'pending', jobs: 3 }
  ];

  get filteredCompanies(): Company[] {
    return this.mockCompanies.filter(company =>
      company.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      company.sector.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  get totalCompanies(): number { return this.mockCompanies.length; }
  get verifiedCompanies(): number { return this.mockCompanies.filter(c => c.status === 'verified').length; }
  get pendingCompanies(): number { return this.mockCompanies.filter(c => c.status === 'pending').length; }
  get totalJobs(): number { return this.mockCompanies.reduce((sum, c) => sum + c.jobs, 0); }

  getInitials(name: string): string {
    return name.split(' ').map(word => word[0]).join('').toUpperCase();
  }
}
