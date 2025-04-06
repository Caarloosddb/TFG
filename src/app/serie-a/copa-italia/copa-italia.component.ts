import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-copa-italia',
  imports: [RouterLink, CommonModule],
  standalone: true,
  templateUrl: './copa-italia.component.html',
  styleUrl: './copa-italia.component.scss'
})
export class CopaItaliaComponent {
  partidos = [
    { local: 'Juventus', visitante: 'Napoli', fecha: '16/05/2025', hora: '21:00', estado: 'Programado' },
    { local: 'Inter', visitante: 'AC Milan', fecha: '17/05/2025', hora: '20:45', estado: 'Programado' }
  ];

}
