import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FutbolJugadorDetalleComponent } from './futbol-jugador-detalle.component';

describe('FutbolJugadorDetalleComponent', () => {
  let component: FutbolJugadorDetalleComponent;
  let fixture: ComponentFixture<FutbolJugadorDetalleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FutbolJugadorDetalleComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FutbolJugadorDetalleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
