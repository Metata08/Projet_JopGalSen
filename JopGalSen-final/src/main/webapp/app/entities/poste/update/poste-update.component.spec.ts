import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse, provideHttpClient } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subject, from, of } from 'rxjs';

import { IDomaine } from 'app/entities/domaine/domaine.model';
import { DomaineService } from 'app/entities/domaine/service/domaine.service';
import { IOffre } from 'app/entities/offre/offre.model';
import { OffreService } from 'app/entities/offre/service/offre.service';
import { IPoste } from '../poste.model';
import { PosteService } from '../service/poste.service';
import { PosteFormService } from './poste-form.service';

import { PosteUpdateComponent } from './poste-update.component';

describe('Poste Management Update Component', () => {
  let comp: PosteUpdateComponent;
  let fixture: ComponentFixture<PosteUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let posteFormService: PosteFormService;
  let posteService: PosteService;
  let domaineService: DomaineService;
  let offreService: OffreService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [PosteUpdateComponent],
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
      .overrideTemplate(PosteUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(PosteUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    posteFormService = TestBed.inject(PosteFormService);
    posteService = TestBed.inject(PosteService);
    domaineService = TestBed.inject(DomaineService);
    offreService = TestBed.inject(OffreService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('should call Domaine query and add missing value', () => {
      const poste: IPoste = { id: 12668 };
      const domaine: IDomaine = { id: 14497 };
      poste.domaine = domaine;

      const domaineCollection: IDomaine[] = [{ id: 14497 }];
      jest.spyOn(domaineService, 'query').mockReturnValue(of(new HttpResponse({ body: domaineCollection })));
      const additionalDomaines = [domaine];
      const expectedCollection: IDomaine[] = [...additionalDomaines, ...domaineCollection];
      jest.spyOn(domaineService, 'addDomaineToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ poste });
      comp.ngOnInit();

      expect(domaineService.query).toHaveBeenCalled();
      expect(domaineService.addDomaineToCollectionIfMissing).toHaveBeenCalledWith(
        domaineCollection,
        ...additionalDomaines.map(expect.objectContaining),
      );
      expect(comp.domainesSharedCollection).toEqual(expectedCollection);
    });

    it('should call Offre query and add missing value', () => {
      const poste: IPoste = { id: 12668 };
      const offres: IOffre[] = [{ id: 9345 }];
      poste.offres = offres;

      const offreCollection: IOffre[] = [{ id: 9345 }];
      jest.spyOn(offreService, 'query').mockReturnValue(of(new HttpResponse({ body: offreCollection })));
      const additionalOffres = [...offres];
      const expectedCollection: IOffre[] = [...additionalOffres, ...offreCollection];
      jest.spyOn(offreService, 'addOffreToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ poste });
      comp.ngOnInit();

      expect(offreService.query).toHaveBeenCalled();
      expect(offreService.addOffreToCollectionIfMissing).toHaveBeenCalledWith(
        offreCollection,
        ...additionalOffres.map(expect.objectContaining),
      );
      expect(comp.offresSharedCollection).toEqual(expectedCollection);
    });

    it('should update editForm', () => {
      const poste: IPoste = { id: 12668 };
      const domaine: IDomaine = { id: 14497 };
      poste.domaine = domaine;
      const offres: IOffre = { id: 9345 };
      poste.offres = [offres];

      activatedRoute.data = of({ poste });
      comp.ngOnInit();

      expect(comp.domainesSharedCollection).toContainEqual(domaine);
      expect(comp.offresSharedCollection).toContainEqual(offres);
      expect(comp.poste).toEqual(poste);
    });
  });

  describe('save', () => {
    it('should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IPoste>>();
      const poste = { id: 16448 };
      jest.spyOn(posteFormService, 'getPoste').mockReturnValue(poste);
      jest.spyOn(posteService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ poste });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: poste }));
      saveSubject.complete();

      // THEN
      expect(posteFormService.getPoste).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(posteService.update).toHaveBeenCalledWith(expect.objectContaining(poste));
      expect(comp.isSaving).toEqual(false);
    });

    it('should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IPoste>>();
      const poste = { id: 16448 };
      jest.spyOn(posteFormService, 'getPoste').mockReturnValue({ id: null });
      jest.spyOn(posteService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ poste: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: poste }));
      saveSubject.complete();

      // THEN
      expect(posteFormService.getPoste).toHaveBeenCalled();
      expect(posteService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IPoste>>();
      const poste = { id: 16448 };
      jest.spyOn(posteService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ poste });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(posteService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });

  describe('Compare relationships', () => {
    describe('compareDomaine', () => {
      it('should forward to domaineService', () => {
        const entity = { id: 14497 };
        const entity2 = { id: 24380 };
        jest.spyOn(domaineService, 'compareDomaine');
        comp.compareDomaine(entity, entity2);
        expect(domaineService.compareDomaine).toHaveBeenCalledWith(entity, entity2);
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
