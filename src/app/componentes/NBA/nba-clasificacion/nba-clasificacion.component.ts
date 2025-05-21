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

interface StandingEntry {
  rank: number;
  team: {
    id: number;
    name: string;
    logo: string;
  };
  points: number;
  all: {
    played: number;
    win: number;
    lose: number;
  };
}

interface League {
  key: 'nba' | 'euroliga' | 'acb';
  name: string;
  id: number;
}

@Component({
  selector: 'app-nba-clasificacion',
  standalone: true,
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    NavbarComponent,
    SidebarNBAComponent,
    FooterComponent
  ],
  templateUrl: './nba-clasificacion.component.html',
  styleUrls: ['./nba-clasificacion.component.scss']
})
export class NbaClasificacionComponent implements OnInit {
  public isLoading     = false;
  public errorMessage  = '';
  public standings     : StandingEntry[] = [];

  private readonly API_KEY  = '4fd2512f15f791542e09ceb9073e2159';
  private readonly API_URL  = 'https://v1.basketball.api-sports.io';
  private readonly headers  = new HttpHeaders({ 'x-apisports-key': this.API_KEY });

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
    this.loadStandings();
  }

  selectLeague(league: League): void {
    if (league.key === this.selectedLeague.key) return;
    this.selectedLeague = league;
    this.loadStandings();
  }

  loadStandings(): void {
    this.isLoading    = true;
    this.errorMessage = '';
    this.standings    = [];

    const season = this.seasonRaw.includes('-')
      ? this.seasonRaw
      : `${this.seasonRaw}-${Number(this.seasonRaw) + 1}`;

    const params = new HttpParams()
      .set('league', String(this.selectedLeague.id))
      .set('season', season);

    this.http.get<{ response: Array<{ league: { standings: StandingEntry[][] } }> }>(
      `${this.API_URL}/standings`,
      { headers: this.headers, params }
    ).subscribe({
      next: res => {
        // la API devuelve un array de grupos de clasificaciones; tomamos el primero
        this.standings = res.response[0].league.standings[0];
        this.isLoading = false;
      },
      error: err => {
        console.error(`[${this.selectedLeague.name}] Error API:`, err);
        this.errorMessage = `No se pudo cargar la clasificación de ${this.selectedLeague.name}.`;
        this.isLoading = false;
      }
    });
  }
}
