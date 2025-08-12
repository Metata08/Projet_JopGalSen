import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'; // Import CommonModule for ngFor

@Component({
  selector: 'app-job-categories',
  templateUrl: './job-categories.component.html',
  styleUrls: ['./job-categories.component.css'],
  imports: [CommonModule] // Import CommonModule to use ngFor in the template
})
export class JobCategoriesComponent {
  categories = [
    { icon: 'bi-code-slash', name: 'Technologie', count: '450+ offres', color: 'bg-primary bg-opacity-10 text-primary' },
    { icon: 'bi-heart-pulse', name: 'Santé', count: '320+ offres', color: 'bg-success bg-opacity-10 text-success' },
    { icon: 'bi-calculator', name: 'Finance', count: '280+ offres', color: 'bg-info bg-opacity-10 text-info' },
    { icon: 'bi-palette', name: 'Design', count: '190+ offres', color: 'bg-warning bg-opacity-10 text-warning' }
  ];
}