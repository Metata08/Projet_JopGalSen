import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { RouterTestingHarness } from '@angular/router/testing';
import { of } from 'rxjs';

import { VisiteurDetailComponent } from './visiteur-detail.component';

describe('Visiteur Management Detail Component', () => {
  let comp: VisiteurDetailComponent;
  let fixture: ComponentFixture<VisiteurDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VisiteurDetailComponent],
      providers: [
        provideRouter(
          [
            {
              path: '**',
              loadComponent: () => import('./visiteur-detail.component').then(m => m.VisiteurDetailComponent),
              resolve: { visiteur: () => of({ id: 21785 }) },
            },
          ],
          withComponentInputBinding(),
        ),
      ],
    })
      .overrideTemplate(VisiteurDetailComponent, '')
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VisiteurDetailComponent);
    comp = fixture.componentInstance;
  });

  describe('OnInit', () => {
    it('should load visiteur on init', async () => {
      const harness = await RouterTestingHarness.create();
      const instance = await harness.navigateByUrl('/', VisiteurDetailComponent);

      // THEN
      expect(instance.visiteur()).toEqual(expect.objectContaining({ id: 21785 }));
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
