import { Component } from '@angular/core';
import { NavbarComponent } from '../../../shared/navbar/navbar.component';
import { FooterComponent } from '../../../shared/footer/footer.component';
import { SidebarNBAComponent } from '../../../shared/sidebar-nba/sidebar-nba.component';

@Component({
  selector: 'app-nba-clasificacion',
  imports: [NavbarComponent, FooterComponent, SidebarNBAComponent],
  templateUrl: './nba-clasificacion.component.html',
  styleUrl: './nba-clasificacion.component.scss'
})
export class NbaClasificacionComponent {

}
