import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarabaoCupComponent } from './carabao-cup.component';

describe('CarabaoCupComponent', () => {
  let component: CarabaoCupComponent;
  let fixture: ComponentFixture<CarabaoCupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CarabaoCupComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CarabaoCupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
