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
    { nombre: 'Inter', puntos: 77, pg: 24, pe: 5, pp: 3 },
    { nombre: 'Napoli', puntos: 73, pg: 23, pe: 4, pp: 5 },
    { nombre: 'Juventus', puntos: 70, pg: 22, pe: 4, pp: 6 },
  ];
}
