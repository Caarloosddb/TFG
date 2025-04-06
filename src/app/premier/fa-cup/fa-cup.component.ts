import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-fa-cup',
  imports: [RouterLink, CommonModule],
  standalone: true,
  templateUrl: './fa-cup.component.html',
  styleUrl: './fa-cup.component.scss'
})
export class FaCupComponent {
  partidos = [
    { local: 'Arsenal', visitante: 'Manchester United', fecha: '15/05/2025', hora: '18:30', estado: 'Programado' },
    { local: 'Chelsea', visitante: 'Liverpool', fecha: '16/05/2025', hora: '20:45', estado: 'Programado' }
  ];
}
