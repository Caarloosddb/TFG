import { Component } from '@angular/core';
import { NavbarComponent } from "../../shared/navbar/navbar.component";
import { FooterComponent } from "../../shared/footer/footer.component";
import { SidebarFutbolComponent } from '../../shared/sidebar-futbol/sidebar-futbol.component';
@Component({
  selector: 'app-equipos',
  imports: [NavbarComponent, FooterComponent, SidebarFutbolComponent],
  templateUrl: './equipos.component.html',
  styleUrl: './equipos.component.scss'
})
export class EquiposComponent {

}
