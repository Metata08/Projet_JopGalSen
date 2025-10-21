import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CandidatHeaderComponent } from './candidat-header.component';

describe('CandidatHeaderComponent', () => {
  let component: CandidatHeaderComponent;
  let fixture: ComponentFixture<CandidatHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CandidatHeaderComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CandidatHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
