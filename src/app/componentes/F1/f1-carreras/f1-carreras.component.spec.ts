import { ComponentFixture, TestBed } from '@angular/core/testing';

import { F1CarrerasComponent } from './f1-carreras.component';

describe('F1CarrerasComponent', () => {
  let component: F1CarrerasComponent;
  let fixture: ComponentFixture<F1CarrerasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [F1CarrerasComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(F1CarrerasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
