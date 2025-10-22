import { Injectable } from '@angular/core';
import { Observable, of, delay, map } from 'rxjs';

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

export interface Message {
  id: number;
  sender: string;
  subject: string;
  preview: string;
  date: string;
  unread: boolean;
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
    { id: 2, name: 'Mamadou Seck', email: 'mamadou@company.sn', role: 'Recruteur', status: 'active', joinDate: '2024-01-14' },
    { id: 3, name: 'Aissatou Ba', email: 'aissatou@email.com', role: 'Candidat', status: 'active', joinDate: '2024-01-13' },
    { id: 4, name: 'Ousmane Diop', email: 'ousmane@company.sn', role: 'Recruteur', status: 'inactive', joinDate: '2024-01-12' },
  ];

  private mockJobs: Job[] = [
    { id: 1, title: 'Développeur Full Stack', company: 'Tech Solutions', status: 'active', applicants: 23, date: '2024-01-15' },
    { id: 2, title: 'Designer UI/UX', company: 'Creative Agency', status: 'pending', applicants: 15, date: '2024-01-14' },
    { id: 3, title: 'Chef de Projet', company: 'Consulting Group', status: 'active', applicants: 18, date: '2024-01-13' },
    { id: 4, title: 'Data Scientist', company: 'AI Corp', status: 'expired', applicants: 8, date: '2024-01-10' },
  ];

  private mockCompanies: Company[] = [
    { id: 1, name: 'Tech Solutions', sector: 'Technologie', size: '50-100', status: 'verified', jobs: 12 },
    { id: 2, name: 'Creative Agency', sector: 'Marketing', size: '10-50', status: 'verified', jobs: 8 },
    { id: 3, name: 'Consulting Group', sector: 'Conseil', size: '100-500', status: 'pending', jobs: 5 },
    { id: 4, name: 'AI Corp', sector: 'Intelligence Artificielle', size: '500+', status: 'verified', jobs: 15 },
  ];

  private mockApplications: Application[] = [
    { id: 1, candidate: 'Fatou Diallo', job: 'Développeur Full Stack', company: 'Tech Solutions', status: 'pending', date: '2024-01-15' },
    { id: 2, candidate: 'Aissatou Ba', job: 'Designer UI/UX', company: 'Creative Agency', status: 'reviewed', date: '2024-01-14' },
    { id: 3, candidate: 'Ibrahima Fall', job: 'Chef de Projet', company: 'Consulting Group', status: 'accepted', date: '2024-01-13' },
    { id: 4, candidate: 'Mariama Sow', job: 'Data Scientist', company: 'AI Corp', status: 'rejected', date: '2024-01-12' },
  ];

  private mockMessages: Message[] = [
    { id: 1, sender: 'Fatou Diallo', subject: 'Question sur candidature', preview: 'Bonjour, je voudrais...', date: '2024-01-15 10:30', unread: true },
    { id: 2, sender: 'Tech Solutions', subject: 'Nouvelle offre', preview: 'Nous avons publié...', date: '2024-01-15 09:15', unread: true },
    { id: 3, sender: 'Mamadou Seck', subject: 'Demande de validation', preview: 'Pourriez-vous valider...', date: '2024-01-14 16:20', unread: false },
  ];

  constructor() { }

  // ============ USERS ============
  getUsers(): Observable<User[]> {
    return of(this.mockUsers).pipe(delay(500));
  }

  getUserById(id: number): Observable<User | undefined> {
    return of(this.mockUsers.find(u => u.id === id)).pipe(delay(500));
  }

  updateUser(id: number, data: Partial<User>): Observable<User | undefined> {
    return of(id).pipe(
      delay(500),
      map(() => {
        const user = this.mockUsers.find(u => u.id === id);
        if (user) {
          Object.assign(user, data);
          return user;
        }
        return undefined;
      })
    );
  }

  deleteUser(id: number): Observable<void> {
    return of(void 0).pipe(
      delay(500),
      map(() => {
        const index = this.mockUsers.findIndex(u => u.id === id);
        if (index > -1) {
          this.mockUsers.splice(index, 1);
        }
      })
    );
  }

  // ============ JOBS ============
  getJobs(): Observable<Job[]> {
    return of(this.mockJobs).pipe(delay(500));
  }

  getJobById(id: number): Observable<Job | undefined> {
    return of(this.mockJobs.find(j => j.id === id)).pipe(delay(500));
  }

  approveJob(id: number): Observable<void> {
    return of(void 0).pipe(
      delay(500),
      map(() => {
        const job = this.mockJobs.find(j => j.id === id);
        if (job) {
          job.status = 'active';
        }
      })
    );
  }

  rejectJob(id: number): Observable<void> {
    return of(void 0).pipe(
      delay(500),
      map(() => {
        const job = this.mockJobs.find(j => j.id === id);
        if (job) {
          job.status = 'expired';
        }
      })
    );
  }

  deleteJob(id: number): Observable<void> {
    return of(void 0).pipe(
      delay(500),
      map(() => {
        const index = this.mockJobs.findIndex(j => j.id === id);
        if (index > -1) {
          this.mockJobs.splice(index, 1);
        }
      })
    );
  }

  // ============ COMPANIES ============
  getCompanies(): Observable<Company[]> {
    return of(this.mockCompanies).pipe(delay(500));
  }

  getCompanyById(id: number): Observable<Company | undefined> {
    return of(this.mockCompanies.find(c => c.id === id)).pipe(delay(500));
  }

  deleteCompany(id: number): Observable<void> {
    return of(void 0).pipe(
      delay(500),
      map(() => {
        const index = this.mockCompanies.findIndex(c => c.id === id);
        if (index > -1) {
          this.mockCompanies.splice(index, 1);
        }
      })
    );
  }

  // ============ APPLICATIONS ============
  getApplications(): Observable<Application[]> {
    return of(this.mockApplications).pipe(delay(500));
  }

  getApplicationById(id: number): Observable<Application | undefined> {
    return of(this.mockApplications.find(a => a.id === id)).pipe(delay(500));
  }

  updateApplicationStatus(id: number, status: Application['status']): Observable<void> {
    return of(void 0).pipe(
      delay(500),
      map(() => {
        const application = this.mockApplications.find(a => a.id === id);
        if (application) {
          application.status = status;
        }
      })
    );
  }

  // ============ MESSAGES ============
  getMessages(): Observable<Message[]> {
    return of(this.mockMessages).pipe(delay(500));
  }

  getMessageById(id: number): Observable<Message | undefined> {
    return of(this.mockMessages.find(m => m.id === id)).pipe(delay(500));
  }

  markMessageAsRead(id: number): Observable<void> {
    return of(void 0).pipe(
      delay(500),
      map(() => {
        const message = this.mockMessages.find(m => m.id === id);
        if (message) {
          message.unread = false;
        }
      })
    );
  }

  // ============ STATISTICS ============
  getStats(): Observable<Stats> {
    return of({
      totalUsers: 2847,
      activeJobs: 185,
      applications: 1249,
      placementRate: 68
    }).pipe(delay(500));
  }

  getChartData() {
    return of({
      userGrowth: [
        { month: 'Jan', users: 450 },
        { month: 'Fév', users: 680 },
        { month: 'Mar', users: 920 },
        { month: 'Avr', users: 1150 },
        { month: 'Mai', users: 1580 },
        { month: 'Jun', users: 2100 },
        { month: 'Jul', users: 2847 }
      ],
      jobsBySector: [
        { sector: 'Tech', jobs: 45 },
        { sector: 'Finance', jobs: 28 },
        { sector: 'Marketing', jobs: 35 },
        { sector: 'Santé', jobs: 22 },
        { sector: 'Éducation', jobs: 18 },
        { sector: 'Autres', jobs: 37 }
      ],
      applicationTrend: [
        { date: '01 Jan', applications: 65 },
        { date: '08 Jan', applications: 89 },
        { date: '15 Jan', applications: 145 },
        { date: '22 Jan', applications: 198 },
        { date: '29 Jan', applications: 256 }
      ]
    }).pipe(delay(500));
  }
}
