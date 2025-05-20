import { Component } from '@angular/core';
import { NavbarComponent } from '../../../shared/navbar/navbar.component';
import { FooterComponent } from '../../../shared/footer/footer.component';
import { SidebarFutbolComponent } from '../../../shared/sidebar-futbol/sidebar-futbol.component';
import { ThemeService } from '../../../core/theme.service';

@Component({
  selector: 'app-futbol-partido-detalle',
  standalone: true,
  imports: [NavbarComponent, FooterComponent, SidebarFutbolComponent],
  templateUrl: './futbol-partido-detalle.component.html',
  styleUrl: './futbol-partido-detalle.component.scss'
})
export class FutbolPartidoDetalleComponent {

}
