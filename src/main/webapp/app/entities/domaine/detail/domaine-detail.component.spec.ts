import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { RouterTestingHarness } from '@angular/router/testing';
import { of } from 'rxjs';

import { DomaineDetailComponent } from './domaine-detail.component';

describe('Domaine Management Detail Component', () => {
  let comp: DomaineDetailComponent;
  let fixture: ComponentFixture<DomaineDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DomaineDetailComponent],
      providers: [
        provideRouter(
          [
            {
              path: '**',
              loadComponent: () => import('./domaine-detail.component').then(m => m.DomaineDetailComponent),
              resolve: { domaine: () => of({ id: 14497 }) },
            },
          ],
          withComponentInputBinding(),
        ),
      ],
    })
      .overrideTemplate(DomaineDetailComponent, '')
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DomaineDetailComponent);
    comp = fixture.componentInstance;
  });

  describe('OnInit', () => {
    it('should load domaine on init', async () => {
      const harness = await RouterTestingHarness.create();
      const instance = await harness.navigateByUrl('/', DomaineDetailComponent);

      // THEN
      expect(instance.domaine()).toEqual(expect.objectContaining({ id: 14497 }));
    });
  });

  describe('PreviousState', () => {
    it('should navigate to previous state', () => {
      jest.spyOn(window.history, 'back');
      comp.previousState();
      expect(window.history.back).toHaveBeenCalled();
    });
  });
});
