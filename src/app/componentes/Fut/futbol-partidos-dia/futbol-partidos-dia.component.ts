import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ThemeService } from '../../../core/theme.service';

import { NavbarComponent } from '../../../shared/navbar/navbar.component';
import { FooterComponent } from '../../../shared/footer/footer.component';
import { SidebarFutbolComponent } from '../../../shared/sidebar-futbol/sidebar-futbol.component';

@Component({
  selector: 'app-futbol-partidos-dia',
  standalone: true,
  imports: [ CommonModule, NavbarComponent, FooterComponent, SidebarFutbolComponent, FormsModule, RouterModule ],
  templateUrl: './futbol-partidos-dia.component.html',
  styleUrl: './futbol-partidos-dia.component.scss'
})
export class FutbolPartidosDiaComponent {
  partidos: any[] = [];
  errorMessage: string = '';
  fechaSeleccionada: string = '';

  constructor(private http: HttpClient, public themeService: ThemeService) {}

  ngOnInit(): void {
    const hoy = new Date().toISOString().split('T')[0];
    this.fechaSeleccionada = hoy;
    this.cargarPartidosDelDia();
  }

  onFechaCambio() {
    this.cargarPartidosDelDia();
  }

  cargarPartidosDelDia() {
    const headers = new HttpHeaders({
      'x-apisports-key': '4fd2512f15f791542e09ceb9073e2159'
    });

    const url = `https://v3.football.api-sports.io/fixtures?date=${this.fechaSeleccionada}`;

    console.log('Solicitando partidos del día:', url);

    this.http.get<any>(url, { headers }).subscribe({
      next: (data) => {
        console.log("Datos recibidos:", data);

        if (data?.response?.length) {
          this.partidos = data.response;
          this.errorMessage = '';
        } else {
          this.errorMessage = "No hay partidos programados para hoy.";
          this.partidos = [];
        }
      },
      error: (error) => {
        console.error('Error al cargar los partidos:', error);
        this.errorMessage = "Error al cargar los datos.";
        this.partidos = [];
      }
    });
  }
}