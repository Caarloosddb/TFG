import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FutbolEquipoDetalleComponent } from './futbol-equipo-detalle.component';

describe('FutbolEquipoDetalleComponent', () => {
  let component: FutbolEquipoDetalleComponent;
  let fixture: ComponentFixture<FutbolEquipoDetalleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FutbolEquipoDetalleComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FutbolEquipoDetalleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
