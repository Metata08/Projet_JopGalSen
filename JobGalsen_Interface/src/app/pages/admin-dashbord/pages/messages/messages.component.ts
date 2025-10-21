import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Message {
  id: number;
  sender: string;
  preview: string;
  time: string;
  unread: boolean;
}

@Component({
  selector: 'app-messages',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class AdminMessagesComponent {
  searchTerm = '';
  messageText = '';
  selectedMessage: Message | null = null;

  mockMessages: Message[] = [
    { id: 1, sender: 'Fatou Diallo', preview: "Bonjour, j'ai une question concernant...", time: '10:30', unread: true },
    { id: 2, sender: 'Mamadou Seck', preview: 'Merci pour votre aide avec la publication...', time: '09:15', unread: false },
    { id: 3, sender: 'Aissatou Fall', preview: 'Je voudrais modifier mon profil...', time: 'Hier', unread: true },
    { id: 4, sender: 'Ousmane Ba', preview: "Concernant l'offre que j'ai publiée...", time: 'Hier', unread: false },
    { id: 5, sender: 'Khadija Ndiaye', preview: 'Pouvez-vous m\'aider avec...', time: '2 jours', unread: false }
  ];

  get unreadCount(): number {
    return this.mockMessages.filter(m => m.unread).length;
  }

  get activeConversations(): number {
    return 3;
  }

  getInitials(name: string): string {
    return name.split(' ').map(word => word[0]).join('').toUpperCase();
  }

  selectMessage(message: Message): void {
    this.selectedMessage = message;
    message.unread = false;
  }

  sendMessage(): void {
    if (this.messageText.trim()) {
      console.log('Sending message:', this.messageText);
      this.messageText = '';
    }
  }
}
