import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-clasificacion',
  imports: [RouterLink, CommonModule],
  standalone: true,
  templateUrl: './clasificacion.component.html',
  styleUrl: './clasificacion.component.scss'
})
export class ClasificacionComponent {
  clasificacion = [
    { nombre: 'Arsenal', puntos: 75, pg: 23, pe: 6, pp: 3 },
    { nombre: 'Man City', puntos: 73, pg: 22, pe: 7, pp: 3 },
    { nombre: 'Liverpool', puntos: 70, pg: 21, pe: 7, pp: 4 },
  ];
}
