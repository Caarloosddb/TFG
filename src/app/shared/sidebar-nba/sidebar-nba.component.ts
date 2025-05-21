// src/app/shared/sidebar-nba/sidebar-nba.component.ts
import { Component, Input }        from '@angular/core';
import { CommonModule }            from '@angular/common';
import { RouterModule }            from '@angular/router';
import { ThemeService }            from '../../core/theme.service';

@Component({
  selector: 'app-sidebar-nba',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule
  ],
  templateUrl: './sidebar-nba.component.html',
  styleUrls: ['./sidebar-nba.component.scss']
})
export class SidebarNBAComponent {
  /** 'nba' | 'euroliga' | 'acb' */
  @Input() league: 'nba' | 'euroliga' | 'acb' = 'nba';
  /** p.ej. '2023' o '2023-2024' */
  @Input() season!: string;

  constructor(public themeService: ThemeService) {}
}
