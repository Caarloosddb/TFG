import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { NavbarComponent } from '../../../shared/navbar/navbar.component';
import { SidebarFutbolComponent } from '../../../shared/sidebar-futbol/sidebar-futbol.component';
import { FooterComponent } from '../../../shared/footer/footer.component';
import { ThemeService } from '../../../core/theme.service';

@Component({
  selector: 'app-futbol-equipo-detalle',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    NavbarComponent,
    SidebarFutbolComponent,
    FooterComponent
  ],
  templateUrl: './futbol-equipo-detalle.component.html',
  styleUrls: ['./futbol-equipo-detalle.component.scss']
})
export class FutbolEquipoDetalleComponent implements OnInit {
  leagueId!: number;
  season!: number;
  teamId!: number;

  teamInfo: any;
  venueInfo: any;
  squad: any[] = [];
  statistics: any;

  errorMessage = '';

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private location: Location,
    public themeService: ThemeService
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.teamId = +params['teamId'];
      this.leagueId = +params['leagueId'];
      this.season = +params['season'] || 2024;

    console.log('Params:', this.leagueId, this.season, this.teamId);
    this.cargarEquipo();
    this.cargarPlantilla();
    this.cargarEstadisticas();
    });
  }

cargarEquipo() {
  const headers = new HttpHeaders({
    'x-apisports-key': '4fd2512f15f791542e09ceb9073e2159'
  });
  const url = `https://v3.football.api-sports.io/teams?id=${this.teamId}`;

  this.http.get<any>(url, { headers }).subscribe({
    next: (data) => {
      console.log('Requesting URL:', url);
      console.log("Datos del equipo:", data);
      const response = data?.response?.[0];
      this.teamInfo = response?.team || null;
      this.venueInfo = response?.venue || null;
    },
    error: (error) => {
      console.error('Error en la API (equipo):', error);
      this.errorMessage = "Error al cargar la información del equipo";
    }
  });
}

  cargarPlantilla() {
    const headers = new HttpHeaders({
      'x-apisports-key': '4fd2512f15f791542e09ceb9073e2159'
    });
    const url = `https://v3.football.api-sports.io/players/squads?team=${this.teamId}`;

    this.http.get<any>(url, { headers }).subscribe({
      next: (data) => {
        console.log("Plantilla del equipo:", data);
        this.squad = data?.response?.[0]?.players || [];
      },
      error: (error) => {
        console.error('Error en la API (plantilla):', error);
        this.errorMessage = "Error al cargar la plantilla";
      }
    });
  }

  cargarEstadisticas() {
    const headers = new HttpHeaders({
      'x-apisports-key': '4fd2512f15f791542e09ceb9073e2159'
    });
    const url = `https://v3.football.api-sports.io/teams/statistics?league=${this.leagueId}&season=${this.season}&team=${this.teamId}`;

    this.http.get<any>(url, { headers }).subscribe({
      next: (data) => {
        console.log("Estadísticas del equipo:", data);
        this.statistics = data?.response || null;
      },
      error: (error) => {
        console.error('Error en la API (estadísticas):', error);
        this.errorMessage = "Error al cargar las estadísticas";
      }
    });
  }

  goBack(): void {
    this.location.back();
  }
}
