import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Job, Candidate, Application, Stats, UserProfile } from './models/job.model';

@Injectable({
  providedIn: 'root'
})
export class RecruteurService {
  private apiUrl = 'api/recruteur';
  private currentRecruiterId = 'rec123'; // À remplacer par l'ID réel après authentification

  constructor(private http: HttpClient) { }

  // Jobs
  getJobs(): Observable<Job[]> {
    //return this.http.get<Job[]>(`${this.apiUrl}/${this.currentRecruiterId}/jobs`);
    // En mode mock:
     return of(this.mockGetJobs());
  }

  getJobById(id: string): Observable<Job> {
    return this.http.get<Job>(`${this.apiUrl}/${this.currentRecruiterId}/jobs/${id}`);
  }

  createJob(job: Omit<Job, 'id'>): Observable<Job> {
    return this.http.post<Job>(`${this.apiUrl}/${this.currentRecruiterId}/jobs`, job);
  }

  updateJob(id: string, job: Partial<Job>): Observable<Job> {
    return this.http.put<Job>(`${this.apiUrl}/${this.currentRecruiterId}/jobs/${id}`, job);
  }

  // Candidates
  getCandidates(): Observable<Candidate[]> {
    //return this.http.get<Candidate[]>(`${this.apiUrl}/${this.currentRecruiterId}/candidates`);
    // En mode mock:
    return of(this.mockGetCandidates());
  }

  getCandidateById(id: string): Observable<Candidate> {
    return this.http.get<Candidate>(`${this.apiUrl}/${this.currentRecruiterId}/candidates/${id}`);
  }

  updateCandidateStatus(id: string, status: Candidate['status']): Observable<Candidate> {
    return this.http.patch<Candidate>(
      `${this.apiUrl}/${this.currentRecruiterId}/candidates/${id}`,
      { status }
    );
  }

  // Applications
  getApplications(): Observable<Application[]> {
    //return this.http.get<Application[]>(`${this.apiUrl}/${this.currentRecruiterId}/applications`);
    // En mode mock:
    return of(this.mockGetApplications());
  }

  // Stats
  getStats(): Observable<Stats> {
    //return this.http.get<Stats>(`${this.apiUrl}/${this.currentRecruiterId}/stats`);
    // En mode mock:
    return of(this.mockGetStats());
  }

  // Profile
  getProfile(): Observable<UserProfile> {
    return this.http.get<UserProfile>(`${this.apiUrl}/${this.currentRecruiterId}/profile`);
  }

  updateProfile(profile: Partial<UserProfile>): Observable<UserProfile> {
    return this.http.put<UserProfile>(
      `${this.apiUrl}/${this.currentRecruiterId}/profile`,
      profile
    );
  }

  // Méthodes mock pour le développement
  private mockGetJobs(): Job[] {
    return [
      {
        id: 1,
        title: 'Développeur Full Stack Senior',
        company: 'Tech Solutions SARL',
        location: 'Dakar, Sénégal',
        type: 'CDI',
        category: 'Développement',
        salary: '1 500 000 - 2 000 000 XOF',
        experience: '5+ ans',
        description: 'Nous recherchons un développeur full stack expérimenté...',
        requirements: 'Master en informatique, Expérience avec Angular et Node.js...',
        benefits: 'Assurance santé, Tickets restaurant, Formation continue...',
        deadline: '2024-02-15',
        postedDate: '2024-01-10',
        urgent: true,
        recruiterId: this.currentRecruiterId,
        skills: ['JavaScript', 'Angular', 'Node.js']
      },
      {
        id: 1,
        title: 'Développeur Full Stack Senior',
        company: 'Tech Solutions SARL',
        location: 'Dakar, Sénégal',
        type: 'CDI',
        category: 'Développement',
        salary: '1 500 000 - 2 000 000 XOF',
        experience: '5+ ans',
        description: 'Nous recherchons un développeur full stack expérimenté...',
        requirements: 'Master en informatique, Expérience avec Angular et Node.js...',
        benefits: 'Assurance santé, Tickets restaurant, Formation continue...',
        deadline: '2024-02-15',
        postedDate: '2024-01-10',
        urgent: true,
        recruiterId: this.currentRecruiterId,
        skills: ['JavaScript', 'Angular', 'Node.js']
      },
      {
        id: 1,
        title: 'Développeur Full Stack Senior',
        company: 'Tech Solutions SARL',
        location: 'Dakar, Sénégal',
        type: 'CDI',
        category: 'Développement',
        salary: '1 500 000 - 2 000 000 XOF',
        experience: '5+ ans',
        description: 'Nous recherchons un développeur full stack expérimenté...',
        requirements: 'Master en informatique, Expérience avec Angular et Node.js...',
        benefits: 'Assurance santé, Tickets restaurant, Formation continue...',
        deadline: '2024-02-15',
        postedDate: '2024-01-10',
        urgent: true,
        recruiterId: this.currentRecruiterId,
        skills: ['JavaScript', 'Angular', 'Node.js']
      },
      {
        id: 1,
        title: 'Développeur Full Stack Senior',
        company: 'Tech Solutions SARL',
        location: 'Dakar, Sénégal',
        type: 'CDI',
        category: 'Développement',
        salary: '1 500 000 - 2 000 000 XOF',
        experience: '5+ ans',
        description: 'Nous recherchons un développeur full stack expérimenté...',
        requirements: 'Master en informatique, Expérience avec Angular et Node.js...',
        benefits: 'Assurance santé, Tickets restaurant, Formation continue...',
        deadline: '2024-02-15',
        postedDate: '2024-01-10',
        urgent: true,
        recruiterId: this.currentRecruiterId,
        skills: ['JavaScript', 'Angular', 'Node.js']
      },
      {
        id: 1,
        title: 'Développeur Full Stack Senior',
        company: 'Tech Solutions SARL',
        location: 'Dakar, Sénégal',
        type: 'CDI',
        category: 'Développement',
        salary: '1 500 000 - 2 000 000 XOF',
        experience: '5+ ans',
        description: 'Nous recherchons un développeur full stack expérimenté...',
        requirements: 'Master en informatique, Expérience avec Angular et Node.js...',
        benefits: 'Assurance santé, Tickets restaurant, Formation continue...',
        deadline: '2024-02-15',
        postedDate: '2024-01-10',
        urgent: true,
        recruiterId: this.currentRecruiterId,
        skills: ['JavaScript', 'Angular', 'Node.js']
      }
    ].filter(job => job.recruiterId === this.currentRecruiterId);
  }

  // Mock des données candidates
  private mockGetCandidates(): Candidate[] {
    const candidates: Candidate[] = [
      {
        id: '1',
        name: 'Aminata Diallo',
        email: 'aminata.diallo@email.com',
        position: 'Développeur Full Stack Senior',
        status: 'pending',
        score: 85,
        appliedAt: '2024-01-16',
        recruiterId: this.currentRecruiterId,
        jobId: '1',
        phone: '+221 77 123 45 67',
        //cvUrl: 'assets/cvs/aminata_diallo.pdf'
      },
      {
        id: '2',
        name: 'Moussa Sow',
        email: 'moussa.sow@email.com',
        position: 'Développeur Frontend',
        status: 'reviewed',
        score: 92,
        appliedAt: '2024-01-15',
        recruiterId: this.currentRecruiterId,
        jobId: '1',
        phone: '+221 76 234 56 78',
        //cvUrl: 'assets/cvs/moussa_sow.pdf'
      },
      {
        id: '3',
        name: 'Fatou Ndiaye',
        email: 'fatou.ndiaye@email.com',
        position: 'Développeur Backend',
        status: 'accepted',
        score: 88,
        appliedAt: '2024-01-14',
        recruiterId: this.currentRecruiterId,
        jobId: '1',
        phone: '+221 70 345 67 89',
        //cvUrl: 'assets/cvs/fatou_ndiaye.pdf'
      },
      {
        id: '4',
        name: 'Omar Diop',
        email: 'omar.diop@email.com',
        position: 'Développeur Full Stack Senior',
        status: 'rejected',
        score: 65,
        appliedAt: '2024-01-13',
        recruiterId: this.currentRecruiterId,
        jobId: '1',
        phone: '+221 77 456 78 90',
        //cvUrl: 'assets/cvs/omar_diop.pdf'
      },
      {
        id: '5',
        name: 'Aïssatou Fall',
        email: 'aissatou.fall@email.com',
        position: 'Chef de Projet Digital',
        status: 'pending',
        score: 78,
        appliedAt: '2024-01-12',
        recruiterId: this.currentRecruiterId,
        jobId: '2',
        phone: '+221 76 567 89 01',
        //cvUrl: 'assets/cvs/aissatou_fall.pdf'
      }
    ];

    return candidates.filter(c => c.recruiterId === this.currentRecruiterId);
  }

  // Mock des données d'applications
  private mockGetApplications(): Application[] {
    return [
      {
        id: '1',
        jobId: '1',
        jobTitle: 'Développeur Full Stack Senior',
        company: 'Tech Solutions SARL',
        location: 'Dakar, Sénégal',
        appliedDate: new Date('2024-01-16'),
        status: 'interview',
        interviewDate: new Date('2024-02-01'),
        notes: 'Candidat prometteur avec une solide expérience en développement full stack.'
      },
      {
        id: '2',
        jobId: '1',
        jobTitle: 'Développeur Frontend',
        company: 'Web Innovators',
        location: 'Dakar, Sénégal',
        appliedDate: new Date('2024-01-15'),
        status: 'reviewed'
      }
    ];
  }
  // Mock des statistiques
  private mockGetStats(): Stats {
    return {
      applications: 5,
      profileViews: 20,
      savedJobs: 30,
      interviews: 10,
      applicationRate: 0.25,
      interviewRate: 0.2,
      lastUpdated: new Date(),
      weeklyProgress: {
        applications: 5,
        profileViews: 20,
        interviews: 2
      }
    };
  }

}