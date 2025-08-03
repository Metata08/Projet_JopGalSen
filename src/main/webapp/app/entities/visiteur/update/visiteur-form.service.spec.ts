import { TestBed } from '@angular/core/testing';

import { sampleWithNewData, sampleWithRequiredData } from '../visiteur.test-samples';

import { VisiteurFormService } from './visiteur-form.service';

describe('Visiteur Form Service', () => {
  let service: VisiteurFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VisiteurFormService);
  });

  describe('Service methods', () => {
    describe('createVisiteurFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createVisiteurFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            cv: expect.any(Object),
          }),
        );
      });

      it('passing IVisiteur should create a new form with FormGroup', () => {
        const formGroup = service.createVisiteurFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            cv: expect.any(Object),
          }),
        );
      });
    });

    describe('getVisiteur', () => {
      it('should return NewVisiteur for default Visiteur initial value', () => {
        const formGroup = service.createVisiteurFormGroup(sampleWithNewData);

        const visiteur = service.getVisiteur(formGroup) as any;

        expect(visiteur).toMatchObject(sampleWithNewData);
      });

      it('should return NewVisiteur for empty Visiteur initial value', () => {
        const formGroup = service.createVisiteurFormGroup();

        const visiteur = service.getVisiteur(formGroup) as any;

        expect(visiteur).toMatchObject({});
      });

      it('should return IVisiteur', () => {
        const formGroup = service.createVisiteurFormGroup(sampleWithRequiredData);

        const visiteur = service.getVisiteur(formGroup) as any;

        expect(visiteur).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing IVisiteur should not enable id FormControl', () => {
        const formGroup = service.createVisiteurFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewVisiteur should disable id FormControl', () => {
        const formGroup = service.createVisiteurFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
