import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SidebarNBAComponent } from './sidebar-nba.component';

describe('SidebarNBAComponent', () => {
  let component: SidebarNBAComponent;
  let fixture: ComponentFixture<SidebarNBAComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SidebarNBAComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SidebarNBAComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
