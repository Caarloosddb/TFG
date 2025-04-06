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
    { nombre: 'PSG', puntos: 80, pg: 25, pe: 5, pp: 2 },
    { nombre: 'Marseille', puntos: 74, pg: 23, pe: 5, pp: 4 },
    { nombre: 'Lyon', puntos: 69, pg: 21, pe: 6, pp: 5 },
  ];
}
