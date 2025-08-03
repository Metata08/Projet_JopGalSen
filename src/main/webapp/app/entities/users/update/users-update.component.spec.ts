import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse, provideHttpClient } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subject, from, of } from 'rxjs';

import { IVisiteur } from 'app/entities/visiteur/visiteur.model';
import { VisiteurService } from 'app/entities/visiteur/service/visiteur.service';
import { IRecruteur } from 'app/entities/recruteur/recruteur.model';
import { RecruteurService } from 'app/entities/recruteur/service/recruteur.service';
import { IUsers } from '../users.model';
import { UsersService } from '../service/users.service';
import { UsersFormService } from './users-form.service';

import { UsersUpdateComponent } from './users-update.component';

describe('Users Management Update Component', () => {
  let comp: UsersUpdateComponent;
  let fixture: ComponentFixture<UsersUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let usersFormService: UsersFormService;
  let usersService: UsersService;
  let visiteurService: VisiteurService;
  let recruteurService: RecruteurService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [UsersUpdateComponent],
      providers: [
        provideHttpClient(),
        FormBuilder,
        {
          provide: ActivatedRoute,
          useValue: {
            params: from([{}]),
          },
        },
      ],
    })
      .overrideTemplate(UsersUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(UsersUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    usersFormService = TestBed.inject(UsersFormService);
    usersService = TestBed.inject(UsersService);
    visiteurService = TestBed.inject(VisiteurService);
    recruteurService = TestBed.inject(RecruteurService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('should call visiteur query and add missing value', () => {
      const users: IUsers = { id: 14626 };
      const visiteur: IVisiteur = { id: 21785 };
      users.visiteur = visiteur;

      const visiteurCollection: IVisiteur[] = [{ id: 21785 }];
      jest.spyOn(visiteurService, 'query').mockReturnValue(of(new HttpResponse({ body: visiteurCollection })));
      const expectedCollection: IVisiteur[] = [visiteur, ...visiteurCollection];
      jest.spyOn(visiteurService, 'addVisiteurToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ users });
      comp.ngOnInit();

      expect(visiteurService.query).toHaveBeenCalled();
      expect(visiteurService.addVisiteurToCollectionIfMissing).toHaveBeenCalledWith(visiteurCollection, visiteur);
      expect(comp.visiteursCollection).toEqual(expectedCollection);
    });

    it('should call recruteur query and add missing value', () => {
      const users: IUsers = { id: 14626 };
      const recruteur: IRecruteur = { id: 4268 };
      users.recruteur = recruteur;

      const recruteurCollection: IRecruteur[] = [{ id: 4268 }];
      jest.spyOn(recruteurService, 'query').mockReturnValue(of(new HttpResponse({ body: recruteurCollection })));
      const expectedCollection: IRecruteur[] = [recruteur, ...recruteurCollection];
      jest.spyOn(recruteurService, 'addRecruteurToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ users });
      comp.ngOnInit();

      expect(recruteurService.query).toHaveBeenCalled();
      expect(recruteurService.addRecruteurToCollectionIfMissing).toHaveBeenCalledWith(recruteurCollection, recruteur);
      expect(comp.recruteursCollection).toEqual(expectedCollection);
    });

    it('should update editForm', () => {
      const users: IUsers = { id: 14626 };
      const visiteur: IVisiteur = { id: 21785 };
      users.visiteur = visiteur;
      const recruteur: IRecruteur = { id: 4268 };
      users.recruteur = recruteur;

      activatedRoute.data = of({ users });
      comp.ngOnInit();

      expect(comp.visiteursCollection).toContainEqual(visiteur);
      expect(comp.recruteursCollection).toContainEqual(recruteur);
      expect(comp.users).toEqual(users);
    });
  });

  describe('save', () => {
    it('should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IUsers>>();
      const users = { id: 6956 };
      jest.spyOn(usersFormService, 'getUsers').mockReturnValue(users);
      jest.spyOn(usersService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ users });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: users }));
      saveSubject.complete();

      // THEN
      expect(usersFormService.getUsers).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(usersService.update).toHaveBeenCalledWith(expect.objectContaining(users));
      expect(comp.isSaving).toEqual(false);
    });

    it('should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IUsers>>();
      const users = { id: 6956 };
      jest.spyOn(usersFormService, 'getUsers').mockReturnValue({ id: null });
      jest.spyOn(usersService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ users: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: users }));
      saveSubject.complete();

      // THEN
      expect(usersFormService.getUsers).toHaveBeenCalled();
      expect(usersService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IUsers>>();
      const users = { id: 6956 };
      jest.spyOn(usersService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ users });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(usersService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });

  describe('Compare relationships', () => {
    describe('compareVisiteur', () => {
      it('should forward to visiteurService', () => {
        const entity = { id: 21785 };
        const entity2 = { id: 5296 };
        jest.spyOn(visiteurService, 'compareVisiteur');
        comp.compareVisiteur(entity, entity2);
        expect(visiteurService.compareVisiteur).toHaveBeenCalledWith(entity, entity2);
      });
    });

    describe('compareRecruteur', () => {
      it('should forward to recruteurService', () => {
        const entity = { id: 4268 };
        const entity2 = { id: 10028 };
        jest.spyOn(recruteurService, 'compareRecruteur');
        comp.compareRecruteur(entity, entity2);
        expect(recruteurService.compareRecruteur).toHaveBeenCalledWith(entity, entity2);
      });
    });
  });
});
