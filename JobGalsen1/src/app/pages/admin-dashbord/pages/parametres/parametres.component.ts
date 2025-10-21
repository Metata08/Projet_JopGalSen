import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-parametres',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './parametres.component.html',
  styleUrls: ['./parametres.component.css']
})
export class AdminParametresComponent {
  activeTab = 'general';

  // General Settings
  platformName = 'JopGalSen';
  contactEmail = 'contact@jopgalsen.sn';
  supportEmail = 'support@jopgalsen.sn';
  platformDescription = "Plateforme d'emploi pour la jeunesse sénégalaise";

  // Moderation Settings
  autoApproval = true;
  verifyCompanies = true;
  moderateComments = false;
  expiryDays = 30;

  // Notification Settings
  emailNotifications = true;
  notifyApplications = true;
  notifyRegistrations = true;
  notifyJobs = false;

  // Security Settings
  require2FA = true;
  sessionExpiry = true;
  sessionDuration = 120;
  minPasswordLength = 8;

  setActiveTab(tab: string): void {
    this.activeTab = tab;
  }

  saveSettings(): void {
    console.log('Saving settings...');
  }
}
