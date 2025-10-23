import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { tap, catchError, map } from 'rxjs/operators';
import { Router } from '@angular/router';

export type UserRole = 'admin' | 'recruteur' | 'candidat' | '';

interface User {
  id: number;
  login: string;
  firstName?: string;
  lastName?: string;
  email: string;
  activated?: boolean;
  langKey?: string;
  imageUrl?: string;
  resetDate?: string | null;
  authorities?: string[];
  role?: UserRole;
}

interface LoginResponse {
  idToken: string;
  user: User;
  role: string; // rôle reçu dans la réponse explicite
}

interface LoginData {
  username: string;
  password: string;
  rememberMe: boolean;
}

interface RegisterData {
  email: string;
  password: string;
  name?: string;
  role?: UserRole;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loginUrl = 'http://localhost:8080/api/authenticate';
  private registerUrl = 'http://localhost:8080/api/register';

  private currentUserSubject = new BehaviorSubject<User | null>(null);

  constructor(private http: HttpClient, private router: Router) {
    this.loadUserFromStorage();
  }

  login(email: string, password: string, rememberMe: boolean): Observable<User | null> {
    const loginData = { username: email, password, rememberMe };
    return this.http.post<LoginResponse>(this.loginUrl, loginData).pipe(
      tap(response => {
        this.storeToken(response.idToken, rememberMe);
        const userWithRole = this.addRoleToUser(response.user, response.role);
        this.currentUserSubject.next(userWithRole);
        this.saveUserToStorage(userWithRole);
      }),
      map(response => this.addRoleToUser(response.user, response.role)),
      catchError(error => {
        this.clearAuthData();
        return throwError(() => error);
      })
    );
  }

  register(userData: {
  login: string;
  firstName: string;
  lastName: string;
  email: string;
  imageUrl?: string;
  langKey?: string;
  authorities?: string[];
  password: string;
}): Observable<User | null> {
  // Préparer l'objet à envoyer avec tous les champs requis
  const payload = {
    id: 0,                               // id à 0 pour nouvelle inscription
    login: userData.login,
    firstName: userData.firstName,
    lastName: userData.lastName,
    email: userData.email,
    imageUrl: userData.imageUrl || '',
    activated: true,                     // activation directe
    langKey: userData.langKey || 'fr',
    createdBy: 'system',                 // ou l’utilisateur courant si possible
    createdDate: new Date().toISOString(),
    lastModifiedBy: 'system',
    lastModifiedDate: new Date().toISOString(),
    authorities: userData.authorities || ['ROLE_USER'],
    password: userData.password
  };

  return this.http.post<LoginResponse>(this.registerUrl, payload).pipe(
    tap(response => {
      const userWithRole = this.addRoleToUser(response.user, response.role);
      this.currentUserSubject.next(userWithRole);
      this.saveUserToStorage(userWithRole);
    }),
    map(response => this.addRoleToUser(response.user, response.role)),
    catchError(error => {
      this.clearAuthData();
      return throwError(() => error);
    })
  );
}


  private addRoleToUser(user: User, role: string): User {
    // Utilise le role fourni par l'API (string comme ROLE_USER), mappe vers UserRole si besoin
    switch (role) {
      case 'ROLE_ADMIN':
        user.role = 'admin';
        break;
      case 'ROLE_RECRUTEUR':
        user.role = 'recruteur';
        break;
      case 'ROLE_USER':
        user.role = 'candidat';
        break;
      default:
        user.role = '';
    }
    return user;
  }

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

  private storeToken(token: string, remember: boolean) {
    const storage = remember ? localStorage : sessionStorage;
    storage.setItem('auth_token', token);
  }

  private saveUserToStorage(user: User): void {
    const storage = localStorage.getItem('auth_token') ? localStorage : sessionStorage;
    storage.setItem('current_user', JSON.stringify(user));
  }

  private clearAuthData(): void {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('current_user');
    sessionStorage.removeItem('auth_token');
    sessionStorage.removeItem('current_user');
    this.currentUserSubject.next(null);
  }

  private loadUserFromStorage(): void {
    const userJson = localStorage.getItem('current_user') || sessionStorage.getItem('current_user');
    if (userJson) {
      try {
        const user = JSON.parse(userJson) as User;
        this.currentUserSubject.next(user);
      } catch (e) {
        this.clearAuthData();
      }
    }
  }

  getUserRole(): UserRole {
    return this.currentUserSubject.value?.role || '';
  }

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
