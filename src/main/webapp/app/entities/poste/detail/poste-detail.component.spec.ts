import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { RouterTestingHarness } from '@angular/router/testing';
import { of } from 'rxjs';

import { PosteDetailComponent } from './poste-detail.component';

describe('Poste Management Detail Component', () => {
  let comp: PosteDetailComponent;
  let fixture: ComponentFixture<PosteDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PosteDetailComponent],
      providers: [
        provideRouter(
          [
            {
              path: '**',
              loadComponent: () => import('./poste-detail.component').then(m => m.PosteDetailComponent),
              resolve: { poste: () => of({ id: 16448 }) },
            },
          ],
          withComponentInputBinding(),
        ),
      ],
    })
      .overrideTemplate(PosteDetailComponent, '')
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PosteDetailComponent);
    comp = fixture.componentInstance;
  });

  describe('OnInit', () => {
    it('should load poste on init', async () => {
      const harness = await RouterTestingHarness.create();
      const instance = await harness.navigateByUrl('/', PosteDetailComponent);

      // THEN
      expect(instance.poste()).toEqual(expect.objectContaining({ id: 16448 }));
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
