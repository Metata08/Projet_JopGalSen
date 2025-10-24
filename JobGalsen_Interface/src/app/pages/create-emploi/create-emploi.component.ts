import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { JobService } from '../../job.service';
import { Job } from '../../models/job.model';
import { Router } from '@angular/router';
import { RecruteurHeaderComponent } from '../../ui/recruteur-header/recruteur-header.component';



@Component({
  selector: 'app-create-emploi',
  imports: [CommonModule, FormsModule, ReactiveFormsModule, RecruteurHeaderComponent],
  standalone: true,
  templateUrl: './create-emploi.component.html',
  styleUrls: ['./create-emploi.component.css']
})
export class CreateEmploiComponent {
  Job: FormGroup;
  isSubmitting = false;

  currentStep = 1;

  jobTypes = [
    { value: 'CDI', label: 'CDI' },
    { value: 'CDD', label: 'CDD' },
    { value: 'Stage', label: 'Stage' },
    { value: 'Freelance', label: 'Freelance' },
    { value: 'Temps partiel', label: 'Temps partiel' }
  ];

  categories = [
    { value: 'tech', label: 'Technologie' },
    { value: 'marketing', label: 'Marketing' },
    { value: 'finance', label: 'Finance' },
    { value: 'rh', label: 'Ressources Humaines' },
    { value: 'commercial', label: 'Commercial' },
    { value: 'design', label: 'Design' },
    { value: 'education', label: 'Éducation' },
    { value: 'sante', label: 'Santé' }
  ];

  experienceLevels = [
    { value: 'junior', label: 'Junior (0-2 ans)' },
    { value: 'intermediate', label: 'Intermédiaire (2-5 ans)' },
    { value: 'senior', label: 'Senior (5+ ans)' },
    { value: 'expert', label: 'Expert (10+ ans)' }
  ];

  locations = [
    'Dakar', 'Thiès', 'Saint-Louis', 'Kaolack', 'Ziguinchor', 
    'Louga', 'Fatick', 'Kolda', 'Tambacounda', 'Sédhiou'
  ];

  constructor(private fb: FormBuilder, private jobService: JobService, private router: Router) {
    this.Job = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(5)]],
      company: ['', [Validators.required]],
      location: ['', [Validators.required]],
      type: ['', [Validators.required]],
      category: ['', [Validators.required]],
      salary: [''],
      experience: ['', [Validators.required]],
      description: ['', [Validators.required, Validators.minLength(50)]],
      requirements: ['', [Validators.required]],
      benefits: [''],
      deadline: ['', [Validators.required]]
    });
  }

  onSubmit(): void {
    if (this.Job.valid) {
      this.isSubmitting = true;
      
      const jobData: Job = this.Job.value;
      
      // Simulate API call
      setTimeout(() => {
        // Here you would typically call the jobService to save the job
         /*this.jobService.createJob(jobData).subscribe(response => {
           console.log('Job created:', response);
           this.isSubmitting = false;
           // Redirect to dashboard


            // or show success message
           alert('Offre d\'emploi créée avec succès!');
           this.Job.reset();
         }, error => {
           console.error('Error creating job:', error);
           this.isSubmitting = false;
           alert('Erreur lors de la création de l\'offre d\'emploi');
         });*/
        // Simulate success response

        console.log('Job created:', jobData);
        this.isSubmitting = false;
        // Navigate back to dashboard or show success message
        alert('Offre d\'emploi créée avec succès!');
        this.Job.reset();
      }, 2000);
    } else {
      this.markFormGroupTouched();
    }
  }

  private markFormGroupTouched(): void {
    Object.keys(this.Job.controls).forEach(key => {
      const control = this.Job.get(key);
      if (control) {
        control.markAsTouched();
      }
    });
  }

  getFieldError(fieldName: string): string {
    const field = this.Job.get(fieldName);
    if (field && field.errors && field.touched) {
      if (field.errors['required']) {
        return 'Ce champ est requis';
      }
      if (field.errors['minlength']) {
        return `Minimum ${field.errors['minlength'].requiredLength} caractères`;
      }
    }
    return '';
  }

  isFieldInvalid(fieldName: string): boolean {
    const field = this.Job.get(fieldName);
    return !!(field && field.invalid && field.touched);
  }

  goBack(): void {
    this.router.navigate(['/recruteur-dashbord']);
    console.log('Navigate back to dashboard');
  }

  saveDraft(): void {
    console.log('Save as draft:', this.Job.value);
    alert('Brouillon sauvegardé!');
  }

  nextStep() {
    if (this.currentStep < 4) {
      this.currentStep++;
    }
  }

  prevStep() {
    if (this.currentStep > 1) {
      this.currentStep--;
    }
  }

  getStepTitle(step: number): string {
  switch(step) {
    case 1:
      return 'Informations générales';
    case 2:
      return 'Détails du poste';
    case 3:
      return 'Conditions';
    case 4:
      return 'Aperçu';
    default:
      return 'Étape ' + step;
  }
}

naviguerRetour(): void {
    this.router.navigate(['/recruteur']);
  }

getExperienceLabel(value: string): string {
  const exp = this.experienceLevels.find(e => e.value === value);
  return exp ? exp.label : '';
}

getStepIcon(step: number): string {
  switch(step) {
    case 1: return 'bi bi-info-circle';
    case 2: return 'bi bi-file-text';
    case 3: return 'bi bi-clipboard-check';
    case 4: return 'bi bi-eye';
    default: return 'bi bi-question-circle';
  }
}
}
