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
  selector: 'app-nba-partidos',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    NavbarComponent,
    SidebarNBAComponent,
    FooterComponent,
    RouterModule
  ],
  templateUrl: './nba-partidos.component.html',
  styleUrls: ['./nba-partidos.component.scss']
})
export class NbaPartidosComponent implements OnInit {

  temporadas: number[] = [];
  selectedTemporada!: number;
  partidos: any[] = [];
  isLoading: boolean = false;

  minFecha!: string;
  maxFecha!: string;

  partidosPorFecha: { [fecha: string]: any[] } = {};
  fechaSeleccionada: string = '';
  partidosFiltrados: any[] = [];

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

      if(this.season === 2023){
        this.minFecha = '2023-10-24';
        this.maxFecha = '2024-06-18';
      }else if(this.season === 2022){
        this.minFecha = '2022-10-18';
        this.maxFecha = '2023-06-13';
      }else if(this.season === 2021){
        this.minFecha = '2021-10-19';
        this.maxFecha = '2022-06-17';
      }

      this.fechaSeleccionada = this.maxFecha
      this.selectedTemporada = this.season;
      
      this.cargarPartidosNBA();
    });
  }

  onFiltroCambio(): void {
    this.season = this.selectedTemporada;
    this.actualizarRuta();
  }

  actualizarRuta(): void {
    this.router.navigate(['/nba-partidos', this.leagueId, this.season]);
  }

  cargarPartidosNBA(): void {
    const headers = new HttpHeaders({
      'x-apisports-key': '4fd2512f15f791542e09ceb9073e2159'
    });

    this.isLoading = true;

    const url = `https://v2.nba.api-sports.io/games?league=standard&season=${this.season}`;
    console.log('Requesting NBA Games URL:', url);

    this.http.get<any>(url, { headers }).subscribe({
      next: (data) => {
        console.log('Datos recibidos:', data);
        this.isLoading = false;

        if (data?.response?.length) {
          this.partidos = data.response;

          this.partidosPorFecha = this.partidos.reduce((acc: any, partido: any) => {
            const fecha = partido.date.start.slice(0, 10);
            if (!acc[fecha]) {
              acc[fecha] = [];
            }
            acc[fecha].push(partido);
            return acc;
          }, {});

          this.errorMessage = '';
        } else {
          this.errorMessage = 'No hay partidos disponibles';
          this.partidos = [];
          this.partidosPorFecha = {};
        }
        this.filtrarPorFecha();
      },
      error: (error) => {
        console.error('Error en la API:', error);
        this.isLoading = false;
        this.errorMessage = 'Error al cargar los partidos';
        this.partidos = [];
        this.partidosPorFecha = {};
      }
    });
  }

  filtrarPorFecha(): void {
  if (this.fechaSeleccionada && this.partidosPorFecha[this.fechaSeleccionada]) {
    this.partidosFiltrados = this.partidosPorFecha[this.fechaSeleccionada];
  } else {
    this.partidosFiltrados = [];
  }
}
}
