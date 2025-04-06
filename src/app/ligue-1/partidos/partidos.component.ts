import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-partidos',
  imports: [RouterLink, CommonModule],
  standalone: true,
  templateUrl: './partidos.component.html',
  styleUrl: './partidos.component.scss'
})
export class PartidosComponent {
  partidos = [
    { local: 'PSG', visitante: 'Lyon', hora: '21:00', estado: 'Programado' },
    { local: 'Marseille', visitante: 'Rennes', hora: '19:30', estado: 'Finalizado' }
  ];
}
