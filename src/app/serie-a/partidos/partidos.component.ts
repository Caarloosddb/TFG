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
    { local: 'Juventus', visitante: 'Napoli', hora: '18:30', estado: 'Programado' },
    { local: 'Inter', visitante: 'AC Milan', hora: '20:45', estado: 'Finalizado' }
  ];
}
