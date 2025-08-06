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
import { AuthService } from '../../auth.service';
import { catchError, finalize } from 'rxjs/operators';
import { of } from 'rxjs';
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
  userType: 'candidate' | 'recruteur' = 'candidate';
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
      userType: ['candidate'],
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
          this.errorMessage = error.message || 'Erreur de connexion';
          return of(null);
        })
      )
      .subscribe(response => {
        if (response) {
          this.router.navigate([this.userType === 'recruteur' ? '/recruteur-dashbord' : '/candidat-dashbord']);
        }
      });
  }

  onRegisterSubmit(): void {
    if (this.registerForm.invalid) return;
    
    this.errorMessage = null;
    
    const formValue = this.registerForm.value;
    const userData = {
      ...formValue,
      role: formValue.userType
    };
    
    this.authService.register(userData)
      .pipe(
        catchError(error => {
          this.errorMessage = error.message || "Erreur lors de l'inscription";
          return of(null);
        })
      )
      .subscribe(response => {
        if (response) {
          this.activeTab = 'login';
          this.loginForm.patchValue({
            email: userData.email,
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