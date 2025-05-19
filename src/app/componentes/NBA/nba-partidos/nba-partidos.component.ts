import { Component } from '@angular/core';
import { NavbarComponent } from '../../../shared/navbar/navbar.component';
import { FooterComponent } from '../../../shared/footer/footer.component';
import { SidebarNBAComponent } from '../../../shared/sidebar-nba/sidebar-nba.component';

@Component({
  selector: 'app-nba-partidos',
  imports: [NavbarComponent, FooterComponent, SidebarNBAComponent],
  templateUrl: './nba-partidos.component.html',
  styleUrl: './nba-partidos.component.scss'
})
export class NbaPartidosComponent {

}
