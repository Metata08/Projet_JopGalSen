import { Component, input } from '@angular/core';
import { RouterModule } from '@angular/router';

import SharedModule from 'app/shared/shared.module';
import { FormatMediumDatePipe } from 'app/shared/date';
import { ICandidature } from '../candidature.model';

@Component({
  selector: 'jhi-candidature-detail',
  templateUrl: './candidature-detail.component.html',
  imports: [SharedModule, RouterModule, FormatMediumDatePipe],
})
export class CandidatureDetailComponent {
  candidature = input<ICandidature | null>(null);

  previousState(): void {
    window.history.back();
  }
}
