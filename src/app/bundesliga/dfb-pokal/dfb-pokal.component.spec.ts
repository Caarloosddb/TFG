import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DfbPokalComponent } from './dfb-pokal.component';

describe('DfbPokalComponent', () => {
  let component: DfbPokalComponent;
  let fixture: ComponentFixture<DfbPokalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DfbPokalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DfbPokalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
