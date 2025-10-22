import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AdminService, Company } from '../../services/admin-service.service';

@Component({
  selector: 'app-entreprises',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './entreprises.component.html',
  styleUrls: ['./entreprises.component.css']
})
export class AdminEntreprisesComponent implements OnInit {

  searchTerm = '';
  companies: Company[] = [];

  constructor(private adminService: AdminService) {}

  ngOnInit(): void {
    // Récupération des entreprises à l'initialisation
    this.loadCompanies();
  }

  loadCompanies(): void {
    this.adminService.getCompanies().subscribe({
      next: (data) => this.companies = data,
      error: (err) => console.error('Erreur lors du chargement des entreprises', err)
    });
  }

  deleteCompany(id: number): void {
    const confirmDelete = confirm('Voulez-vous vraiment supprimer cette entreprise ?');
    if (confirmDelete) {
      this.adminService.deleteCompany(id).subscribe({
        next: () => {
          this.companies = this.companies.filter(c => c.id !== id);
        },
        error: (err) => console.error('Erreur lors de la suppression', err)
      });
    }
  }

  // Filtres dynamiques
  get filteredCompanies(): Company[] {
    return this.companies.filter(company =>
      company.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      company.sector.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  get totalCompanies(): number { return this.companies.length; }
  get verifiedCompanies(): number { return this.companies.filter(c => c.status === 'verified').length; }
  get pendingCompanies(): number { return this.companies.filter(c => c.status === 'pending').length; }
  get totalJobs(): number { return this.companies.reduce((sum, c) => sum + c.jobs, 0); }

  getInitials(name: string): string {
    return name.split(' ').map(word => word[0]).join('').toUpperCase();
  }
}
