import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FutbolPartidosComponent } from './futbol-partidos.component';

describe('FutbolPartidosComponent', () => {
  let component: FutbolPartidosComponent;
  let fixture: ComponentFixture<FutbolPartidosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FutbolPartidosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FutbolPartidosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
