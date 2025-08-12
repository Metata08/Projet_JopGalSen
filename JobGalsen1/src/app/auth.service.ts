import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap, catchError, throwError } from 'rxjs';
import { Router } from '@angular/router';

type UserRole = 'admin' | 'recruteur' | 'candidat' | '';

interface User {
  id: string;
  email: string;
  name?: string;
  role?: UserRole;
}

interface AuthResponse {
  token: string;
  user: User;
}

interface LoginData {
  email: string;
  password: string;
  rememberMe: boolean;
}

interface RegisterData {
  email: string;
  password: string;
  name?: string;
  role?: UserRole;
  // Add other registration fields as needed
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private apiUrl = 'https://api.com/api/auth';
  private currentUserSubject = new BehaviorSubject<User | null>(null);

  constructor(private http: HttpClient, private router: Router) {
    this.loadUserFromStorage();
  }

  /**Récuperer l'utilisateur courant */
  getUserRole(): UserRole {
    const user = JSON.parse(localStorage.getItem('current_user') || sessionStorage.getItem('current_user') || '{}');
    return user.role || '';
  }
  
  /**
   * Redirect user to their default route based on role
   */
  redirectToDefaultRoute(): void {
    const role = this.getUserRole();
    const routes: Record<UserRole, string> = {
      'admin': '/admin-dashboard',
      'recruteur': '/recruteur-dashboard',
      'candidat': '/candidat-dashboard',
      '': '/auth'
    };
    this.router.navigate([routes[role]]);
  }

 
  login(email: string, password: string, rememberMe: boolean): Observable<AuthResponse> {
    const loginData: LoginData = { email, password, rememberMe };
    
    return this.http.post<AuthResponse>(`${this.apiUrl}/login`, loginData).pipe(
      tap(response => {
        this.storeAuthData(response.token, response.user, rememberMe);
        this.redirectToDefaultRoute();
      }),
      catchError(error => {
        this.clearAuthData();
        return throwError(() => error);
      })
    );
  }

  
  register(userData: RegisterData): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/register`, userData).pipe(
      tap(response => {
        this.storeAuthData(response.token, response.user, false);
        this.redirectToDefaultRoute();
      }),
      catchError(error => {
        this.clearAuthData();
        return throwError(() => error);
      })
    );
  }

  /**
   * Logout current user
   */
  logout(): void {
    this.clearAuthData();
    this.router.navigate(['/auth']);
  }

  get currentUser$(): Observable<User | null> {
    return this.currentUserSubject.asObservable();
  }

  get currentUserValue(): User | null {
    return this.currentUserSubject.value;
  }

  get token(): string | null {
    return localStorage.getItem('auth_token') || sessionStorage.getItem('auth_token');
  }

  
  isAuthenticated(): boolean {
    return !!this.token;
  }

  
  private storeAuthData(token: string, user: User, remember: boolean): void {
    const storage = remember ? localStorage : sessionStorage;
    storage.setItem('auth_token', token);
    storage.setItem('current_user', JSON.stringify(user));
    this.currentUserSubject.next(user);
  }

  
  private clearAuthData(): void {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('current_user');
    sessionStorage.removeItem('auth_token');
    sessionStorage.removeItem('current_user');
    this.currentUserSubject.next(null);
  }

  /**
   * Load user data from storage
   */
  private loadUserFromStorage(): void {
    const userJson = localStorage.getItem('current_user') || sessionStorage.getItem('current_user');
    if (userJson) {
      try {
        const user = JSON.parse(userJson);
        this.currentUserSubject.next(user);
      } catch (e) {
        console.error('Failed to parse user data', e);
        this.clearAuthData();
      }
    }
  }
}