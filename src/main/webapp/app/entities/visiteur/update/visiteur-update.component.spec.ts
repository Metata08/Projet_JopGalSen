import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse, provideHttpClient } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subject, from, of } from 'rxjs';

import { VisiteurService } from '../service/visiteur.service';
import { IVisiteur } from '../visiteur.model';
import { VisiteurFormService } from './visiteur-form.service';

import { VisiteurUpdateComponent } from './visiteur-update.component';

describe('Visiteur Management Update Component', () => {
  let comp: VisiteurUpdateComponent;
  let fixture: ComponentFixture<VisiteurUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let visiteurFormService: VisiteurFormService;
  let visiteurService: VisiteurService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [VisiteurUpdateComponent],
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
      .overrideTemplate(VisiteurUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(VisiteurUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    visiteurFormService = TestBed.inject(VisiteurFormService);
    visiteurService = TestBed.inject(VisiteurService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('should update editForm', () => {
      const visiteur: IVisiteur = { id: 5296 };

      activatedRoute.data = of({ visiteur });
      comp.ngOnInit();

      expect(comp.visiteur).toEqual(visiteur);
    });
  });

  describe('save', () => {
    it('should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IVisiteur>>();
      const visiteur = { id: 21785 };
      jest.spyOn(visiteurFormService, 'getVisiteur').mockReturnValue(visiteur);
      jest.spyOn(visiteurService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ visiteur });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: visiteur }));
      saveSubject.complete();

      // THEN
      expect(visiteurFormService.getVisiteur).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(visiteurService.update).toHaveBeenCalledWith(expect.objectContaining(visiteur));
      expect(comp.isSaving).toEqual(false);
    });

    it('should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IVisiteur>>();
      const visiteur = { id: 21785 };
      jest.spyOn(visiteurFormService, 'getVisiteur').mockReturnValue({ id: null });
      jest.spyOn(visiteurService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ visiteur: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: visiteur }));
      saveSubject.complete();

      // THEN
      expect(visiteurFormService.getVisiteur).toHaveBeenCalled();
      expect(visiteurService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IVisiteur>>();
      const visiteur = { id: 21785 };
      jest.spyOn(visiteurService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ visiteur });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(visiteurService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });
});
