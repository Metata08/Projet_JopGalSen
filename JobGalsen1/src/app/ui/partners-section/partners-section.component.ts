import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Partner {
  name: string;
  logo: string;
  description: string;
}

@Component({
  selector: 'app-partners-section',
  templateUrl: './partners-section.component.html',
  styleUrls: ['./partners-section.component.css'],
  standalone: true,
  imports: [CommonModule]
})
export class PartnersSectionComponent {
  partners: Partner[] = [
    {
      name: 'Orange Digital Center',
      logo: 'ODC',
      description: 'Centre d\'innovation technologique'
    },
    {
      name: 'Sonatel',
      logo: 'SON',
      description: 'Télécommunications'
    },
    {
      name: 'Ecobank',
      logo: 'ECO',
      description: 'Services financiers'
    },
    {
      name: 'Total Senegal',
      logo: 'TOT',
      description: 'Énergie'
    },
    {
      name: 'CBAO',
      logo: 'CBA',
      description: 'Banque'
    },
    {
      name: 'Senfinances',
      logo: 'SEN',
      description: 'Solutions financières'
    },
    {
      name: 'DER/FJ',
      logo: 'DER',
      description: 'Entrepreneuriat jeunesse'
    },
    {
      name: 'ADEPME',
      logo: 'ADE',
      description: 'PME et PMI'
    }
  ];
}