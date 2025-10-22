import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AdminService, Message } from '../../services/admin-service.service';

@Component({
  selector: 'app-messages',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class AdminMessagesComponent implements OnInit {

  searchTerm = '';
  messageText = '';
  selectedMessage: Message | null = null;
  messages: Message[] = [];

  constructor(private adminService: AdminService) {}

  ngOnInit(): void {
    // Chargement initial des messages
    this.loadMessages();
  }

  loadMessages(): void {
    this.adminService.getMessages().subscribe({
      next: (data) => this.messages = data,
      error: (err) => console.error('Erreur lors du chargement des messages', err)
    });
  }

  selectMessage(message: Message): void {
    this.selectedMessage = message;
    if (message.unread) {
      this.adminService.markMessageAsRead(message.id).subscribe({
        next: () => message.unread = false,
        error: (err) => console.error('Erreur lors de la mise à jour du message', err)
      });
    }
  }

  getInitials(name: string): string {
    return name.split(' ').map(word => word[0]).join('').toUpperCase();
  }

  sendMessage(): void {
    if (this.messageText.trim()) {
      console.log('Message envoyé :', this.messageText);
      this.messageText = '';
    }
  }

  get unreadCount(): number {
    return this.messages.filter(m => m.unread).length;
  }

  get activeConversations(): number {
    return this.messages.length > 0 ? 3 : 0;
  }

  get filteredMessages(): Message[] {
    return this.messages.filter(m =>
      m.sender.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      m.preview.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }
}
