import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { NavbarComponent } from "../navbar/navbar.component";
import { FooterComponent } from "../footer/footer.component";
import { SidebarComponent } from "../sidebar/sidebar.component";

@Component({
  selector: 'app-clasificacion',
  imports: [RouterLink, CommonModule, NavbarComponent, FooterComponent, SidebarComponent],
  templateUrl: './clasificacion.component.html',
  styleUrl: './clasificacion.component.scss'
})
export class ClasificacionComponent {
  clasificacion = [
    { posicion: 1, nombre: 'Real Madrid', puntos: 85, pj: 34, pg: 27, pe: 4, pp: 3, gf: 78, gc: 26 },
    { posicion: 2, nombre: 'FC Barcelona', puntos: 79, pj: 34, pg: 24, pe: 7, pp: 3, gf: 70, gc: 30 },
    { posicion: 3, nombre: 'Atlético de Madrid', puntos: 73, pj: 34, pg: 22, pe: 7, pp: 5, gf: 65, gc: 34 },
    { posicion: 4, nombre: 'Real Sociedad', puntos: 66, pj: 34, pg: 19, pe: 9, pp: 6, gf: 55, gc: 33 },
    { posicion: 5, nombre: 'Athletic Club', puntos: 61, pj: 34, pg: 18, pe: 7, pp: 9, gf: 50, gc: 36 },
    { posicion: 6, nombre: 'Villarreal', puntos: 59, pj: 34, pg: 17, pe: 8, pp: 9, gf: 54, gc: 42 },
    { posicion: 7, nombre: 'Betis', puntos: 55, pj: 34, pg: 15, pe: 10, pp: 9, gf: 49, gc: 41 },
    { posicion: 8, nombre: 'Valencia', puntos: 50, pj: 34, pg: 14, pe: 8, pp: 12, gf: 42, gc: 39 },
  ]
}
