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

  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    private router: Router,
    public themeService: ThemeService
  ) {}

  ngOnInit(): void {
    this.temporadas = [2024, 2023, 2022, 2021, 2020, 2019, 2018, 2017, 2016, 2015, 2014, 2013, 2012, 2011, 2010];

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

getBadgeClass(description: string): string {
  switch (description) {
    case 'Champions League':
      return 'bg-champions';
    case 'Promotion - Champions League (Group Stage: )':
      return 'bg-champions';
    case 'UEFA Europa League':
      return 'bg-europa';
    case 'Promotion - Europa League (Group Stage: )':
      return 'bg-europa';
    case 'Conference League Qualification':
      return 'bg-conference';
    case 'Promotion - Europa Conference League (Qualification: )':
      return 'bg-conference';
    case 'Relegation':
      return 'bg-relegation';
    case 'Relegation - LaLiga2':
      return 'bg-relegation';
    default:
      return 'bg-secondary';
  }
}

}
