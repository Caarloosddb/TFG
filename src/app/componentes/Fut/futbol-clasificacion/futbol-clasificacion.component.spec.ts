import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FutbolClasificacionComponent } from './futbol-clasificacion.component';

describe('FutbolClasificacionComponent', () => {
  let component: FutbolClasificacionComponent;
  let fixture: ComponentFixture<FutbolClasificacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FutbolClasificacionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FutbolClasificacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
