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
    { local: 'Manchester City', visitante: 'Arsenal', hora: '18:30', estado: 'Programado' },
    { local: 'Liverpool', visitante: 'Chelsea', hora: '20:45', estado: 'Finalizado' }
  ];
}
