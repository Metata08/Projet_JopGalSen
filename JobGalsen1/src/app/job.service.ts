import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, of, throwError, finalize } from 'rxjs';
import { Job, Application, Stats } from './models/job.model';

@Injectable({ providedIn: 'root' })
export class JobService {
  private apiUrl = 'https://votre-api.com/api'; // Remplacez par votre URL API

  constructor(private http: HttpClient) {}

  // Créer un nouvel emploi
  createJob(job: Job): Observable<Job> {
    return this.http.post<Job>(`${this.apiUrl}/jobs`, job).pipe(
      catchError(this.handleError<Job>('createJob'))
    );
  }

  // Récupère les emplois récents depuis l'API
  getRecentJobs(): Observable<Job[]> {
    return this.http.get<Job[]>(`${this.apiUrl}/jobs/recent`).pipe(
      catchError(this.handleError<Job[]>('getRecentJobs', []))
    );
  }

  // Récupère les candidatures de l'utilisateur depuis l'API
  getApplications(): Observable<Application[]> {
    return this.http.get<Application[]>(`${this.apiUrl}/applications`).pipe(
      catchError(this.handleError<Application[]>('getApplications', []))
    );
  }

  // Récupère les statistiques depuis l'API
  getStats(): Observable<Stats> {
    return this.http.get<Stats>(`${this.apiUrl}/stats`).pipe(
      catchError(this.handleError<Stats>('getStats', {
        applications: 0,
        profileViews: 0,
        savedJobs: 0,
        interviews: 0
      }))
    );
  }

  // Postuler à un emploi
  applyToJob(jobId: string, coverLetter?: string): Observable<Application> {
    return this.http.post<Application>(`${this.apiUrl}/applications`, {
      jobId,
      coverLetter
    }).pipe(
      catchError(this.handleError<Application>('applyToJob'))
    );
  }

  // Sauvegarder un emploi
  saveJob(jobId: string): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/jobs/saved`, { jobId }).pipe(
      catchError(this.handleError<void>('saveJob'))
    );
  }

  // Annuler une candidature
  cancelApplication(applicationId: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/applications/${applicationId}`).pipe(
      catchError(this.handleError<void>('cancelApplication'))
    );
  }

  // Uploader un CV
  uploadCV(file: File): Observable<any> {
    const formData = new FormData();
    formData.append('cv', file);
    return this.http.post(`${this.apiUrl}/upload-cv`, formData).pipe(
      catchError(this.handleError<any>('uploadCV'))
    );
  }

  // Gestion centralisée des erreurs
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(`${operation} failed: ${error.message}`);
      return throwError(() => error); // Propager l'erreur pour la gestion dans le composant
    };
  }
}