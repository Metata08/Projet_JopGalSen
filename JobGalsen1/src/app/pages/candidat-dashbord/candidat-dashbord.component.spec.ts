import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CandidatDashbordComponent } from './candidat-dashbord.component';

describe('CandidatDashbordComponent', () => {
  let component: CandidatDashbordComponent;
  let fixture: ComponentFixture<CandidatDashbordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CandidatDashbordComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CandidatDashbordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
