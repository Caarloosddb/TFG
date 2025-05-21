// src/app/componentes/competiciones/competiciones-partidos/competiciones-partidos.component.ts
import { Component, OnInit }           from '@angular/core';
import {
  HttpClient,
  HttpHeaders,
  HttpParams,
  HttpClientModule
} from '@angular/common/http';
import { CommonModule }                from '@angular/common';
import { FormsModule }                 from '@angular/forms';
import { NavbarComponent }             from '../../../shared/navbar/navbar.component';
import { SidebarNBAComponent }         from '../../../shared/sidebar-nba/sidebar-nba.component';
import { FooterComponent }             from '../../../shared/footer/footer.component';
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

interface League {
  key: 'nba' | 'euroliga' | 'acb';
  name: string;
  id: number;
}

@Component({
  selector: 'app-nba-partidos',
  standalone: true,
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    NavbarComponent,
    SidebarNBAComponent,
    FooterComponent
  ],
  templateUrl: './nba-partidos.component.html',
  styleUrls: ['./nba-partidos.component.scss']
})
export class NbaPartidosComponent implements OnInit {
  public isLoading    = false;
  public errorMessage = '';
  private games: Game[]           = [];
  public groupedGames: GameGroup[] = [];

  private readonly API_KEY  = '4fd2512f15f791542e09ceb9073e2159';
  private readonly API_URL  = 'https://v1.basketball.api-sports.io';
  private readonly headers = new HttpHeaders({ 'x-apisports-key': this.API_KEY });

  public leagues: League[] = [
    { key: 'nba',      name: 'NBA',      id: 1 },
    { key: 'euroliga', name: 'Euroliga', id: 2 },
    { key: 'acb',      name: 'ACB',      id: 3 }
  ];
  public selectedLeague: League = this.leagues[0];

  public seasonRaw = '2023';

  constructor(
    private http: HttpClient,
    public themeService: ThemeService
  ) {}

  ngOnInit(): void {
    this.loadData();
  }

  selectLeague(league: League): void {
    if (league.key === this.selectedLeague.key) return;
    this.selectedLeague = league;
    this.loadData();
  }

  public loadData(): void {
    this.isLoading    = true;
    this.errorMessage = '';
    this.groupedGames = [];

    const season = this.seasonRaw.includes('-')
      ? this.seasonRaw
      : `${this.seasonRaw}-${Number(this.seasonRaw) + 1}`;

    const params = new HttpParams()
      .set('league', String(this.selectedLeague.id))
      .set('season', season);

    this.http.get<{ response: Game[] }>(
      `${this.API_URL}/games`,
      { headers: this.headers, params }
    ).subscribe({
      next: res => {
        this.games = res.response;
        this.groupByDate();
        this.isLoading = false;
      },
      error: err => {
        console.error(`[${this.selectedLeague.name}] Error API:`, err);
        this.errorMessage = `No se pudieron cargar los partidos de ${this.selectedLeague.name}.`;
        this.isLoading    = false;
      }
    });
  }

  private groupByDate(): void {
    const map: Record<string, Game[]> = {};
    for (const g of this.games) {
      const day = g.date.split('T')[0];
      (map[day] ||= []).push(g);
    }
    this.groupedGames = Object.keys(map)
      .sort()
      .map(date => ({ date, games: map[date] }));
  }
}
