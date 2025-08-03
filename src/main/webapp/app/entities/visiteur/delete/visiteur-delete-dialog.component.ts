import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import SharedModule from 'app/shared/shared.module';
import { ITEM_DELETED_EVENT } from 'app/config/navigation.constants';
import { IVisiteur } from '../visiteur.model';
import { VisiteurService } from '../service/visiteur.service';

@Component({
  templateUrl: './visiteur-delete-dialog.component.html',
  imports: [SharedModule, FormsModule],
})
export class VisiteurDeleteDialogComponent {
  visiteur?: IVisiteur;

  protected visiteurService = inject(VisiteurService);
  protected activeModal = inject(NgbActiveModal);

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.visiteurService.delete(id).subscribe(() => {
      this.activeModal.close(ITEM_DELETED_EVENT);
    });
  }
}
