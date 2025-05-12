import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SidebarF1Component } from './sidebar-f1.component';

describe('SidebarF1Component', () => {
  let component: SidebarF1Component;
  let fixture: ComponentFixture<SidebarF1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SidebarF1Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SidebarF1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
