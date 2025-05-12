import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SidebarFutbolComponent } from './sidebar-futbol.component';

describe('SidebarFutbolComponent', () => {
  let component: SidebarFutbolComponent;
  let fixture: ComponentFixture<SidebarFutbolComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SidebarFutbolComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SidebarFutbolComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
