import { Component, input } from '@angular/core';
import { RouterModule } from '@angular/router';

import SharedModule from 'app/shared/shared.module';
import { IVisiteur } from '../visiteur.model';

@Component({
  selector: 'jhi-visiteur-detail',
  templateUrl: './visiteur-detail.component.html',
  imports: [SharedModule, RouterModule],
})
export class VisiteurDetailComponent {
  visiteur = input<IVisiteur | null>(null);

  previousState(): void {
    window.history.back();
  }
}
