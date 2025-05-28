import { Component } from '@angular/core';
import { ThemeService } from '../../core/theme.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-privacidad',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './privacidad.component.html',
  styleUrl: './privacidad.component.scss'
})
export class PrivacidadComponent {
  constructor(public themeService: ThemeService) {}
}
