import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { Job, Application, Stats, Interview } from './models/job.model';

@Injectable({
  providedIn: 'root'
})
export class CandidatService {
  private apiUrl = `apiUrl/candidates`;
  private currentUserId: string;

  constructor(private http: HttpClient) {
    this.currentUserId = this.getCurrentUserId();
  }

  // Récupère les données du candidat connecté
  getMyData(): Observable<{
    stats: Stats,
    applications: Application[],
    recommendedJobs: Job[],
    upcomingInterviews: Interview[]
  }> {
    return this.http.get<any>(`${this.apiUrl}/me`, this.getAuthHeaders()).pipe(
      map(response => response.data),
      catchError(this.handleError)
    );
  }

  // Postuler à une offre
  applyToJob(jobId: string, cvFile?: File): Observable<Application> {
    const formData = new FormData();
    formData.append('jobId', jobId);
    if (cvFile) formData.append('cv', cvFile);

    return this.http.post<{data: Application}>(
      `${this.apiUrl}/me/applications`,
      formData,
      this.getAuthHeaders()
    ).pipe(
      map(response => response.data),
      catchError(this.handleError)
    );
  }

  // Mettre à jour le CV
  uploadCV(file: File): Observable<any> {
    const formData = new FormData();
    formData.append('cv', file);

    return this.http.put(
      `${this.apiUrl}/me/cv`,
      formData,
      this.getAuthHeaders()
    ).pipe(
      catchError(this.handleError)
    );
  }

  // Sauvegarder une offre
  saveJob(jobId: string): Observable<any> {
    return this.http.post(
      `${this.apiUrl}/me/saved-jobs`,
      { jobId },
      this.getAuthHeaders()
    ).pipe(
      catchError(this.handleError)
    );
  }

  private getAuthHeaders() {
    const token = localStorage.getItem('authToken');
    return {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${token}`,
        'X-User-ID': this.currentUserId
      })
    };
  }

  private getCurrentUserId(): string {
    const user = JSON.parse(localStorage.getItem('currentUser') || '{}');
    return user.id || '';
  }

  private handleError(error: any): Observable<never> {
    let errorMessage = 'Une erreur est survenue';
    if (error.status === 403) {
      errorMessage = 'Accès non autorisé à ces données';
    } else if (error.error?.message) {
      errorMessage = error.error.message;
    }
    console.error('API Error:', error);
    return throwError(() => new Error(errorMessage));
  }
}