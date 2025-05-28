import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NavbarComponent } from '../../../shared/navbar/navbar.component';
import { FooterComponent } from '../../../shared/footer/footer.component';
import { ThemeService } from '../../../core/theme.service';
import { SidebarNBAComponent } from '../../../shared/sidebar-nba/sidebar-nba.component';
@Component({
  selector: 'app-baloncesto-partidos',
  standalone: true,
  imports: [
    RouterModule,
    NavbarComponent,
    FooterComponent,
    CommonModule,
    FormsModule,
    SidebarNBAComponent,
  ],
  templateUrl: './baloncesto-partidos.component.html',
  styleUrl: './baloncesto-partidos.component.scss',
})
export class BaloncestoPartidosComponent implements OnInit {
  temporadasEl: any[] = ['2023', '2022', '2021'];
  temporadasACB: any[] = ['2023-2024', '2022-2023', '2021-2022'];
  temporadas: any[] = [];

  partidos: any[] = [];
  rondas: any[] = [];

  leagueId!: number;
  season!: any;
  round!: number;

  selectedTemporada!: number;
  selectedRonda!: string;

  errorMessage: string = '';

  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    private router: Router,
    public themeService: ThemeService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.leagueId = +params['leagueId'];
      this.season = +params['season'];

      if(this.leagueId === 117){
        this.temporadas = this.temporadasACB
      }else {
        this.temporadas = this.temporadasEl
      }

      this.selectedTemporada = this.season;

      this.cargarPartidos();
    });
  }

  onFiltroCambio() {
    this.season = this.selectedTemporada;
    this.actualizarRuta();
  }

  actualizarRuta() {
    this.router.navigate(['/baloncesto-partidos', this.leagueId, this.season]);
  }

  cargarPartidos() {
    const headers = new HttpHeaders({
      'x-apisports-key': '4fd2512f15f791542e09ceb9073e2159',
    });

    let url = `https://v1.basketball.api-sports.io/games?league=${this.leagueId}&season=${this.season}`;

    console.log('Requesting URL:', url);

    this.http.get<any>(url, { headers }).subscribe({
      next: (data) => {
        console.log('Datos recibidos:', data);

        if (data?.response?.length) {
          this.partidos = data.response;
          this.errorMessage = '';
        } else {
          this.errorMessage = 'No hay partidos disponibles';
        }
      },
      error: (error) => {
        console.error('Error en la API:', error);
        this.errorMessage = 'Error al cargar los partidos';
        this.partidos = [];
      },
    });
  }
}
