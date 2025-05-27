import { Component } from '@angular/core';
import { ThemeService } from '../../core/theme.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-terminos',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './terminos.component.html',
  styleUrl: './terminos.component.scss'
})
export class TerminosComponent {
  constructor(public themeService: ThemeService) {}
}
