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
  selector: 'app-baloncesto-clasificacion',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    NavbarComponent,
    SidebarNBAComponent,
    FooterComponent,
    RouterModule
  ],  templateUrl: './baloncesto-clasificacion.component.html',
  styleUrl: './baloncesto-clasificacion.component.scss'
})
export class BaloncestoClasificacionComponent implements OnInit{

  temporadasEl: any[] = ['2023', '2022', '2021'];
  temporadasACB: any[] = ['2023-2024', '2022-2023', '2021-2022'];
  temporadas: any[] = [];

  selectedTemporada!: string;

  clasificacion: any[] = [];

  leagueId!: number;
  season!: string;


  errorMessage: string = '';

  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    private router: Router,
    public themeService: ThemeService
  ) {}

  ngOnInit(): void {
      this.route.params.subscribe(params => {
      this.leagueId = +params['leagueId'];
      this.season = params['season'];

      if(this.leagueId === 117){
        this.temporadas = this.temporadasACB
      }else {
        this.temporadas = this.temporadasEl
      }

      this.selectedTemporada = this.season;
      this.cargarClasificacion();
    });
  }

    onFiltroCambio(): void {
    this.season = this.selectedTemporada;
    this.actualizarRuta();
  }

  actualizarRuta(): void {
    this.router.navigate(['/baloncesto-clasificacion', this.leagueId, this.season]);
  }

  cargarClasificacion(): void {
  const headers = new HttpHeaders({
    'x-apisports-key': '4fd2512f15f791542e09ceb9073e2159'
  });

  const url = `https://v1.basketball.api-sports.io/standings?league=${this.leagueId}&season=${this.season}`;
  
  console.log('Requesting URL:', url);

  this.http.get<any>(url, { headers }).subscribe({
    next: (data) => {
      console.log('Datos recibidos:', data);
      if (data?.response?.length) {
        this.clasificacion = data.response;

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

}
