import { Component, OnInit, inject } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import SharedModule from 'app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IVisiteur } from '../visiteur.model';
import { VisiteurService } from '../service/visiteur.service';
import { VisiteurFormGroup, VisiteurFormService } from './visiteur-form.service';

@Component({
  selector: 'jhi-visiteur-update',
  templateUrl: './visiteur-update.component.html',
  imports: [SharedModule, FormsModule, ReactiveFormsModule],
})
export class VisiteurUpdateComponent implements OnInit {
  isSaving = false;
  visiteur: IVisiteur | null = null;

  protected visiteurService = inject(VisiteurService);
  protected visiteurFormService = inject(VisiteurFormService);
  protected activatedRoute = inject(ActivatedRoute);

  // eslint-disable-next-line @typescript-eslint/member-ordering
  editForm: VisiteurFormGroup = this.visiteurFormService.createVisiteurFormGroup();

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ visiteur }) => {
      this.visiteur = visiteur;
      if (visiteur) {
        this.updateForm(visiteur);
      }
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const visiteur = this.visiteurFormService.getVisiteur(this.editForm);
    if (visiteur.id !== null) {
      this.subscribeToSaveResponse(this.visiteurService.update(visiteur));
    } else {
      this.subscribeToSaveResponse(this.visiteurService.create(visiteur));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IVisiteur>>): void {
    result.pipe(finalize(() => this.onSaveFinalize())).subscribe({
      next: () => this.onSaveSuccess(),
      error: () => this.onSaveError(),
    });
  }

  protected onSaveSuccess(): void {
    this.previousState();
  }

  protected onSaveError(): void {
    // Api for inheritance.
  }

  protected onSaveFinalize(): void {
    this.isSaving = false;
  }

  protected updateForm(visiteur: IVisiteur): void {
    this.visiteur = visiteur;
    this.visiteurFormService.resetForm(this.editForm, visiteur);
  }
}
