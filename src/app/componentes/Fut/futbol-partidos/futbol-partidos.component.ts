import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NavbarComponent } from '../../../shared/navbar/navbar.component';
import { FooterComponent } from '../../../shared/footer/footer.component';
import { SidebarFutbolComponent } from '../../../shared/sidebar-futbol/sidebar-futbol.component';
import { ThemeService } from '../../../core/theme.service';
@Component({
  selector: 'app-futbol-partidos',
  standalone: true,
  imports: [RouterModule, NavbarComponent, FooterComponent, CommonModule, FormsModule, SidebarFutbolComponent],
  templateUrl: './futbol-partidos.component.html',
  styleUrl: './futbol-partidos.component.scss'
})
export class FutbolPartidosComponent implements OnInit{
  temporadas: number[] = [];
  jornadas: number[] = [];
  partidos: any[] = [];
  rondas: any[] = [];
  rondasEuropa: any[] = [];

  endpoint: string = '';
  leagueId!: number;
  season!: number;
  round!: number;
  knockout!: string;

  selectedTemporada!: number;
  selectedJornada!: number;
  selectedRonda!: string;

  errorMessage: string = '';


  constructor(private http: HttpClient, private route: ActivatedRoute,  private router: Router, public themeService: ThemeService) {}

  ngOnInit(): void {
    this.temporadas = [2024, 2023, 2022, 2021, 2020, 2019, 2018, 2017, 2016, 2015, 2014, 2013, 2012, 2011, 2010];
    this.rondas = ['Round of 16', 'Quarter-finals', 'Semi-finals', 'Final'];
    this.rondasEuropa = [
      'League Stage - 1', 'League Stage - 2', 'League Stage - 3', 'League Stage - 4', 'League Stage - 5', 'League Stage - 6', 'League Stage - 7', 'League Stage - 8',
       'Round of 16', 'Quarter-finals', 'Semi-finals', 'Final'
    ]
    //Añadir if conference

    this.route.params.subscribe(params => {
      this.endpoint = params['endpoint'];
      this.leagueId = +params['leagueId'];
      this.season = +params['season'];
      if (this.leagueId === 140 || this.leagueId === 39 || this.leagueId === 135 ||this.leagueId === 78 || this.leagueId === 61) {
        this.round = +params['round'];
      } else {
        this.knockout = params['round'];
      }

      this.selectedRonda = this.knockout

      this.selectedTemporada = this.season;

      if (this.leagueId === 78 || this.leagueId === 61) {
        this.jornadas = Array.from({ length: 34 }, (_, i) => i + 1);
      } else {
        this.jornadas = Array.from({ length: 38 }, (_, i) => i + 1);
      }

      this.cargarPartidos();
    });
  }

  irJornadaAnterior() {
    if (this.leagueId === 140 || this.leagueId === 39 || this.leagueId === 135 ||this.leagueId === 78 || this.leagueId === 61) {
    if (this.round > 1) {
      this.round--;
      this.actualizarRuta();
      }
    }else if(this.leagueId === 2 || this.leagueId === 3 || this.leagueId === 848) {
      const i = this.rondasEuropa.indexOf(this.knockout);
      if (i > 0) {
        this.knockout = this.rondasEuropa[i - 1];
        this.actualizarRuta();
      }
    }else {
      const i = this.rondas.indexOf(this.knockout);
      if (i > 0) {
        this.knockout = this.rondas[i - 1];
        this.actualizarRuta();
      }
    }
  }
  
  irJornadaSiguiente() {
    if (this.leagueId === 140 || this.leagueId === 39 || this.leagueId === 135 ||this.leagueId === 78 || this.leagueId === 61) {
    if (this.round < this.jornadas.length) {
      this.round++;
      this.actualizarRuta();
      }
    }else if(this.leagueId === 2 || this.leagueId === 3 || this.leagueId === 848) {
      const i = this.rondasEuropa.indexOf(this.knockout);
      if (i < this.rondasEuropa.length - 1) {
        this.knockout = this.rondasEuropa[i + 1];
        this.actualizarRuta();
      }
    }else {
      const i = this.rondas.indexOf(this.knockout);
      if (i < this.rondas.length - 1) {
        this.knockout = this.rondas[i + 1];
        this.actualizarRuta();
      }
    }
  }
  
  onFiltroCambio() {
    this.season = this.selectedTemporada;
    this.actualizarRuta();
  }

  actualizarRuta() {
    if (this.leagueId === 140 || this.leagueId === 39 || this.leagueId === 135 ||this.leagueId === 78 || this.leagueId === 61) {
      this.router.navigate(['/futbol', this.endpoint, this.leagueId, this.season, this.round]);
    } else {
      this.router.navigate(['/futbol', this.endpoint, this.leagueId, this.season, this.knockout]);
    }
  }

  cargarPartidos() {
    const headers = new HttpHeaders({
      'x-apisports-key': '4fd2512f15f791542e09ceb9073e2159'
    });

    let url = ''

    const roundText = encodeURIComponent(`Regular Season - ${this.round}`);

    if (this.leagueId === 140 || this.leagueId === 39 || this.leagueId === 135 ||this.leagueId === 78 || this.leagueId === 61) {
      url = `https://v3.football.api-sports.io/${this.endpoint}?league=${this.leagueId}&season=${this.season}&round=${roundText}`;
    } else {
      url = `https://v3.football.api-sports.io/${this.endpoint}?league=${this.leagueId}&season=${this.season}&round=${this.knockout}`;
    }

    console.log('Requesting URL:', url);

    this.http.get<any>(url, { headers }).subscribe({
      next: (data) => {
        console.log("Datos recibidos:", data);

        if (data?.response?.length) {
          this.partidos = data.response;
          this.errorMessage = '';
        } else {
          this.errorMessage = "No hay partidos disponibles";
        }
      },
      error: (error) => {
        console.error('Error en la API:', error);
        this.errorMessage = "Error al cargar los datos";
        this.partidos = [];
      }
    });
  }

  get textoJornada(): string {
    const ligasConRound = [140, 39, 135, 78, 61];
    return ligasConRound.includes(this.leagueId) ? `Jornada ${this.round}` : this.knockout;
  }
  
}

