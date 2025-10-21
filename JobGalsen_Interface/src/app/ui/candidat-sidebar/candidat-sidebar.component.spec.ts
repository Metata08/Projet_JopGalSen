import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CandidatSidebarComponent } from './candidat-sidebar.component';

describe('CandidatSidebarComponent', () => {
  let component: CandidatSidebarComponent;
  let fixture: ComponentFixture<CandidatSidebarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CandidatSidebarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CandidatSidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
