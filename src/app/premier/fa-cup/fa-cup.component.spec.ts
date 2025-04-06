import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FaCupComponent } from './fa-cup.component';

describe('FaCupComponent', () => {
  let component: FaCupComponent;
  let fixture: ComponentFixture<FaCupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FaCupComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FaCupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
