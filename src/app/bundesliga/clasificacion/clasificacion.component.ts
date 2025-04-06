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
    { nombre: 'Bayern Múnich', puntos: 78, pg: 25, pe: 3, pp: 3 },
    { nombre: 'Dortmund', puntos: 74, pg: 23, pe: 5, pp: 3 },
    { nombre: 'Leverkusen', puntos: 71, pg: 22, pe: 5, pp: 4 },
  ];
}
