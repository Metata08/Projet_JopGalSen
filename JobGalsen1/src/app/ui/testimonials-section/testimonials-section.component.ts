import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Testimonial {
  id: number;
  name: string;
  role: string;
  company: string;
  avatar: string;
  rating: number;
  testimonial: string;
  skills: string[];
}

@Component({
  selector: 'app-testimonials-section',
  imports: [CommonModule],
  templateUrl: './testimonials-section.component.html',
  styleUrls: ['./testimonials-section.component.css']
})
export class TestimonialsSectionComponent {
  testimonials: Testimonial[] = [
    {
      id: 1,
      name: "Fatou Diop",
      role: "Développeuse Frontend",
      company: "Orange Digital Center",
      avatar: "F",
      rating: 5,
      testimonial: "Grâce à JobGalSen, j'ai trouvé le poste de mes rêves en moins de 2 semaines. L'interface est intuitive et les offres sont de qualité.",
      skills: ["React", "TypeScript"]
    },
    {
      id: 2,
      name: "Moussa Kane",
      role: "Marketing Manager",
      company: "Senfinances",
      avatar: "M",
      rating: 5,
      testimonial: "Excellent service ! J'ai pu recruter des talents exceptionnels pour mon équipe. La plateforme facilite vraiment les connexions.",
      skills: ["Marketing", "Digital"]
    },
    {
      id: 3,
      name: "Aïcha Ndiaye",
      role: "Data Analyst",
      company: "Sonatel",
      avatar: "A",
      rating: 5,
      testimonial: "JobGalSen m'a aidée à découvrir des opportunités que je n'aurais jamais trouvées ailleurs. Recommandé à 100% !",
      skills: ["Python", "Analytics"]
    }
  ];
}