import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RecruteurHeaderComponent } from '../../ui/recruteur-header/recruteur-header.component';
import { RecruteurService } from './service/recruteur.service';
import { Job, Candidate, Stats } from '../../models/job.model';


@Component({
  selector: 'app-recruteur-dashbord',
  imports: [ CommonModule, FormsModule, ReactiveFormsModule, RecruteurHeaderComponent ],
  templateUrl: './recruteur-dashbord.component.html',
  styleUrl: './recruteur-dashbord.component.css'
})
export class RecruteurDashbordComponent implements OnInit {
  activeTab: string = 'jobs';
  jobs: Job[] = [];
  candidates: Candidate[] = [];
  stats: Stats | null = null;
  loading = true;

  constructor(
    private router: Router,
    private recruteurService: RecruteurService
  ) {}

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {
    this.loading = true;
    this.recruteurService.getJobs().subscribe(jobs => {
      this.jobs = jobs;
      this.checkLoadingComplete();
    });

    this.recruteurService.getCandidates().subscribe(candidates => {
      this.candidates = candidates;
      this.checkLoadingComplete();
    });

    this.recruteurService.getStats().subscribe(stats => {
      this.stats = stats;
      this.checkLoadingComplete();
    });
  }

  checkLoadingComplete(): void {
    if (this.jobs.length > 0 && this.candidates.length > 0 && this.stats) {
      this.loading = false;
    }
  }

  setActiveTab(tab: string): void {
    this.activeTab = tab;
  }

  navigateToCreateJob(): void {
    this.router.navigate(['/create-emploi']);
  }

  viewJobDetails(jobId: number): void {
    this.router.navigate(['/emploi', jobId]);
  }

  viewCandidateProfile(candidateId: string): void {
    this.router.navigate(['/candidat', candidateId]);
  }

  getStatusClass(status: string): string {
    const statusClasses: Record<string, string> = {
      active: 'badge bg-success',
      draft: 'badge bg-warning',
      closed: 'badge bg-secondary',
      pending: 'badge bg-warning',
      reviewed: 'badge bg-info',
      accepted: 'badge bg-success',
      rejected: 'badge bg-danger'
    };
    return statusClasses[status] || 'badge bg-secondary';
  }

  getStatusText(status: string): string {
    const statusTexts: Record<string, string> = {
      active: 'Active',
      draft: 'Brouillon',
      closed: 'Fermée',
      pending: 'En attente',
      reviewed: 'Examiné',
      accepted: 'Accepté',
      rejected: 'Refusé'
    };
    return statusTexts[status] || status;
  }
}