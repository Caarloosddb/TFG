import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NbaPartidosComponent } from './nba-partidos.component';

describe('NbaPartidosComponent', () => {
  let component: NbaPartidosComponent;
  let fixture: ComponentFixture<NbaPartidosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NbaPartidosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NbaPartidosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
