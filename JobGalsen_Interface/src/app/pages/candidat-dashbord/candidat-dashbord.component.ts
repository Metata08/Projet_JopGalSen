import { Component, OnInit } from '@angular/core';
import { JobService } from '../../job.service';
import { Job, Application, Stats } from '../../models/job.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CandidatHeaderComponent } from '../../ui/candidat-header/candidat-header.component';
import { CandidatSidebarComponent } from '../../ui/candidat-sidebar/candidat-sidebar.component';
import { catchError, finalize } from 'rxjs/operators';
import { of } from 'rxjs';
import {AuthService} from '../../auth.service';

@Component({
  selector: 'app-candidat-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule, CandidatHeaderComponent, CandidatSidebarComponent],
  templateUrl: './candidat-dashbord.component.html',
  styleUrl: './candidat-dashbord.component.css'
})
export class CandidatDashbordComponent implements OnInit {
  currentUser: any;
  activeTab: 'jobs' | 'applications' = 'jobs';
  recentJobs: Job[] = [];
  applications: Application[] = [];
  stats: Stats = {
    applications: 0,
    profileViews: 0,
    savedJobs: 0,
    interviews: 0
  };
  isSidebarOpen = false;
  isLoading = false;
  errorMessage = '';

  constructor(private jobService: JobService, private authService: AuthService) {}

  ngOnInit() {
    this.loadCurrentUser();
    this.loadData();
  }

  loadCurrentUser(): void {
    this.authService.currentUser$.subscribe(user => {
      this.currentUser = user;
    });
  }

  loadData(): void {
    this.isLoading = true;
    this.errorMessage = '';

    // Charger les statistiques
    this.jobService.getStats().pipe(
      catchError(error => {
        this.errorMessage = 'Erreur lors du chargement des statistiques';
        return of(null);
      }),
      finalize(() => this.isLoading = false)
    ).subscribe(stats => {
      if (stats) this.stats = stats;
    });

    // Charger les emplois récents
    this.loadRecentJobs();
    
    // Charger les candidatures
    this.loadApplications();
  }

  loadRecentJobs(): void {
    this.isLoading = true;
    this.errorMessage = '';
    
    this.jobService.getRecentJobs().pipe(
      catchError(error => {
        this.errorMessage = 'Erreur lors du chargement des offres';
        return of([]);
      }),
      finalize(() => this.isLoading = false)
    ).subscribe(jobs => {
      this.recentJobs = jobs;
    });
  }

  loadApplications(): void {
    this.isLoading = true;
    this.errorMessage = '';
    
    this.jobService.getApplications().pipe(
      catchError(error => {
        this.errorMessage = 'Erreur lors du chargement des candidatures';
        return of([]);
      }),
      finalize(() => this.isLoading = false)
    ).subscribe(applications => {
      this.applications = applications;
    });
  }

  changeTab(tab: 'jobs' | 'applications') {
    this.activeTab = tab;
    if (tab === 'jobs' && this.recentJobs.length === 0) {
      this.loadRecentJobs();
    } else if (tab === 'applications' && this.applications.length === 0) {
      this.loadApplications();
    }
  }

  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
  }

  uploadCV(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.isLoading = true;
      this.errorMessage = '';
      
      this.jobService.uploadCV(file).pipe(
        catchError(error => {
          this.errorMessage = 'Erreur lors du téléchargement du CV';
          return of(null);
        }),
        finalize(() => this.isLoading = false)
      ).subscribe(response => {
        if (response) {
          // Mettre à jour l'interface ou afficher un message de succès
          console.log('CV téléchargé avec succès', response);
        }
      });
    }
  }

  applyToJob(jobId: string): void {
    this.isLoading = true;
    this.errorMessage = '';
    
    this.jobService.applyToJob(jobId).pipe(
      catchError(error => {
        this.errorMessage = 'Erreur lors de la candidature';
        return of(null);
      }),
      finalize(() => this.isLoading = false)
    ).subscribe(application => {
      if (application) {
        this.loadApplications(); // Rafraîchir la liste des candidatures
        this.loadData(); // Rafraîchir les stats
      }
    });
  }
}