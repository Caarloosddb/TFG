import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { NavbarComponent } from '../../../shared/navbar/navbar.component';
import { FooterComponent } from '../../../shared/footer/footer.component';
import { SidebarFutbolComponent } from '../../../shared/sidebar-futbol/sidebar-futbol.component';
import { ThemeService } from '../../../core/theme.service';

@Component({
  selector: 'app-futbol-partido-detalle',
  standalone: true,
  imports: [CommonModule, RouterModule,NavbarComponent, FooterComponent, SidebarFutbolComponent],
  templateUrl: './futbol-partido-detalle.component.html',
  styleUrl: './futbol-partido-detalle.component.scss'
})
export class FutbolPartidoDetalleComponent implements OnInit{

    matchId!: number;

    matchInfo: any;
    statsInfo: any[] = [];
    teamStats: any[] = [];
    statistics: { type: string, teamA: any, teamB: any }[] = [];
    lineups: any[] = [];
    matchEvents: any[] = [];

    errorMessage = '';

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private location: Location,
    public themeService: ThemeService
  ) { }

    ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.matchId = +params['matchId'];

    console.log('Params:', this.matchId);
    this.cargarPartido();
    this.cargarEstadisticas();
    this.cargarAlineacion();
    this.cargarEventos();
    });
  }

  cargarPartido(){
  const headers = new HttpHeaders({
    'x-apisports-key': '4fd2512f15f791542e09ceb9073e2159'
  });
  const url = `https://v3.football.api-sports.io/fixtures?id=${this.matchId}`;

  this.http.get<any>(url, { headers }).subscribe({
    next: (data) => {
      console.log("Datos del partido:", data);
      const response = data?.response?.[0];
      this.matchInfo = response || null;
    },
    error: (error) => {
      console.error('Error en la API:', error);
      this.errorMessage = "Error al cargar la información del partido";
    }
  });
  }

  cargarEstadisticas() {
    const headers = new HttpHeaders({
      'x-apisports-key': '4fd2512f15f791542e09ceb9073e2159'
    });
    const url = `https://v3.football.api-sports.io/fixtures/statistics?fixture=${this.matchId}`;

    this.http.get<any>(url, { headers }).subscribe({
      next: (data) => {
        console.log("Estadísticas del partido:", data);
        this.statsInfo = data.response || [];
        this.teamStats = this.statsInfo;

        const statsA = this.teamStats[0]?.statistics || [];
        const statsB = this.teamStats[1]?.statistics || [];

        this.statistics = statsA.map((item: any) => {
          const matching = statsB.find((s: any) => s.type === item.type);
          return {
            type: item.type,
            teamA: item.value !== null ? item.value : '-',
            teamB: matching?.value !== null ? matching.value : '-'
          };
        });
      },
      error: (error) => {
        console.error('Error en la API:', error);
        this.errorMessage = "Error al cargar las estadísticas del partido";
      }
    });
  }


  cargarAlineacion() {
    const headers = new HttpHeaders({
      'x-apisports-key': '4fd2512f15f791542e09ceb9073e2159'
    });
    const url = `https://v3.football.api-sports.io/fixtures/lineups?fixture=${this.matchId}`;

    this.http.get<any>(url, { headers }).subscribe({
      next: (data) => {
        console.log("Alineaciones del partido:", data);
        this.lineups = data.response || [];
      },
      error: (error) => {
        console.error('Error cargando alineaciones:', error);
        this.errorMessage = 'Error al cargar las alineaciones';
      }
    });
  }

    cargarEventos() {
    const headers = new HttpHeaders({
      'x-apisports-key': '4fd2512f15f791542e09ceb9073e2159'
    });
    const url = `https://v3.football.api-sports.io/fixtures/events?fixture=${this.matchId}`;

    this.http.get<any>(url, { headers }).subscribe({
      next: (data) => {
        console.log("Eventos del partido:", data);
        this.matchEvents = data.response || [];
      },
      error: (error) => {
        console.error('Error cargando eventos:', error);
        this.errorMessage = 'Error al cargar los eventos';
      }
    });
  }

  getStatPercentage(valA: any, valB: any): number {
  const numA = parseFloat(valA?.toString().replace('%', '')) || 0;
  const numB = parseFloat(valB?.toString().replace('%', '')) || 0;
  const total = numA + numB;
  return total ? (numA / total) * 100 : 50;
}


  goBack(): void {
    this.location.back();
  }
}
