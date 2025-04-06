import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-partidos',
  imports: [RouterLink, CommonModule],
  templateUrl: './partidos.component.html',
  styleUrl: './partidos.component.scss'
})
export class PartidosComponent {

  partidos = [
    { local: 'Real Madrid', visitante: 'Barcelona', hora: '21:00', estado: 'Programado' },
    { local: 'Sevilla', visitante: 'Atlético', hora: '19:00', estado: 'Programado' },
    { local: 'Betis', visitante: 'Villarreal', hora: '17:30', estado: 'Finalizado' },
  ];
  
}
