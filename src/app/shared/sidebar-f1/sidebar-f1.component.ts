import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ThemeService } from '../../core/theme.service';
@Component({
  selector: 'app-sidebar-f1',
  standalone: true,
  imports: [RouterLink, CommonModule],  templateUrl: './sidebar-f1.component.html',
  styleUrl: './sidebar-f1.component.scss'
})
export class SidebarF1Component {
  constructor(public themeService: ThemeService) {}
}
