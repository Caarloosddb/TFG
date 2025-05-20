// nba-partidos.component.ts
import { Component, OnInit }           from '@angular/core';
import {
  HttpClient,
  HttpHeaders,
  HttpParams,
  HttpClientModule
} from '@angular/common/http';
import { CommonModule }                from '@angular/common';
import { ActivatedRoute, Params }      from '@angular/router';

import { NavbarComponent }             from '../../../shared/navbar/navbar.component';
import { FooterComponent }             from '../../../shared/footer/footer.component';
import { SidebarNBAComponent }         from '../../../shared/sidebar-nba/sidebar-nba.component';
import { ThemeService }                from '../../../core/theme.service';

interface Game {
  date: string;
  teams: {
    home: { id: number; name: string; logo: string; winner: boolean };
    away: { id: number; name: string; logo: string; winner: boolean };
  };
  scores: {
    home: { total: number };
    away: { total: number };
  };
  status: { long: string };
}

interface GameGroup {
  date: string;
  games: Game[];
}

@Component({
  selector: 'app-nba-partidos',
  standalone: true,
  imports: [
    CommonModule,
    HttpClientModule,
    NavbarComponent,
    FooterComponent,
    SidebarNBAComponent
  ],
  templateUrl: './nba-partidos.component.html',
  styleUrls: ['./nba-partidos.component.scss']
})
export class NbaPartidosComponent implements OnInit {
  public isLoading    = false;
  public errorMessage = '';
  private games: Game[]         = [];
  public groupedGames: GameGroup[] = [];

  private readonly API_KEY  = '4fd2512f15f791542e09ceb9073e2159';
  private readonly API_URL  = 'https://v1.basketball.api-sports.io';
  private readonly headers = new HttpHeaders({
    'x-apisports-key': this.API_KEY
  });

  private leagueId!: number;
  private seasonRaw!: string;

  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    public themeService: ThemeService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      let endpoint = params['endpoint'] || 'games';
      if (endpoint === 'fixtures')     endpoint = 'games';
      if (endpoint === 'clasificacion') endpoint = 'standings';

      this.leagueId  = +params['leagueId'];
      this.seasonRaw = params['season'];

      // Convertimos "2024" → "2024-2025" si hace falta
      const seasonString = this.seasonRaw.includes('-')
        ? this.seasonRaw
        : `${this.seasonRaw}-${Number(this.seasonRaw) + 1}`;

      this.loadData(endpoint, seasonString);
    });
  }

  /** Público para poder recargar desde la UI si se desea */
  public loadData(endpoint: string, season: string): void {
    this.isLoading    = true;
    this.errorMessage = '';
    this.groupedGames = [];

    const params = new HttpParams()
      .set('league', String(this.leagueId))
      .set('season', season);

    const url = `${this.API_URL}/${endpoint}`;

    this.http.get<{ response: Game[] }>(url, {
      headers: this.headers,
      params
    }).subscribe({
      next: res => {
        this.games = res.response;
        this.groupByDate();
        this.isLoading = false;
      },
      error: err => {
        console.error('[NBA] Error API:', err);
        this.errorMessage = 'No se pudieron cargar los partidos.';
        this.isLoading    = false;
      }
    });
  }

  /** Agrupa this.games en this.groupedGames ordenado por fecha */
  private groupByDate(): void {
    const map: Record<string, Game[]> = {};

    for (const g of this.games) {
      const day = g.date.split('T')[0];
      if (!map[day]) map[day] = [];
      map[day].push(g);
    }

    this.groupedGames = Object.keys(map)
      .sort()
      .map(date => ({ date, games: map[date] }));
  }
}
