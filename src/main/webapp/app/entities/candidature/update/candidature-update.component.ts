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
import { IVisiteur } from 'app/entities/visiteur/visiteur.model';
import { VisiteurService } from 'app/entities/visiteur/service/visiteur.service';
import { IOffre } from 'app/entities/offre/offre.model';
import { OffreService } from 'app/entities/offre/service/offre.service';
import { CandidatureService } from '../service/candidature.service';
import { ICandidature } from '../candidature.model';
import { CandidatureFormGroup, CandidatureFormService } from './candidature-form.service';

@Component({
  selector: 'jhi-candidature-update',
  templateUrl: './candidature-update.component.html',
  imports: [SharedModule, FormsModule, ReactiveFormsModule],
})
export class CandidatureUpdateComponent implements OnInit {
  isSaving = false;
  candidature: ICandidature | null = null;

  visiteursSharedCollection: IVisiteur[] = [];
  offresSharedCollection: IOffre[] = [];

  protected dataUtils = inject(DataUtils);
  protected eventManager = inject(EventManager);
  protected candidatureService = inject(CandidatureService);
  protected candidatureFormService = inject(CandidatureFormService);
  protected visiteurService = inject(VisiteurService);
  protected offreService = inject(OffreService);
  protected activatedRoute = inject(ActivatedRoute);

  // eslint-disable-next-line @typescript-eslint/member-ordering
  editForm: CandidatureFormGroup = this.candidatureFormService.createCandidatureFormGroup();

  compareVisiteur = (o1: IVisiteur | null, o2: IVisiteur | null): boolean => this.visiteurService.compareVisiteur(o1, o2);

  compareOffre = (o1: IOffre | null, o2: IOffre | null): boolean => this.offreService.compareOffre(o1, o2);

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ candidature }) => {
      this.candidature = candidature;
      if (candidature) {
        this.updateForm(candidature);
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
    const candidature = this.candidatureFormService.getCandidature(this.editForm);
    if (candidature.id !== null) {
      this.subscribeToSaveResponse(this.candidatureService.update(candidature));
    } else {
      this.subscribeToSaveResponse(this.candidatureService.create(candidature));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ICandidature>>): void {
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

  protected updateForm(candidature: ICandidature): void {
    this.candidature = candidature;
    this.candidatureFormService.resetForm(this.editForm, candidature);

    this.visiteursSharedCollection = this.visiteurService.addVisiteurToCollectionIfMissing<IVisiteur>(
      this.visiteursSharedCollection,
      candidature.visiteur,
    );
    this.offresSharedCollection = this.offreService.addOffreToCollectionIfMissing<IOffre>(this.offresSharedCollection, candidature.offre);
  }

  protected loadRelationshipsOptions(): void {
    this.visiteurService
      .query()
      .pipe(map((res: HttpResponse<IVisiteur[]>) => res.body ?? []))
      .pipe(
        map((visiteurs: IVisiteur[]) =>
          this.visiteurService.addVisiteurToCollectionIfMissing<IVisiteur>(visiteurs, this.candidature?.visiteur),
        ),
      )
      .subscribe((visiteurs: IVisiteur[]) => (this.visiteursSharedCollection = visiteurs));

    this.offreService
      .query()
      .pipe(map((res: HttpResponse<IOffre[]>) => res.body ?? []))
      .pipe(map((offres: IOffre[]) => this.offreService.addOffreToCollectionIfMissing<IOffre>(offres, this.candidature?.offre)))
      .subscribe((offres: IOffre[]) => (this.offresSharedCollection = offres));
  }
}
