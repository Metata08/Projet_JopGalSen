import { Component } from '@angular/core';
import { NavigationComponent } from '../../ui/navigation/navigation.component';
import { HeroSectionComponent } from '../../ui/hero-section/hero-section.component';
import {FeaturesSectionComponent} from '../../ui/features-section/features-section.component';
import { JobCategoriesComponent } from '../../ui/job-categories/job-categories.component';
import { JobListingsSectionComponent } from '../../ui/job-listings-section/job-listings-section.component';
import { StatsSectionComponent } from '../../ui/stats-section/stats-section.component';
import { TestimonialsSectionComponent } from '../../ui/testimonials-section/testimonials-section.component';
import { PartnersSectionComponent } from '../../ui/partners-section/partners-section.component';
import { CTASectionComponent } from '../../ui/ctasection/ctasection.component';
import { FooterComponent } from '../../ui/footer/footer.component';
import { RouterOutlet } from '@angular/router'; // Correction de l'import

@Component({
  selector: 'app-accueil',
  standalone: true,
  imports: [
    NavigationComponent, 
    RouterOutlet, 
    HeroSectionComponent, 
    FeaturesSectionComponent,
    JobCategoriesComponent,
    JobListingsSectionComponent,
    StatsSectionComponent,
    TestimonialsSectionComponent,
    PartnersSectionComponent,
    CTASectionComponent,
    FooterComponent
  ],
  templateUrl: './accueil.component.html',
  styleUrl: './accueil.component.css'
})
export class AccueilComponent {
  // Votre code ici
}