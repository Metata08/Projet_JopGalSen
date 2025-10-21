import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

interface NavItem {
  name: string;
  path: string;
  icon: string;
}

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {
  @Input() isOpen = true;
  @Output() toggleSidebar = new EventEmitter<void>();

  navItems: NavItem[] = [
    { name: 'Tableau de bord', path: '/admin/dashboard', icon: 'bi-speedometer2' },
    { name: 'Offres', path: '/admin/offres', icon: 'bi-briefcase' },
    { name: 'Entreprises', path: '/admin/entreprises', icon: 'bi-building' },
    { name: 'Utilisateurs', path: '/admin/utilisateurs', icon: 'bi-people' },
    { name: 'Candidatures', path: '/admin/candidatures', icon: 'bi-file-text' },
    { name: 'Messages', path: '/admin/messages', icon: 'bi-chat-square-text' },
    { name: 'Paramètres', path: '/admin/parametres', icon: 'bi-gear' }
  ];

  onToggle() {
    this.toggleSidebar.emit();
  }
}
