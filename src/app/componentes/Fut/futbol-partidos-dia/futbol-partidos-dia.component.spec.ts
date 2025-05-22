import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FutbolPartidosDiaComponent } from './futbol-partidos-dia.component';

describe('FutbolPartidosDiaComponent', () => {
  let component: FutbolPartidosDiaComponent;
  let fixture: ComponentFixture<FutbolPartidosDiaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FutbolPartidosDiaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FutbolPartidosDiaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
