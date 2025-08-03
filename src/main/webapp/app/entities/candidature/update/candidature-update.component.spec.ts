import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse, provideHttpClient } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subject, from, of } from 'rxjs';

import { IVisiteur } from 'app/entities/visiteur/visiteur.model';
import { VisiteurService } from 'app/entities/visiteur/service/visiteur.service';
import { IOffre } from 'app/entities/offre/offre.model';
import { OffreService } from 'app/entities/offre/service/offre.service';
import { ICandidature } from '../candidature.model';
import { CandidatureService } from '../service/candidature.service';
import { CandidatureFormService } from './candidature-form.service';

import { CandidatureUpdateComponent } from './candidature-update.component';

describe('Candidature Management Update Component', () => {
  let comp: CandidatureUpdateComponent;
  let fixture: ComponentFixture<CandidatureUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let candidatureFormService: CandidatureFormService;
  let candidatureService: CandidatureService;
  let visiteurService: VisiteurService;
  let offreService: OffreService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [CandidatureUpdateComponent],
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
      .overrideTemplate(CandidatureUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(CandidatureUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    candidatureFormService = TestBed.inject(CandidatureFormService);
    candidatureService = TestBed.inject(CandidatureService);
    visiteurService = TestBed.inject(VisiteurService);
    offreService = TestBed.inject(OffreService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('should call Visiteur query and add missing value', () => {
      const candidature: ICandidature = { id: 12242 };
      const visiteur: IVisiteur = { id: 21785 };
      candidature.visiteur = visiteur;

      const visiteurCollection: IVisiteur[] = [{ id: 21785 }];
      jest.spyOn(visiteurService, 'query').mockReturnValue(of(new HttpResponse({ body: visiteurCollection })));
      const additionalVisiteurs = [visiteur];
      const expectedCollection: IVisiteur[] = [...additionalVisiteurs, ...visiteurCollection];
      jest.spyOn(visiteurService, 'addVisiteurToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ candidature });
      comp.ngOnInit();

      expect(visiteurService.query).toHaveBeenCalled();
      expect(visiteurService.addVisiteurToCollectionIfMissing).toHaveBeenCalledWith(
        visiteurCollection,
        ...additionalVisiteurs.map(expect.objectContaining),
      );
      expect(comp.visiteursSharedCollection).toEqual(expectedCollection);
    });

    it('should call Offre query and add missing value', () => {
      const candidature: ICandidature = { id: 12242 };
      const offre: IOffre = { id: 9345 };
      candidature.offre = offre;

      const offreCollection: IOffre[] = [{ id: 9345 }];
      jest.spyOn(offreService, 'query').mockReturnValue(of(new HttpResponse({ body: offreCollection })));
      const additionalOffres = [offre];
      const expectedCollection: IOffre[] = [...additionalOffres, ...offreCollection];
      jest.spyOn(offreService, 'addOffreToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ candidature });
      comp.ngOnInit();

      expect(offreService.query).toHaveBeenCalled();
      expect(offreService.addOffreToCollectionIfMissing).toHaveBeenCalledWith(
        offreCollection,
        ...additionalOffres.map(expect.objectContaining),
      );
      expect(comp.offresSharedCollection).toEqual(expectedCollection);
    });

    it('should update editForm', () => {
      const candidature: ICandidature = { id: 12242 };
      const visiteur: IVisiteur = { id: 21785 };
      candidature.visiteur = visiteur;
      const offre: IOffre = { id: 9345 };
      candidature.offre = offre;

      activatedRoute.data = of({ candidature });
      comp.ngOnInit();

      expect(comp.visiteursSharedCollection).toContainEqual(visiteur);
      expect(comp.offresSharedCollection).toContainEqual(offre);
      expect(comp.candidature).toEqual(candidature);
    });
  });

  describe('save', () => {
    it('should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ICandidature>>();
      const candidature = { id: 17844 };
      jest.spyOn(candidatureFormService, 'getCandidature').mockReturnValue(candidature);
      jest.spyOn(candidatureService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ candidature });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: candidature }));
      saveSubject.complete();

      // THEN
      expect(candidatureFormService.getCandidature).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(candidatureService.update).toHaveBeenCalledWith(expect.objectContaining(candidature));
      expect(comp.isSaving).toEqual(false);
    });

    it('should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ICandidature>>();
      const candidature = { id: 17844 };
      jest.spyOn(candidatureFormService, 'getCandidature').mockReturnValue({ id: null });
      jest.spyOn(candidatureService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ candidature: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: candidature }));
      saveSubject.complete();

      // THEN
      expect(candidatureFormService.getCandidature).toHaveBeenCalled();
      expect(candidatureService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ICandidature>>();
      const candidature = { id: 17844 };
      jest.spyOn(candidatureService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ candidature });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(candidatureService.update).toHaveBeenCalled();
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

    describe('compareOffre', () => {
      it('should forward to offreService', () => {
        const entity = { id: 9345 };
        const entity2 = { id: 8458 };
        jest.spyOn(offreService, 'compareOffre');
        comp.compareOffre(entity, entity2);
        expect(offreService.compareOffre).toHaveBeenCalledWith(entity, entity2);
      });
    });
  });
});
