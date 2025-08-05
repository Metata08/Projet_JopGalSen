import { Component, OnInit, inject } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import SharedModule from 'app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IDomaine } from 'app/entities/domaine/domaine.model';
import { DomaineService } from 'app/entities/domaine/service/domaine.service';
import { IOffre } from 'app/entities/offre/offre.model';
import { OffreService } from 'app/entities/offre/service/offre.service';
import { PosteService } from '../service/poste.service';
import { IPoste } from '../poste.model';
import { PosteFormGroup, PosteFormService } from './poste-form.service';

@Component({
  selector: 'jhi-poste-update',
  templateUrl: './poste-update.component.html',
  imports: [SharedModule, FormsModule, ReactiveFormsModule],
})
export class PosteUpdateComponent implements OnInit {
  isSaving = false;
  poste: IPoste | null = null;

  domainesSharedCollection: IDomaine[] = [];
  offresSharedCollection: IOffre[] = [];

  protected posteService = inject(PosteService);
  protected posteFormService = inject(PosteFormService);
  protected domaineService = inject(DomaineService);
  protected offreService = inject(OffreService);
  protected activatedRoute = inject(ActivatedRoute);

  // eslint-disable-next-line @typescript-eslint/member-ordering
  editForm: PosteFormGroup = this.posteFormService.createPosteFormGroup();

  compareDomaine = (o1: IDomaine | null, o2: IDomaine | null): boolean => this.domaineService.compareDomaine(o1, o2);

  compareOffre = (o1: IOffre | null, o2: IOffre | null): boolean => this.offreService.compareOffre(o1, o2);

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ poste }) => {
      this.poste = poste;
      if (poste) {
        this.updateForm(poste);
      }

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const poste = this.posteFormService.getPoste(this.editForm);
    if (poste.id !== null) {
      this.subscribeToSaveResponse(this.posteService.update(poste));
    } else {
      this.subscribeToSaveResponse(this.posteService.create(poste));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IPoste>>): void {
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

  protected updateForm(poste: IPoste): void {
    this.poste = poste;
    this.posteFormService.resetForm(this.editForm, poste);

    this.domainesSharedCollection = this.domaineService.addDomaineToCollectionIfMissing<IDomaine>(
      this.domainesSharedCollection,
      poste.domaine,
    );
    this.offresSharedCollection = this.offreService.addOffreToCollectionIfMissing<IOffre>(
      this.offresSharedCollection,
      ...(poste.offres ?? []),
    );
  }

  protected loadRelationshipsOptions(): void {
    this.domaineService
      .query()
      .pipe(map((res: HttpResponse<IDomaine[]>) => res.body ?? []))
      .pipe(map((domaines: IDomaine[]) => this.domaineService.addDomaineToCollectionIfMissing<IDomaine>(domaines, this.poste?.domaine)))
      .subscribe((domaines: IDomaine[]) => (this.domainesSharedCollection = domaines));

    this.offreService
      .query()
      .pipe(map((res: HttpResponse<IOffre[]>) => res.body ?? []))
      .pipe(map((offres: IOffre[]) => this.offreService.addOffreToCollectionIfMissing<IOffre>(offres, ...(this.poste?.offres ?? []))))
      .subscribe((offres: IOffre[]) => (this.offresSharedCollection = offres));
  }
}
