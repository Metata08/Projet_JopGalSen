import { Component, OnInit, inject } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import SharedModule from 'app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IVisiteur } from 'app/entities/visiteur/visiteur.model';
import { VisiteurService } from 'app/entities/visiteur/service/visiteur.service';
import { IRecruteur } from 'app/entities/recruteur/recruteur.model';
import { RecruteurService } from 'app/entities/recruteur/service/recruteur.service';
import { Roles } from 'app/entities/enumerations/roles.model';
import { UsersService } from '../service/users.service';
import { IUsers } from '../users.model';
import { UsersFormGroup, UsersFormService } from './users-form.service';

@Component({
  selector: 'jhi-users-update',
  templateUrl: './users-update.component.html',
  imports: [SharedModule, FormsModule, ReactiveFormsModule],
})
export class UsersUpdateComponent implements OnInit {
  isSaving = false;
  users: IUsers | null = null;
  rolesValues = Object.keys(Roles);

  visiteursCollection: IVisiteur[] = [];
  recruteursCollection: IRecruteur[] = [];

  protected usersService = inject(UsersService);
  protected usersFormService = inject(UsersFormService);
  protected visiteurService = inject(VisiteurService);
  protected recruteurService = inject(RecruteurService);
  protected activatedRoute = inject(ActivatedRoute);

  // eslint-disable-next-line @typescript-eslint/member-ordering
  editForm: UsersFormGroup = this.usersFormService.createUsersFormGroup();

  compareVisiteur = (o1: IVisiteur | null, o2: IVisiteur | null): boolean => this.visiteurService.compareVisiteur(o1, o2);

  compareRecruteur = (o1: IRecruteur | null, o2: IRecruteur | null): boolean => this.recruteurService.compareRecruteur(o1, o2);

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ users }) => {
      this.users = users;
      if (users) {
        this.updateForm(users);
      }

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const users = this.usersFormService.getUsers(this.editForm);
    if (users.id !== null) {
      this.subscribeToSaveResponse(this.usersService.update(users));
    } else {
      this.subscribeToSaveResponse(this.usersService.create(users));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IUsers>>): void {
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

  protected updateForm(users: IUsers): void {
    this.users = users;
    this.usersFormService.resetForm(this.editForm, users);

    this.visiteursCollection = this.visiteurService.addVisiteurToCollectionIfMissing<IVisiteur>(this.visiteursCollection, users.visiteur);
    this.recruteursCollection = this.recruteurService.addRecruteurToCollectionIfMissing<IRecruteur>(
      this.recruteursCollection,
      users.recruteur,
    );
  }

  protected loadRelationshipsOptions(): void {
    this.visiteurService
      .query({ filter: 'user-is-null' })
      .pipe(map((res: HttpResponse<IVisiteur[]>) => res.body ?? []))
      .pipe(
        map((visiteurs: IVisiteur[]) => this.visiteurService.addVisiteurToCollectionIfMissing<IVisiteur>(visiteurs, this.users?.visiteur)),
      )
      .subscribe((visiteurs: IVisiteur[]) => (this.visiteursCollection = visiteurs));

    this.recruteurService
      .query({ filter: 'user-is-null' })
      .pipe(map((res: HttpResponse<IRecruteur[]>) => res.body ?? []))
      .pipe(
        map((recruteurs: IRecruteur[]) =>
          this.recruteurService.addRecruteurToCollectionIfMissing<IRecruteur>(recruteurs, this.users?.recruteur),
        ),
      )
      .subscribe((recruteurs: IRecruteur[]) => (this.recruteursCollection = recruteurs));
  }
}
