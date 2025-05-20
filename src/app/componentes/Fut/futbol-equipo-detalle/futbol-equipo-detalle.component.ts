import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { NavbarComponent } from '../../../shared/navbar/navbar.component';
import { SidebarFutbolComponent } from '../../../shared/sidebar-futbol/sidebar-futbol.component';
import { FooterComponent } from '../../../shared/footer/footer.component';

@Component({
  selector: 'app-futbol-equipo-detalle',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    HttpClientModule,
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

  equipo: any = null;
  venue: any = null;
  players: any[] = [];
  stats: any = null;

  error = '';

  private headers = new HttpHeaders({
    'x-apisports-key': '4fd2512f15f791542e09ceb9073e2159'
  });

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private location: Location
  ) { }

  ngOnInit(): void {
    const p = this.route.snapshot.paramMap;
    this.leagueId = +p.get('leagueId')!;
    this.season = +p.get('season')!;
    this.teamId = +p.get('teamId')!;

    console.log('Params:', this.leagueId, this.season, this.teamId);
    this.fetchTeamInfo();
    this.fetchPlayers();
    this.fetchStats();
  }

  private fetchTeamInfo(): void {
    const url = `https://v3.football.api-sports.io/teams?id=${this.teamId}`;
    this.http.get<any>(url, { headers: this.headers }).subscribe({
      next: data => {
        const resp = data.response?.[0]?.team;
        if (resp) {
          this.equipo = resp;           // datos del equipo
          this.venue = resp.venue;    // aquí viene el estadio
        } else {
          this.error = 'Equipo no encontrado.';
        }
      },
      error: err => {
        this.error = `Error al cargar datos del equipo (${err.status})`;
      }
    });
  }

  private fetchPlayers(): void {
    const url = `https://v3.football.api-sports.io/players/squads?team=${this.teamId}`;
    console.log('Players URL →', url);
    this.http.get<any>(url, { headers: this.headers }).subscribe({
      next: data => {
        console.log('Players data:', data);
        this.players = data.response?.[0]?.players || [];
      },
      error: err => console.error('Players error:', err)
    });
  }

  private fetchStats(): void {
    const url = `https://v3.football.api-sports.io/teams/statistics?league=${this.leagueId}&season=${this.season}&team=${this.teamId}`;
    this.http.get<any>(url, { headers: this.headers }).subscribe({
      next: data => {
        const block = data.response?.[0]?.statistics;
        this.stats = block || null;
      },
      error: err => console.error('Stats error', err)
    });
  }

  goBack(): void {
    this.location.back();
  }
}
