import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AdminService, User } from '../../services/admin-service.service';

@Component({
  selector: 'app-utilisateurs',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './utilisateurs.component.html',
  styleUrls: ['./utilisateurs.component.css']
})
export class AdminUtilisateursComponent implements OnInit {

  searchTerm = '';
  users: User[] = [];

  constructor(private adminService: AdminService) {}

  ngOnInit(): void {
    // Chargement initial des utilisateurs
    this.loadUsers();
  }

  // Chargement des utilisateurs depuis le service
  loadUsers(): void {
    this.adminService.getUsers().subscribe({
      next: (data) => this.users = data,
      error: (err) => console.error('Erreur lors du chargement des utilisateurs', err)
    });
  }

  // Suppression d’un utilisateur
  deleteUser(id: number): void {
    const confirmDelete = confirm('Voulez-vous vraiment supprimer cet utilisateur ?');
    if (confirmDelete) {
      this.adminService.deleteUser(id).subscribe({
        next: () => {
          this.users = this.users.filter(u => u.id !== id);
        },
        error: (err) => console.error('Erreur lors de la suppression', err)
      });
    }
  }

  // Filtres de recherche dynamiques
  get filteredUsers(): User[] {
    return this.users.filter(user =>
      user.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  // Statistiques dynamiques
  get totalUsers(): number { return this.users.length; }
  get candidats(): number { return this.users.filter(u => u.role === 'Candidat').length; }
  get recruteurs(): number { return this.users.filter(u => u.role === 'Recruteur').length; }
  get activeUsers(): number { return this.users.filter(u => u.status === 'active').length; }

  getInitials(name: string): string {
    return name.split(' ').map(word => word[0]).join('').toUpperCase();
  }
}
