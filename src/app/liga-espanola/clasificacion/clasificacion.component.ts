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
    { nombre: 'Real Madrid', puntos: 76, pg: 24, pe: 4, pp: 3 },
    { nombre: 'Barcelona', puntos: 72, pg: 22, pe: 6, pp: 3 },
    { nombre: 'Atlético', puntos: 69, pg: 21, pe: 6, pp: 5 },
  ];
  
}
