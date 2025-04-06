import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CopaItaliaComponent } from './copa-italia.component';

describe('CopaItaliaComponent', () => {
  let component: CopaItaliaComponent;
  let fixture: ComponentFixture<CopaItaliaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CopaItaliaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CopaItaliaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
