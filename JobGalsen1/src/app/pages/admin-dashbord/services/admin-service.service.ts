import { Injectable } from '@angular/core';
import { Observable, of, delay } from 'rxjs';

export interface User {
  id: number;
  name: string;
  email: string;
  role: 'Candidat' | 'Recruteur';
  status: 'active' | 'inactive';
  joinDate: string;
}

export interface Job {
  id: number;
  title: string;
  company: string;
  status: 'active' | 'pending' | 'expired';
  applicants: number;
  date: string;
}

export interface Company {
  id: number;
  name: string;
  sector: string;
  size: string;
  status: 'verified' | 'pending';
  jobs: number;
}

export interface Application {
  id: number;
  candidate: string;
  job: string;
  company: string;
  status: 'pending' | 'reviewed' | 'accepted' | 'rejected';
  date: string;
}

export interface Stats {
  totalUsers: number;
  activeJobs: number;
  applications: number;
  placementRate: number;
}

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  private mockUsers: User[] = [
    { id: 1, name: 'Fatou Diallo', email: 'fatou@email.com', role: 'Candidat', status: 'active', joinDate: '2024-01-15' },
    { id: 2, name: 'Mamadou Seck', email: 'mamadou@company.sn', role: 'Recruteur', status: 'active', joinDate: '2024-01-14' }
  ];

  private mockJobs: Job[] = [
    { id: 1, title: 'Développeur Full Stack', company: 'Tech Solutions', status: 'active', applicants: 23, date: '2024-01-15' },
    { id: 2, title: 'Designer UI/UX', company: 'Creative Agency', status: 'pending', applicants: 15, date: '2024-01-14' }
  ];

  constructor() {}

  // Users
  getUsers(): Observable<User[]> {
    return of(this.mockUsers).pipe(delay(500));
  }

  getUserById(id: number): Observable<User | undefined> {
    return of(this.mockUsers.find(u => u.id === id)).pipe(delay(500));
  }

  updateUser(id: number, data: Partial<User>): Observable<User | null> {
    const user = this.mockUsers.find(u => u.id === id);
    if (user) {
      Object.assign(user, data);
      return of(user).pipe(delay(500));
    }
    return of(null).pipe(delay(500));
  }

  deleteUser(id: number): Observable<void> {
    const index = this.mockUsers.findIndex(u => u.id === id);
    if (index > -1) {
      this.mockUsers.splice(index, 1);
    }
    return of(void 0).pipe(delay(500));
  }

  // Jobs
  getJobs(): Observable<Job[]> {
    return of(this.mockJobs).pipe(delay(500));
  }

  approveJob(id: number): Observable<void> {
    const job = this.mockJobs.find(j => j.id === id);
    if (job) {
      job.status = 'active';
    }
    return of(void 0).pipe(delay(500));
  }

  rejectJob(id: number): Observable<void> {
    const job = this.mockJobs.find(j => j.id === id);
    if (job) {
      job.status = 'expired';
    }
    return of(void 0).pipe(delay(500));
  }

  // Statistics
  getStats(): Observable<Stats> {
    return of({
      totalUsers: 2847,
      activeJobs: 185,
      applications: 1249,
      placementRate: 68
    }).pipe(delay(500));
  }
}
