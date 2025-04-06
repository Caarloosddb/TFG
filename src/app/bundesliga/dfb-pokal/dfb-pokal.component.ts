import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-dfb-pokal',
  imports: [RouterLink, CommonModule],
  standalone: true,
  templateUrl: './dfb-pokal.component.html',
  styleUrl: './dfb-pokal.component.scss'
})
export class DfbPokalComponent {
  partidos = [
    { local: 'Bayern Múnich', visitante: 'RB Leipzig', fecha: '14/05/2025', hora: '20:00', estado: 'Programado' },
    { local: 'Dortmund', visitante: 'Eintracht Frankfurt', fecha: '15/05/2025', hora: '19:30', estado: 'Programado' }
  ];
}
