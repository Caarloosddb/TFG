// sidebar-nba.component.ts
import { Component }       from '@angular/core';
import { CommonModule }    from '@angular/common';
import { RouterLink }      from '@angular/router';
import { ThemeService }    from '../../core/theme.service';

@Component({
  selector: 'app-sidebar-nba',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './sidebar-nba.component.html',
  styleUrls: ['./sidebar-nba.component.scss']
})
export class SidebarNBAComponent {
  constructor(public themeService: ThemeService) {}
}
