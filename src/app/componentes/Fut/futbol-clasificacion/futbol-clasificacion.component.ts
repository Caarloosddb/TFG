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

interface RankConfig {
  championsEnd: number;
  europaEnd: number;
  conferenceEnd: number;
  relegationCount: number;
}

@Component({
  selector: 'app-futbol-clasificacion',
  standalone: true,
  imports: [ CommonModule, NavbarComponent, FooterComponent, SidebarFutbolComponent, FormsModule, RouterModule ],
  templateUrl: './futbol-clasificacion.component.html',
  styleUrls: ['./futbol-clasificacion.component.scss']
})
export class FutbolClasificacionComponent implements OnInit {
  temporadas: number[] = [];
  selectedTemporada!: number;
  clasificacion: any[] = [];

  leagueId!: number;
  season!: number;

  errorMessage: string = '';

  // Configuración de ligas y sus respectivas posiciones para Champions, Europa, Conference y descenso
  private rankConfigs: { [leagueId: number]: RankConfig } = {
    // LaLiga (API-Sports id = 140)
    140: { championsEnd: 5, europaEnd: 7, conferenceEnd: 8, relegationCount: 3 },
    // Premier League (id = 39)
    39:  { championsEnd: 4, europaEnd: 5, conferenceEnd: 6, relegationCount: 3 },
    // Serie A (id = 135)
    135: { championsEnd: 4, europaEnd: 5, conferenceEnd: 6, relegationCount: 3 },
    // Bundesliga (id = 78)
    78:  { championsEnd: 4, europaEnd: 5, conferenceEnd: 6, relegationCount: 3 },
    // Ligue 1 (id = 61)
    61:  { championsEnd: 3, europaEnd: 4, conferenceEnd: 5, relegationCount: 4 },
  };

  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    private router: Router,
    public themeService: ThemeService
  ) {}

  ngOnInit(): void {
    this.temporadas = [2021, 2022, 2023];

    this.route.params.subscribe(params => {
      this.leagueId = +params['leagueId'];
      this.season = +params['season'];

      this.selectedTemporada = this.season;
      this.cargarClasificacion();
    });
  }

  onFiltroCambio(): void {
    this.season = this.selectedTemporada;
    this.actualizarRuta();
  }

  actualizarRuta(): void {
    this.router.navigate(['/clasificacion', this.leagueId, this.season]);
  }

  cargarClasificacion(): void {
    const headers = new HttpHeaders({
      'x-apisports-key': '4fd2512f15f791542e09ceb9073e2159'
    });

    const url = `https://v3.football.api-sports.io/standings?league=${this.leagueId}&season=${this.season}`;
    console.log('Requesting URL:', url);

    this.http.get<any>(url, { headers }).subscribe({
      next: (data) => {
        console.log('Datos recibidos:', data);
        if (data?.response?.length) {
          this.clasificacion = data.response[0]?.league?.standings?.[0] || [];
          this.errorMessage = '';
        } else {
          this.errorMessage = 'No hay datos disponibles';
          this.clasificacion = [];
        }
      },
      error: (error) => {
        console.error('Error en la API:', error);
        this.errorMessage = 'Error al cargar los datos';
        this.clasificacion = [];
      }
    });
  }

  /**
   * Devuelve la clase CSS para el badge de la posición según la configuración de la liga.
   */
  getBadgeClass(rank: number): string {
    const cfg = this.rankConfigs[this.leagueId] || { championsEnd: 0, europaEnd: 0, conferenceEnd: 0, relegationCount: 3 };
    const total = this.clasificacion.length;

    if (rank <= cfg.championsEnd) {
      return 'bg-champions';
    } else if (rank <= cfg.europaEnd) {
      return 'bg-europa';
    } else if (rank <= cfg.conferenceEnd) {
      return 'bg-conference';
    } else if (rank > total - cfg.relegationCount) {
      return 'bg-relegation';
    } else {
      return 'bg-secondary';
    }
  }
}
