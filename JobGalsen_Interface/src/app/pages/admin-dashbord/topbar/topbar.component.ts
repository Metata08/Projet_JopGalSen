import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Notification {
  title: string;
  description: string;
  time: string;
}

interface Message {
  sender: string;
  preview: string;
  time: string;
  avatar: string;
}

@Component({
  selector: 'app-topbar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.css']
})
export class TopbarComponent {
  notifications: Notification[] = [
    { title: 'Nouvelle candidature', description: 'Jean Dupont a postulé pour Développeur Full Stack', time: 'Il y a 5 minutes' },
    { title: 'Nouvelle entreprise', description: "Tech Solutions s'est inscrite", time: 'Il y a 1 heure' },
    { title: 'Offre expirée', description: "L'offre \"Designer UI/UX\" a expiré", time: 'Il y a 2 heures' }
  ];

  messages: Message[] = [
    { sender: 'Fatou Diallo', preview: "Bonjour, j'ai une question concernant mon profil...", time: 'Il y a 10 min', avatar: 'FD' },
    { sender: 'Mamadou Seck', preview: 'Merci pour votre aide avec la publication...', time: 'Il y a 1 heure', avatar: 'MS' }
  ];
}
