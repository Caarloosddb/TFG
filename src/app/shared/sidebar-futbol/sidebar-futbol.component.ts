import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ThemeService } from '../../core/theme.service';
@Component({
  selector: 'app-sidebar-futbol',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './sidebar-futbol.component.html',
  styleUrl: './sidebar-futbol.component.scss'
})
export class SidebarFutbolComponent {
    constructor(public themeService: ThemeService) {}
}
