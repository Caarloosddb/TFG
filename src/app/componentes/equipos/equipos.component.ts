import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NavbarComponent } from "../../navbar/navbar.component";
import { FooterComponent } from "../../footer/footer.component";
import { SidebarComponent } from "../../sidebar/sidebar.component";

@Component({
  selector: 'app-equipos',
  imports: [RouterLink, NavbarComponent, FooterComponent, SidebarComponent],
  templateUrl: './equipos.component.html',
  styleUrl: './equipos.component.scss'
})
export class EquiposComponent {

}
