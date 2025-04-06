import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-copa-de-francia',
  imports: [RouterLink, CommonModule],
  standalone: true,
  templateUrl: './copa-de-francia.component.html',
  styleUrl: './copa-de-francia.component.scss'
})
export class CopaDeFranciaComponent {
  partidos = [
    { local: 'PSG', visitante: 'Lyon', fecha: '18/05/2025', hora: '21:00', estado: 'Programado' },
    { local: 'Marseille', visitante: 'Rennes', fecha: '19/05/2025', hora: '18:30', estado: 'Programado' }
  ];
}
