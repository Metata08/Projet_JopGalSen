import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface User {
  id: number;
  name: string;
  email: string;
  role: 'Candidat' | 'Recruteur';
  status: 'active' | 'inactive';
  joinDate: string;
}

@Component({
  selector: 'app-utilisateurs',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './utilisateurs.component.html',
  styleUrls: ['./utilisateurs.component.css']
})
export class AdminUtilisateursComponent {
  searchTerm = '';
  
  mockUsers: User[] = [
    { id: 1, name: 'Fatou Diallo', email: 'fatou@email.com', role: 'Candidat', status: 'active', joinDate: '2024-01-15' },
    { id: 2, name: 'Mamadou Seck', email: 'mamadou@company.sn', role: 'Recruteur', status: 'active', joinDate: '2024-01-14' },
    { id: 3, name: 'Aissatou Fall', email: 'aissatou@email.com', role: 'Candidat', status: 'inactive', joinDate: '2024-01-12' },
    { id: 4, name: 'Ousmane Ba', email: 'ousmane@startup.sn', role: 'Recruteur', status: 'active', joinDate: '2024-01-10' },
    { id: 5, name: 'Khadija Ndiaye', email: 'khadija@email.com', role: 'Candidat', status: 'active', joinDate: '2024-01-08' }
  ];

  get filteredUsers(): User[] {
    return this.mockUsers.filter(user =>
      user.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  get totalUsers(): number { return this.mockUsers.length; }
  get candidats(): number { return this.mockUsers.filter(u => u.role === 'Candidat').length; }
  get recruteurs(): number { return this.mockUsers.filter(u => u.role === 'Recruteur').length; }
  get activeUsers(): number { return this.mockUsers.filter(u => u.status === 'active').length; }

  getInitials(name: string): string {
    return name.split(' ').map(word => word[0]).join('').toUpperCase();
  }
}
