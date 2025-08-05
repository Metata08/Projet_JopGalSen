import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse, provideHttpClient } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subject, from, of } from 'rxjs';

import { IRecruteur } from 'app/entities/recruteur/recruteur.model';
import { RecruteurService } from 'app/entities/recruteur/service/recruteur.service';
import { IPoste } from 'app/entities/poste/poste.model';
import { PosteService } from 'app/entities/poste/service/poste.service';
import { IOffre } from '../offre.model';
import { OffreService } from '../service/offre.service';
import { OffreFormService } from './offre-form.service';

import { OffreUpdateComponent } from './offre-update.component';

describe('Offre Management Update Component', () => {
  let comp: OffreUpdateComponent;
  let fixture: ComponentFixture<OffreUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let offreFormService: OffreFormService;
  let offreService: OffreService;
  let recruteurService: RecruteurService;
  let posteService: PosteService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [OffreUpdateComponent],
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
      .overrideTemplate(OffreUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(OffreUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    offreFormService = TestBed.inject(OffreFormService);
    offreService = TestBed.inject(OffreService);
    recruteurService = TestBed.inject(RecruteurService);
    posteService = TestBed.inject(PosteService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('should call Recruteur query and add missing value', () => {
      const offre: IOffre = { id: 8458 };
      const recruteur: IRecruteur = { id: 4268 };
      offre.recruteur = recruteur;

      const recruteurCollection: IRecruteur[] = [{ id: 4268 }];
      jest.spyOn(recruteurService, 'query').mockReturnValue(of(new HttpResponse({ body: recruteurCollection })));
      const additionalRecruteurs = [recruteur];
      const expectedCollection: IRecruteur[] = [...additionalRecruteurs, ...recruteurCollection];
      jest.spyOn(recruteurService, 'addRecruteurToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ offre });
      comp.ngOnInit();

      expect(recruteurService.query).toHaveBeenCalled();
      expect(recruteurService.addRecruteurToCollectionIfMissing).toHaveBeenCalledWith(
        recruteurCollection,
        ...additionalRecruteurs.map(expect.objectContaining),
      );
      expect(comp.recruteursSharedCollection).toEqual(expectedCollection);
    });

    it('should call Poste query and add missing value', () => {
      const offre: IOffre = { id: 8458 };
      const postes: IPoste[] = [{ id: 16448 }];
      offre.postes = postes;

      const posteCollection: IPoste[] = [{ id: 16448 }];
      jest.spyOn(posteService, 'query').mockReturnValue(of(new HttpResponse({ body: posteCollection })));
      const additionalPostes = [...postes];
      const expectedCollection: IPoste[] = [...additionalPostes, ...posteCollection];
      jest.spyOn(posteService, 'addPosteToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ offre });
      comp.ngOnInit();

      expect(posteService.query).toHaveBeenCalled();
      expect(posteService.addPosteToCollectionIfMissing).toHaveBeenCalledWith(
        posteCollection,
        ...additionalPostes.map(expect.objectContaining),
      );
      expect(comp.postesSharedCollection).toEqual(expectedCollection);
    });

    it('should update editForm', () => {
      const offre: IOffre = { id: 8458 };
      const recruteur: IRecruteur = { id: 4268 };
      offre.recruteur = recruteur;
      const postes: IPoste = { id: 16448 };
      offre.postes = [postes];

      activatedRoute.data = of({ offre });
      comp.ngOnInit();

      expect(comp.recruteursSharedCollection).toContainEqual(recruteur);
      expect(comp.postesSharedCollection).toContainEqual(postes);
      expect(comp.offre).toEqual(offre);
    });
  });

  describe('save', () => {
    it('should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IOffre>>();
      const offre = { id: 9345 };
      jest.spyOn(offreFormService, 'getOffre').mockReturnValue(offre);
      jest.spyOn(offreService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ offre });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: offre }));
      saveSubject.complete();

      // THEN
      expect(offreFormService.getOffre).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(offreService.update).toHaveBeenCalledWith(expect.objectContaining(offre));
      expect(comp.isSaving).toEqual(false);
    });

    it('should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IOffre>>();
      const offre = { id: 9345 };
      jest.spyOn(offreFormService, 'getOffre').mockReturnValue({ id: null });
      jest.spyOn(offreService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ offre: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: offre }));
      saveSubject.complete();

      // THEN
      expect(offreFormService.getOffre).toHaveBeenCalled();
      expect(offreService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IOffre>>();
      const offre = { id: 9345 };
      jest.spyOn(offreService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ offre });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(offreService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });

  describe('Compare relationships', () => {
    describe('compareRecruteur', () => {
      it('should forward to recruteurService', () => {
        const entity = { id: 4268 };
        const entity2 = { id: 10028 };
        jest.spyOn(recruteurService, 'compareRecruteur');
        comp.compareRecruteur(entity, entity2);
        expect(recruteurService.compareRecruteur).toHaveBeenCalledWith(entity, entity2);
      });
    });

    describe('comparePoste', () => {
      it('should forward to posteService', () => {
        const entity = { id: 16448 };
        const entity2 = { id: 12668 };
        jest.spyOn(posteService, 'comparePoste');
        comp.comparePoste(entity, entity2);
        expect(posteService.comparePoste).toHaveBeenCalledWith(entity, entity2);
      });
    });
  });
});
