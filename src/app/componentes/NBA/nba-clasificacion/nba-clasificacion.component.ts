import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ThemeService } from '../../../core/theme.service';

import { NavbarComponent } from '../../../shared/navbar/navbar.component';
import { SidebarNBAComponent } from '../../../shared/sidebar-nba/sidebar-nba.component';
import { FooterComponent } from '../../../shared/footer/footer.component';

@Component({
  selector: 'app-nba-clasificacion',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    NavbarComponent,
    SidebarNBAComponent,
    FooterComponent,
    RouterModule
  ],
  templateUrl: './nba-clasificacion.component.html',
  styleUrls: ['./nba-clasificacion.component.scss']
})
export class NbaClasificacionComponent implements OnInit {
  temporadas: number[] = [];
  selectedTemporada!: number;


 clasificacion: any[] = [];

  clasificacionEste: any[] = [];
  clasificacionOeste: any[] = [];

  leagueId!: string;
  season!: number;


  errorMessage: string = '';

  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    private router: Router,
    public themeService: ThemeService
  ) {}

  ngOnInit(): void {
     this.temporadas = [2023, 2022, 2021];

      this.route.params.subscribe(params => {
      this.leagueId = params['leagueId'];
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
    this.router.navigate(['/nba-clasificacion', this.leagueId, this.season]);
  }

cargarClasificacion(): void {
  const headers = new HttpHeaders({
    'x-apisports-key': '4fd2512f15f791542e09ceb9073e2159'
  });

  const url = `https://v2.nba.api-sports.io/standings?league=${this.leagueId}&season=${this.season}`;
  console.log('Requesting URL:', url);

  this.http.get<any>(url, { headers }).subscribe({
    next: (data) => {
      console.log('Datos recibidos:', data);
      if (data?.response?.length) {
        this.clasificacion = data.response;

        // Filtrar y ordenar Este
        this.clasificacionEste = this.clasificacion
          .filter(team => team.conference.name.toLowerCase() === 'east')
          .sort((a, b) => b.conference.win - a.conference.win);

        // Filtrar y ordenar Oeste
        this.clasificacionOeste = this.clasificacion
          .filter(team => team.conference.name.toLowerCase() === 'west')
          .sort((a, b) => b.conference.win - a.conference.win);

        this.errorMessage = '';
      } else {
        this.errorMessage = 'No hay datos disponibles';
        this.clasificacion = [];
        this.clasificacionEste = [];
        this.clasificacionOeste = [];
      }
    },
    error: (error) => {
      console.error('Error en la API:', error);
      this.errorMessage = 'Error al cargar los datos';
      this.clasificacion = [];
      this.clasificacionEste = [];
      this.clasificacionOeste = [];
    }
  });
}

}