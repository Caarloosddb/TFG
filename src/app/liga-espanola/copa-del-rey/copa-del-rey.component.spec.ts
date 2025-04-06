import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CopaDelReyComponent } from './copa-del-rey.component';

describe('CopaDelReyComponent', () => {
  let component: CopaDelReyComponent;
  let fixture: ComponentFixture<CopaDelReyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CopaDelReyComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CopaDelReyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
