import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecruteurHeaderComponent } from './recruteur-header.component';

describe('RecruteurHeaderComponent', () => {
  let component: RecruteurHeaderComponent;
  let fixture: ComponentFixture<RecruteurHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RecruteurHeaderComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RecruteurHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
