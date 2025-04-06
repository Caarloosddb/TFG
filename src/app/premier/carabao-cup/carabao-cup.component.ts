import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-carabao-cup',
  imports: [RouterLink, CommonModule],
  templateUrl: './carabao-cup.component.html',
  styleUrl: './carabao-cup.component.scss'
})
export class CarabaoCupComponent {
  partidos = [
    { local: 'Newcastle', visitante: 'Manchester United', fecha: '20/05/2025', hora: '21:00', estado: 'Programado' },
    { local: 'Aston Villa', visitante: 'Brighton', fecha: '21/05/2025', hora: '19:30', estado: 'Programado' }
  ];
}
