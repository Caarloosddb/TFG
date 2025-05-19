import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ActivatedRoute }          from '@angular/router';
import { Location }                from '@angular/common';

import { CommonModule }        from '@angular/common';
import { RouterModule }        from '@angular/router';
import { HttpClientModule }    from '@angular/common/http';

import { NavbarComponent }         from '../../../shared/navbar/navbar.component';
import { SidebarFutbolComponent }  from '../../../shared/sidebar-futbol/sidebar-futbol.component';
import { FooterComponent }         from '../../../shared/footer/footer.component';

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
  venue: any   = null;
  stats: any   = null;
  players: any[] = [];

  error = '';

  private headers = new HttpHeaders({
    'x-apisports-key': '56025bbd56166f8696e74b9786336369'
  });

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private location: Location
  ) {}

  ngOnInit(): void {
    const params = this.route.snapshot.paramMap;
    this.leagueId = Number(params.get('leagueId'));
    this.season   = Number(params.get('season'));
    this.teamId   = Number(params.get('teamId'));

    console.log('Params:', this.leagueId, this.season, this.teamId);

    this.fetchTeamInfo();
    this.fetchStats();
    this.fetchPlayers();
  }

  private fetchTeamInfo(): void {
    const url = `https://v3.football.api-sports.io/teams?id=${this.teamId}`;
    console.log('Team URL →', url);
    this.http.get<any>(url, { headers: this.headers }).subscribe({
      next: data => {
        console.log('Team data raw:', data);
        const item = data.response?.[0];
        if (!item) {
          this.error = 'Equipo no encontrado.';
          return;
        }
        this.equipo = item.team;
        this.venue  = item.venue;
      },
      error: err => {
        console.error('Error loading team:', err);
        this.error = `Error al cargar datos del equipo (${err.status})`;
      }
    });
  }

  private fetchStats(): void {
    const url = `https://v3.football.api-sports.io/teams/statistics?league=${this.leagueId}&season=${this.season}&team=${this.teamId}`;
    console.log('Stats URL →', url);
    this.http.get<any>(url, { headers: this.headers }).subscribe({
      next: data => {
        console.log('Stats data raw:', data);
        const resp = data.response?.[0];
        // Si viene anidado bajo .statistics, úsalo; si no, toma todo resp
        this.stats = resp?.statistics ?? resp ?? null;
        console.log('Parsed stats:', this.stats);
      },
      error: err => {
        console.error('Error loading stats:', err);
      }
    });
  }

  private fetchPlayers(): void {
    const url = `https://v3.football.api-sports.io/players/squads?team=${this.teamId}`;
    console.log('Players URL →', url);
    this.http.get<any>(url, { headers: this.headers }).subscribe({
      next: data => {
        console.log('Players data raw:', data);
        this.players = data.response?.[0]?.players || [];
      },
      error: err => {
        console.error('Error loading players:', err);
      }
    });
  }

  goBack(): void {
    this.location.back();
  }
}
