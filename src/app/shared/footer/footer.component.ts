import { Component } from '@angular/core';
import { ThemeService } from '../../core/theme.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AvisoLegalComponent } from '../aviso-legal/aviso-legal.component';
import { PrivacidadComponent } from '../privacidad/privacidad.component';
import { TerminosComponent } from '../terminos/terminos.component';


@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent {
  constructor(public themeService: ThemeService) {}
}
