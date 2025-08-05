import { Component, input } from '@angular/core';
import { RouterModule } from '@angular/router';

import SharedModule from 'app/shared/shared.module';
import { IDomaine } from '../domaine.model';

@Component({
  selector: 'jhi-domaine-detail',
  templateUrl: './domaine-detail.component.html',
  imports: [SharedModule, RouterModule],
})
export class DomaineDetailComponent {
  domaine = input<IDomaine | null>(null);

  previousState(): void {
    window.history.back();
  }
}
