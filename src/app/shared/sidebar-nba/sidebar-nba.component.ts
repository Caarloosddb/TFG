import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ThemeService } from '../../core/theme.service';
@Component({
  selector: 'app-sidebar-nba',
  standalone: true,
  imports: [RouterLink, CommonModule],  templateUrl: './sidebar-nba.component.html',
  styleUrl: './sidebar-nba.component.scss'
})
export class SidebarNBAComponent {
  constructor(public themeService: ThemeService) {}
}
