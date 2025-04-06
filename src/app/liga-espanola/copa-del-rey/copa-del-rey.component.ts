import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-copa-del-rey',
  imports: [RouterLink, CommonModule],
  standalone: true,
  templateUrl: './copa-del-rey.component.html',
  styleUrl: './copa-del-rey.component.scss'
})
export class CopaDelReyComponent {

  copa = [
    { local: 'Real Sociedad', visitante: 'Athletic Club', fecha: '12/05/2025', hora: '20:00', estado: 'Programado' },
    { local: 'Valencia', visitante: 'Sevilla', fecha: '13/05/2025', hora: '21:30', estado: 'Programado' }
  ];

}
