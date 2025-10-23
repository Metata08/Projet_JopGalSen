import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { OffreDTO, PublicService } from '../../services/public.service';

@Component({
  selector: 'app-job-listings-section',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './job-listings-section.component.html',
  styleUrls: ['./job-listings-section.component.css']
})
export class JobListingsSectionComponent implements OnInit {
  offres: OffreDTO[] = [];

  isAuthenticated = false; // À connecter avec ton système d'authentification

  constructor(private publicService: PublicService, private router: Router) {}

  ngOnInit(): void {
    this.loadOffres();
  }

  loadOffres(): void {
    this.publicService.getOffres(0, 10).subscribe(data => {
      this.offres = data;
    });
  }

  handleApply(id: number): void {
    if (this.isAuthenticated) {
      console.log(`Candidature pour l'offre ${id}`);
      // Ajoute ta logique de candidature ici
    } else {
      this.router.navigate(['/auth']);
    }
  }

  handleViewDetails(id: number): void {
    this.router.navigate(['/offres', id]);
  }

  navigateToJobs(): void {
    this.router.navigate(['/offres']);
  }
}
