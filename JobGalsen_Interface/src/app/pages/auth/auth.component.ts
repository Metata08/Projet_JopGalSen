import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { 
  FormBuilder, 
  FormGroup, 
  Validators, 
  ReactiveFormsModule,
  AbstractControl 
} from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService, UserRole } from '../../auth.service';
import { catchError, of } from 'rxjs';
import { NgIf } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [
    CommonModule, 
    ReactiveFormsModule,
    RouterModule,
    NgIf,
    HttpClientModule,
  ],
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent {
  showPassword = false;
  userType: UserRole = 'candidat';
  activeTab: 'login' | 'register' = 'login';
  errorMessage: string | null = null;

  loginForm: FormGroup;
  registerForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      rememberMe: [false]
    });

    this.registerForm = this.fb.group({
      userType: ['candidat'],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, this.phoneValidator]],
      company: [''],
      password: ['', [
        Validators.required, 
        Validators.minLength(8),
        this.passwordValidator
      ]],
      acceptTerms: [false, Validators.requiredTrue]
    });
  }

  phoneValidator(control: AbstractControl): {[key: string]: any} | null {
    const valid = /^\+?\d{10,15}$/.test(control.value);
    return valid ? null : { invalidPhone: true };
  }

  passwordValidator(control: AbstractControl): {[key: string]: any} | null {
    const value = control.value;
    const hasNumber = /[0-9]/.test(value);
    const hasUpper = /[A-Z]/.test(value);
    const hasLower = /[a-z]/.test(value);
    const valid = hasNumber && hasUpper && hasLower;
    return valid ? null : { weakPassword: true };
  }

  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  onLoginSubmit(): void {
    if (this.loginForm.invalid) return;

    this.errorMessage = null;
    const { email, password, rememberMe } = this.loginForm.value;

    this.authService.login(email, password, rememberMe)
      .pipe(
        catchError(error => {
          this.errorMessage = (error.error?.message) || error.message || 'Erreur de connexion';
          return of(null);
        })
      )
      .subscribe(user => {
        if (user) {
          const role = user.role || 'candidat';
          const route = role === 'recruteur' ? '/recruteur-dashbord' : '/candidat-dashbord';
          this.router.navigate([route]);
        }
      });
  }

  onRegisterSubmit(): void {
    if (this.registerForm.invalid) return;

    this.errorMessage = null;
    const formValue = this.registerForm.value;
    const userData = {
      email: formValue.email,
      password: formValue.password,
      name: `${formValue.firstName} ${formValue.lastName}`,
      role: formValue.userType as UserRole,
      // Ajoute d'autres champs si nécessaire pour le register backend
    };

    this.authService.register(userData)
      .pipe(
        catchError(error => {
          this.errorMessage = (error.error?.message) || error.message || "Erreur lors de l'inscription";
          return of(null);
        })
      )
      .subscribe(user => {
        if (user) {
          this.activeTab = 'login';
          this.loginForm.patchValue({
            email: user.email,
            password: ''
          });
        }
      });
  }

  navigateToHome(): void {
    this.router.navigate(['/']);
  }

  get loginControls() {
    return this.loginForm.controls;
  }

  get registerControls() {
    return this.registerForm.controls;
  }
}
