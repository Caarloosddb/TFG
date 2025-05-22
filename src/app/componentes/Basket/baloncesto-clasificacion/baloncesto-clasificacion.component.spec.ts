import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BaloncestoClasificacionComponent } from './baloncesto-clasificacion.component';

describe('BaloncestoClasificacionComponent', () => {
  let component: BaloncestoClasificacionComponent;
  let fixture: ComponentFixture<BaloncestoClasificacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BaloncestoClasificacionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BaloncestoClasificacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
