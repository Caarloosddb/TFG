import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NbaClasificacionComponent } from './nba-clasificacion.component';

describe('NbaClasificacionComponent', () => {
  let component: NbaClasificacionComponent;
  let fixture: ComponentFixture<NbaClasificacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NbaClasificacionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NbaClasificacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
