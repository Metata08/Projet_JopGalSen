import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

interface Job {
  id: number;
  title: string;
  company: string;
  location: string;
  type: string;
  salary: string;
  postedDate: string;
  applicants: number;
  description: string;
  skills: string[];
}

@Component({
  selector: 'app-job-listings-section',
  imports: [CommonModule],
  standalone: true,
  templateUrl: './job-listings-section.component.html',
  styleUrls: ['./job-listings-section.component.css']
})
export class JobListingsSectionComponent {
  mockJobs: Job[] = [
    {
      id: 1,
      title: "Développeur Full Stack",
      company: "TechSen Solutions",
      location: "Dakar, Sénégal",
      type: "CDI",
      salary: "800,000 - 1,200,000 FCFA",
      postedDate: "Il y a 2 jours",
      applicants: 12,
      description: "Nous recherchons un développeur full stack expérimenté pour rejoindre notre équipe...",
      skills: ["React", "Node.js", "TypeScript", "MongoDB"]
    },
    // ... autres jobs du mock
  ];

  isAuthenticated = false; // À remplacer par la vraie logique d'authentification

  constructor(private router: Router) {}

  handleApply(jobId: number) {
    if (this.isAuthenticated) {
      console.log(`Application pour le job ${jobId}`);
      // Logique de candidature
    } else {
      this.router.navigate(['/auth']);
    }
  }

  handleViewDetails(jobId: number) {
    this.router.navigate(['/job', jobId]);
  }

  navigateToJobs() {
    this.router.navigate(['/jobs']);
  }
}