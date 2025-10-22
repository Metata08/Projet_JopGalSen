import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, switchMap, tap, catchError, throwError } from 'rxjs';
import { Router } from '@angular/router';

export type UserRole = 'admin' | 'recruteur' | 'candidat' | '';

interface User {
  id: string;
  email: string;
  name?: string;
  role?: UserRole;
}

interface LoginData {
  username: string; // ici, ce n'est plus email !
  password: string;
  rememberMe: boolean;
}

interface RegisterData {
  email: string;
  password: string;
  name?: string;
  role?: UserRole;
  // autres champs possibles
}

@Injectable({ providedIn: 'root' })
export class AuthService {

  private loginUrl = 'http://localhost:8080/api/authenticate';
  private registerUrl = 'http://localhost:8080/api/register';
  private connectedUserUrl = 'http://localhost:8080/api/account';

  private currentUserSubject = new BehaviorSubject<User | null>(null);

  constructor(private http: HttpClient, private router: Router) {
    this.loadUserFromStorage();
  }

  /** Connexion utilisateur : obtient token puis récupère utilisateur */
  login(email: string, password: string, rememberMe: boolean): Observable<User> {
    const loginData = {
      username: email,  // clé must be 'username'
      password,
      rememberMe
    };
    console.log(loginData);
    return this.http.post<{ token: string }>(this.loginUrl, loginData).pipe(
      tap(response => this.storeToken(response.token, rememberMe)),
      switchMap(() => this.getCurrentUserAccount()),
      catchError(error => {
        this.clearAuthData();
        return throwError(() => error);
      })
    );
  }


  /** Inscription utilisateur */
  register(userData: RegisterData): Observable<User> {
    return this.http.post<{ token: string }>(this.registerUrl, userData).pipe(
      tap(response => this.storeToken(response.token, false)),
      switchMap(() => this.getCurrentUserAccount()),
      catchError(error => {
        this.clearAuthData();
        return throwError(() => error);
      })
    );
  }

  /** Récupérer les infos du compte connecté avec token stocké */
  getCurrentUserAccount(): Observable<User> {
    return this.http.get<User>(this.connectedUserUrl).pipe(
      tap(user => {
        this.currentUserSubject.next(user);
        this.saveUserToStorage(user);
      }),
      catchError(error => {
        this.clearAuthData();
        return throwError(() => error);
      })
    );
  }

  /** Déconnexion */
  logout(): void {
    this.clearAuthData();
    this.router.navigate(['/auth']);
  }

  /** Observable sur l’utilisateur courant */
  get currentUser$(): Observable<User | null> {
    return this.currentUserSubject.asObservable();
  }

  /** Accès valeur actuelle de l’utilisateur */
  get currentUserValue(): User | null {
    return this.currentUserSubject.value;
  }

  /** Récupération du token */
  get token(): string | null {
    return localStorage.getItem('auth_token') || sessionStorage.getItem('auth_token');
  }

  /** Vérification d’authentification */
  isAuthenticated(): boolean {
    return !!this.token;
  }

  /** Stockage sécurisé du token */
  private storeToken(token: string, remember: boolean): void {
    const storage = remember ? localStorage : sessionStorage;
    storage.setItem('auth_token', token);
  }

  /** Sauvegarde utilisateur après /api/account */
  private saveUserToStorage(user: User): void {
    // On stocke aussi l'objet utilisateur
    if (localStorage.getItem('auth_token')) {
      localStorage.setItem('current_user', JSON.stringify(user));
    } else {
      sessionStorage.setItem('current_user', JSON.stringify(user));
    }
  }

  /** Nettoyage du token et données utilisateur */
  private clearAuthData(): void {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('current_user');
    sessionStorage.removeItem('auth_token');
    sessionStorage.removeItem('current_user');
    this.currentUserSubject.next(null);
  }

  /** Chargement utilisateur depuis stockage */
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

  /** Récupérer le rôle utilisateur */
  getUserRole(): UserRole {
    const userJson = localStorage.getItem('current_user') || sessionStorage.getItem('current_user');
    if (!userJson) return '';
    try {
      const user = JSON.parse(userJson);
      return user.role || '';
    } catch {
      return '';
    }
  }

  /** Redirection selon rôle (à appeler depuis composant) */
  redirectToDefaultRoute(): void {
    const role = this.getUserRole();
    const routes: Record<UserRole, string> = {
      'admin': '/admin',
      'recruteur': '/recruteur',
      'candidat': '/candidat',
      '': '/auth'
    };
    this.router.navigate([routes[role]]);
  }
}
