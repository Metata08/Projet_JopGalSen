import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AdminService, Job } from '../../services/admin-service.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-offres',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './offres.component.html',
  styleUrls: ['./offres.component.css']
})
export class AdminOffresComponent implements OnInit, OnDestroy {
  searchTerm = '';
  jobs: Job[] = [];
  private subscription = new Subscription();

  constructor(private adminService: AdminService) {}

  ngOnInit() {
    this.loadJobs();
  }

  loadJobs() {
    this.subscription.add(
      this.adminService.getJobs().subscribe(jobs => {
        this.jobs = jobs;
      })
    );
  }

  get filteredJobs(): Job[] {
    return this.jobs.filter(job =>
      job.title.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      job.company.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  get totalJobs(): number {
    return this.jobs.length;
  }

  get activeJobs(): number {
    return this.jobs.filter(j => j.status === 'active').length;
  }

  get pendingJobs(): number {
    return this.jobs.filter(j => j.status === 'pending').length;
  }

  get expiredJobs(): number {
    return this.jobs.filter(j => j.status === 'expired').length;
  }

  getStatusBadge(status: string): string {
    const badges = {
      active: 'bg-success',
      pending: 'bg-warning',
      expired: 'bg-danger'
    };
    return badges[status as keyof typeof badges] || 'bg-secondary';
  }

  getStatusText(status: string): string {
    const texts = {
      active: 'Active',
      pending: 'En attente',
      expired: 'Expirée'
    };
    return texts[status as keyof typeof texts] || status;
  }

  approveJob(jobId: number) {
    this.subscription.add(
      this.adminService.approveJob(jobId).subscribe(() => {
        const job = this.jobs.find(j => j.id === jobId);
        if (job) job.status = 'active';
      })
    );
  }

  rejectJob(jobId: number) {
    this.subscription.add(
      this.adminService.rejectJob(jobId).subscribe(() => {
        const job = this.jobs.find(j => j.id === jobId);
        if (job) job.status = 'expired';
      })
    );
  }

  deleteJob(jobId: number) {
    this.subscription.add(
      this.adminService.deleteJob(jobId).subscribe(() => {
        this.jobs = this.jobs.filter(j => j.id !== jobId);
      })
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
