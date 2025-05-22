import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BaloncestoPartidosComponent } from './baloncesto-partidos.component';

describe('BaloncestoPartidosComponent', () => {
  let component: BaloncestoPartidosComponent;
  let fixture: ComponentFixture<BaloncestoPartidosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BaloncestoPartidosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BaloncestoPartidosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
