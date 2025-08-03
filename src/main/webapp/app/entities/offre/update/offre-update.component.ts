import { Component, OnInit, inject } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import SharedModule from 'app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AlertError } from 'app/shared/alert/alert-error.model';
import { EventManager, EventWithContent } from 'app/core/util/event-manager.service';
import { DataUtils, FileLoadError } from 'app/core/util/data-util.service';
import { IRecruteur } from 'app/entities/recruteur/recruteur.model';
import { RecruteurService } from 'app/entities/recruteur/service/recruteur.service';
import { IPoste } from 'app/entities/poste/poste.model';
import { PosteService } from 'app/entities/poste/service/poste.service';
import { TypeContrat } from 'app/entities/enumerations/type-contrat.model';
import { OffreService } from '../service/offre.service';
import { IOffre } from '../offre.model';
import { OffreFormGroup, OffreFormService } from './offre-form.service';

@Component({
  selector: 'jhi-offre-update',
  templateUrl: './offre-update.component.html',
  imports: [SharedModule, FormsModule, ReactiveFormsModule],
})
export class OffreUpdateComponent implements OnInit {
  isSaving = false;
  offre: IOffre | null = null;
  typeContratValues = Object.keys(TypeContrat);

  recruteursSharedCollection: IRecruteur[] = [];
  postesSharedCollection: IPoste[] = [];

  protected dataUtils = inject(DataUtils);
  protected eventManager = inject(EventManager);
  protected offreService = inject(OffreService);
  protected offreFormService = inject(OffreFormService);
  protected recruteurService = inject(RecruteurService);
  protected posteService = inject(PosteService);
  protected activatedRoute = inject(ActivatedRoute);

  // eslint-disable-next-line @typescript-eslint/member-ordering
  editForm: OffreFormGroup = this.offreFormService.createOffreFormGroup();

  compareRecruteur = (o1: IRecruteur | null, o2: IRecruteur | null): boolean => this.recruteurService.compareRecruteur(o1, o2);

  comparePoste = (o1: IPoste | null, o2: IPoste | null): boolean => this.posteService.comparePoste(o1, o2);

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ offre }) => {
      this.offre = offre;
      if (offre) {
        this.updateForm(offre);
      }

      this.loadRelationshipsOptions();
    });
  }

  byteSize(base64String: string): string {
    return this.dataUtils.byteSize(base64String);
  }

  openFile(base64String: string, contentType: string | null | undefined): void {
    this.dataUtils.openFile(base64String, contentType);
  }

  setFileData(event: Event, field: string, isImage: boolean): void {
    this.dataUtils.loadFileToForm(event, this.editForm, field, isImage).subscribe({
      error: (err: FileLoadError) =>
        this.eventManager.broadcast(new EventWithContent<AlertError>('jobCalsenApp.error', { ...err, key: `error.file.${err.key}` })),
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const offre = this.offreFormService.getOffre(this.editForm);
    if (offre.id !== null) {
      this.subscribeToSaveResponse(this.offreService.update(offre));
    } else {
      this.subscribeToSaveResponse(this.offreService.create(offre));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IOffre>>): void {
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

  protected updateForm(offre: IOffre): void {
    this.offre = offre;
    this.offreFormService.resetForm(this.editForm, offre);

    this.recruteursSharedCollection = this.recruteurService.addRecruteurToCollectionIfMissing<IRecruteur>(
      this.recruteursSharedCollection,
      offre.recruteur,
    );
    this.postesSharedCollection = this.posteService.addPosteToCollectionIfMissing<IPoste>(this.postesSharedCollection, offre.poste);
  }

  protected loadRelationshipsOptions(): void {
    this.recruteurService
      .query()
      .pipe(map((res: HttpResponse<IRecruteur[]>) => res.body ?? []))
      .pipe(
        map((recruteurs: IRecruteur[]) =>
          this.recruteurService.addRecruteurToCollectionIfMissing<IRecruteur>(recruteurs, this.offre?.recruteur),
        ),
      )
      .subscribe((recruteurs: IRecruteur[]) => (this.recruteursSharedCollection = recruteurs));

    this.posteService
      .query()
      .pipe(map((res: HttpResponse<IPoste[]>) => res.body ?? []))
      .pipe(map((postes: IPoste[]) => this.posteService.addPosteToCollectionIfMissing<IPoste>(postes, this.offre?.poste)))
      .subscribe((postes: IPoste[]) => (this.postesSharedCollection = postes));
  }
}
