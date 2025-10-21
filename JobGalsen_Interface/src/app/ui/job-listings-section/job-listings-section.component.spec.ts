import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobListingsSectionComponent } from './job-listings-section.component';

describe('JobListingsSectionComponent', () => {
  let component: JobListingsSectionComponent;
  let fixture: ComponentFixture<JobListingsSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [JobListingsSectionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JobListingsSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
