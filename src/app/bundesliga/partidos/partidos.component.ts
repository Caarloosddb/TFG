import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-partidos',
  imports: [RouterLink, CommonModule],
  templateUrl: './partidos.component.html',
  styleUrl: './partidos.component.scss'
})
export class PartidosComponent {
  partidos = [
    { local: 'Bayern Múnich', visitante: 'Borussia Dortmund', hora: '18:30', estado: 'Programado' },
    { local: 'RB Leipzig', visitante: 'Bayer Leverkusen', hora: '20:45', estado: 'Finalizado' }
  ];
}
