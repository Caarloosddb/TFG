import { ComponentFixture, TestBed } from '@angular/core/testing';

import { F1ClasificacionComponent } from './f1-clasificacion.component';

describe('F1ClasificacionComponent', () => {
  let component: F1ClasificacionComponent;
  let fixture: ComponentFixture<F1ClasificacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [F1ClasificacionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(F1ClasificacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
