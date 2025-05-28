import { Component } from '@angular/core';
import { ThemeService } from '../../core/theme.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-aviso-legal',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './aviso-legal.component.html',
  styleUrl: './aviso-legal.component.scss'
})
export class AvisoLegalComponent {
  constructor(public themeService: ThemeService) { }

}
