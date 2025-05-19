import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FutbolPartidoDetalleComponent } from './futbol-partido-detalle.component';

describe('FutbolPartidoDetalleComponent', () => {
  let component: FutbolPartidoDetalleComponent;
  let fixture: ComponentFixture<FutbolPartidoDetalleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FutbolPartidoDetalleComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FutbolPartidoDetalleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
