import { Component, input } from '@angular/core';
import { RouterModule } from '@angular/router';

import SharedModule from 'app/shared/shared.module';
import { IPoste } from '../poste.model';

@Component({
  selector: 'jhi-poste-detail',
  templateUrl: './poste-detail.component.html',
  imports: [SharedModule, RouterModule],
})
export class PosteDetailComponent {
  poste = input<IPoste | null>(null);

  previousState(): void {
    window.history.back();
  }
}
