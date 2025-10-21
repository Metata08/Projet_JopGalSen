import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecruteurDashbordComponent } from './recruteur-dashbord.component';

describe('RecruteurDashbordComponent', () => {
  let component: RecruteurDashbordComponent;
  let fixture: ComponentFixture<RecruteurDashbordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RecruteurDashbordComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RecruteurDashbordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
