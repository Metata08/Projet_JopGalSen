import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsEmploiComponent } from './details-emploi.component';

describe('DetailsEmploiComponent', () => {
  let component: DetailsEmploiComponent;
  let fixture: ComponentFixture<DetailsEmploiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetailsEmploiComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetailsEmploiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
