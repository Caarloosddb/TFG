// nba-clasificacion.component.ts
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

interface Standing {
  team: { id: number; name: string; logo: string };
  conference: string;
  rank: number;
  win: number;
  loss: number;
}

@Component({
  selector: 'app-nba-clasificacion',
  standalone: true,
  imports: [
    CommonModule,
    HttpClientModule,
    NavbarComponent,
    FooterComponent,
    SidebarNBAComponent
  ],
  templateUrl: './nba-clasificacion.component.html',
  styleUrls: ['./nba-clasificacion.component.scss']
})
export class NbaClasificacionComponent implements OnInit {
  public isLoading       = false;
  public errorMessage    = '';
  public eastStandings: Standing[] = [];
  public westStandings: Standing[] = [];
  public selectedConf: 'East' | 'West' = 'East';

  public seasonRaw!: string;      // e.g. "2023"
  public seasonDisplay!: string;  // e.g. "2023-2024"

  private readonly API_KEY  = '4fd2512f15f791542e09ceb9073e2159';
  private readonly API_URL  = 'https://v1.basketball.api-sports.io';
  private readonly headers = new HttpHeaders({
    'x-apisports-key': this.API_KEY
  });

  private leagueId!: number;

  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    public themeService: ThemeService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.leagueId   = +params['leagueId'];
      this.seasonRaw  = params['season'];  // e.g. "2023"
      this.seasonDisplay = this.seasonRaw.includes('-')
        ? this.seasonRaw
        : `${this.seasonRaw}-${+this.seasonRaw + 1}`;

      this.loadStandings('standings', this.seasonRaw);
    });
  }

  public setConference(conf: 'East'|'West') {
    this.selectedConf = conf;
  }

  private loadStandings(endpoint: string, season: string): void {
    this.isLoading     = true;
    this.errorMessage  = '';
    this.eastStandings = [];
    this.westStandings = [];

    const params = new HttpParams()
      .set('league', String(this.leagueId))
      .set('season', season);

    const url = `${this.API_URL}/${endpoint}`;
    console.log(`[NBA] GET ${url}?${params.toString()}`);

    this.http.get<any>(url, { headers: this.headers, params })
      .subscribe({
        next: res => {
          console.log('[NBA] RAW STANDINGS RESPONSE', res);
          // APISports v1 nests standings two levels deep:
          const nested = res.response?.[0]?.league?.standings;
          let allRaw: any[] = [];

          if (Array.isArray(nested) && nested.length > 0) {
            // flatten two levels: [[east], [west]] → [ ... ]
            allRaw = (nested as any[][][]).flat(2);
          } else if (Array.isArray(res.response) && res.response.length) {
            // fallback if API returns a flat response array
            allRaw = res.response;
          }

          if (!allRaw.length) {
            this.errorMessage = 'No hay datos de clasificación para esta temporada.';
            this.isLoading    = false;
            return;
          }

          // Map and split by conference
          const mapped = allRaw.map(s => ({
            team:       { id: s.team.id, name: s.team.name, logo: s.team.logo },
            conference: s.conference,
            rank:       s.rank,
            win:        s.win,
            loss:       s.loss
          }));

          this.eastStandings = mapped
            .filter(s => s.conference === 'East')
            .sort((a, b) => a.rank - b.rank);

          this.westStandings = mapped
            .filter(s => s.conference === 'West')
            .sort((a, b) => a.rank - b.rank);

          this.isLoading = false;
        },
        error: err => {
          console.error('[NBA] Error Api Standings:', err);
          this.errorMessage = 'No se pudo cargar la clasificación.';
          this.isLoading    = false;
        }
      });
  }
}
