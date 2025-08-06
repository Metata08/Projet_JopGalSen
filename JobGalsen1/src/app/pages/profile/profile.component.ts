import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Experience {
  id: number;
  title: string;
  company: string;
  location: string;
  startDate: string;
  endDate: string;
  description: string;
}

interface Education {
  id: number;
  degree: string;
  school: string;
  location: string;
  year: string;
  mention: string;
}

@Component({
  selector: 'app-profile',
  imports: [CommonModule, FormsModule],
  standalone: true,
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {
  isEditing = false;
  skills = ['JavaScript', 'React', 'TypeScript', 'Node.js', 'Python'];
  newSkill = '';
  activeTab = 'about';

  experiences: Experience[] = [
    {
      id: 1,
      title: 'Développeur Frontend',
      company: 'TechSenegal',
      location: 'Dakar, Sénégal',
      startDate: 'Jan 2023',
      endDate: 'Présent',
      description: 'Développement d\'applications React avec TypeScript, intégration d\'APIs REST, optimisation des performances.'
    },
    {
      id: 2,
      title: 'Stagiaire Développeur Web',
      company: 'Digital Solutions',
      location: 'Dakar, Sénégal',
      startDate: 'Jun 2022',
      endDate: 'Dec 2022',
      description: 'Création de sites web responsifs, maintenance de systèmes existants, collaboration en équipe agile.'
    }
  ];

  education: Education[] = [
    {
      id: 1,
      degree: 'Master en Informatique',
      school: 'Université Cheikh Anta Diop',
      location: 'Dakar, Sénégal',
      year: '2022',
      mention: 'Très bien'
    },
    {
      id: 2,
      degree: 'Licence en Mathématiques-Informatique',
      school: 'Université Gaston Berger',
      location: 'Saint-Louis, Sénégal',
      year: '2020',
      mention: 'Bien'
    }
  ];

  toggleEdit() {
    this.isEditing = !this.isEditing;
  }

  addSkill() {
    if (this.newSkill && !this.skills.includes(this.newSkill)) {
      this.skills.push(this.newSkill);
      this.newSkill = '';
    }
  }

  removeSkill(skillToRemove: string) {
    this.skills = this.skills.filter(skill => skill !== skillToRemove);
  }

  onKeyPress(event: KeyboardEvent) {
    if (event.key === 'Enter') {
      event.preventDefault();
      this.addSkill();
    }
  }

  setActiveTab(tab: string) {
    this.activeTab = tab;
  }

  saveProfile() {
    // Logique de sauvegarde
    console.log('Profil sauvegardé');
  }
}
