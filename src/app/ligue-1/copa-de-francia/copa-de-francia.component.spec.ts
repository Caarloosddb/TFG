import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CopaDeFranciaComponent } from './copa-de-francia.component';

describe('CopaDeFranciaComponent', () => {
  let component: CopaDeFranciaComponent;
  let fixture: ComponentFixture<CopaDeFranciaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CopaDeFranciaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CopaDeFranciaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
