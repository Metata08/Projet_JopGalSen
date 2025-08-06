import { Component, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-candidat-header',
  imports: [CommonModule],
  templateUrl: './candidat-header.component.html',
  styleUrl: './candidat-header.component.css'
})
export class CandidatHeaderComponent {
  @Output() menuToggled = new EventEmitter<void>();

  notificationsCount = 3;
  user = {
    name: 'Mamadou Ndiaye',
    email: 'mamadou.ndiaye@email.com',
  };

  toggleMenu() {
    this.menuToggled.emit();
  }
}