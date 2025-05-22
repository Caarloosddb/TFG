import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { NavbarComponent } from '../../../shared/navbar/navbar.component';
import { SidebarFutbolComponent } from '../../../shared/sidebar-futbol/sidebar-futbol.component';
import { FooterComponent } from '../../../shared/footer/footer.component';
@Component({
  selector: 'app-futbol-jugador-detalle',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    NavbarComponent,
    SidebarFutbolComponent,
    FooterComponent,
  ],
  templateUrl: './futbol-jugador-detalle.component.html',
  styleUrl: './futbol-jugador-detalle.component.scss',
})
export class FutbolJugadorDetalleComponent implements OnInit {
  playerId!: number;
  season!: number;

  player: any;
  stats: any[] = [];

  errorMessage = '';

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.playerId = +params['playerId'];
      this.season = +params['season'] || 2024;

      console.log('Params:', this.playerId, this.season);
      this.cargarJugador();
    });
  }
  //129718
  cargarJugador() {
    const headers = new HttpHeaders({
      'x-apisports-key': '4fd2512f15f791542e09ceb9073e2159',
    });
    const url = `https://v3.football.api-sports.io/players?id=${this.playerId}&season=${this.season}`;

    console.log('Requesting URL:', url);

    this.http.get<any>(url, { headers }).subscribe({
      next: (data) => {
        console.log('Datos recibidos:', data);

        if (data?.response?.length) {
          this.player = data.response[0].player;
          this.stats = data.response[0].statistics;
          this.errorMessage = '';
        } else {
          this.errorMessage = 'No hay estadisticas disponibles';
        }
      },
      error: (error) => {
        console.error('Error en la API:', error);
        this.errorMessage = 'Error al cargar los datos';
      },
    });
  }
}
