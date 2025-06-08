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
  imports: [
    RouterModule,
    NavbarComponent,
    FooterComponent,
    CommonModule,
    FormsModule,
    SidebarFutbolComponent,
  ],
  templateUrl: './futbol-partidos.component.html',
  styleUrl: './futbol-partidos.component.scss',
})
export class FutbolPartidosComponent implements OnInit {
  temporadas: number[] = [];  // Lista de temporadas disponibles
  jornadas: number[] = [];  // Lista de jornadas disponibles
  partidos: any[] = []; // Lista de partidos de fútbol
  rondas: any[] = []; // Lista de rondas disponibles
  rondasEuropa: any[] = []; // Lista de rondas disponibles para competiciones europeas

  endpoint: string = '';  // Endpoint de la API que se utilizará para obtener los partidos
  leagueId!: number;
  season!: number;
  round!: number;
  knockout!: string;

  selectedTemporada!: number;
  selectedJornada!: number;
  selectedRonda!: string;

  errorMessage: string = '';

  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    private router: Router,
    public themeService: ThemeService
  ) {}

  ngOnInit(): void {
    this.temporadas = [ // Lista de temporadas disponibles
      2024, 2023, 2022, 2021, 2020, 2019, 2018, 2017, 2016, 2015, 2014, 2013,
      2012, 2011, 2010,
    ];  
    this.rondas = ['Round of 16', 'Quarter-finals', 'Semi-finals', 'Final'];  // Lista de rondas disponibles para competiciones no europeas
    this.rondasEuropa = [ // Lista de rondas disponibles para competiciones europeas
      'League Stage - 1',
      'League Stage - 2',
      'League Stage - 3',
      'League Stage - 4',
      'League Stage - 5',
      'League Stage - 6',
      'League Stage - 7',
      'League Stage - 8',
      'Round of 16',
      'Quarter-finals',
      'Semi-finals',
      'Final',
    ];

    this.route.params.subscribe((params) => {
      this.endpoint = params['endpoint']; // Obtiene el endpoint de la API desde los parámetros de la ruta
      this.leagueId = +params['leagueId'];  // Obtiene el ID de la liga desde los parámetros de la ruta y lo convierte a número
      this.season = +params['season'];  // Obtiene la temporada desde los parámetros de la ruta y lo convierte a número
      // Establece el endpoint de la API dependiendo de la liga
      if (
        this.leagueId === 140 ||
        this.leagueId === 39 ||
        this.leagueId === 135 ||
        this.leagueId === 78 ||
        this.leagueId === 61
      ) {
        this.round = +params['round'];
      } else {
        this.knockout = params['round'];
      }

      this.selectedRonda = this.knockout; // Establece la ronda seleccionada por el usuario

      this.selectedTemporada = this.season; // Establece la temporada seleccionada por el usuario

      //Establece el numero de jornadas dependiendo de la liga
      if (this.leagueId === 78 || this.leagueId === 61) {
        this.jornadas = Array.from({ length: 34 }, (_, i) => i + 1);
      } else {
        this.jornadas = Array.from({ length: 38 }, (_, i) => i + 1);
      }

      this.cargarPartidos();  // Llama a la función para cargar los partidos de fútbol
    });
  }

  // Método para ir a la jornada anterior o ronda anterior
  irJornadaAnterior() {
    if (
      this.leagueId === 140 ||
      this.leagueId === 39 ||
      this.leagueId === 135 ||
      this.leagueId === 78 ||
      this.leagueId === 61
    ) {
      if (this.round > 1) {
        this.round--;
        this.actualizarRuta();
      }
    } else if (
      this.leagueId === 2 ||
      this.leagueId === 3 ||
      this.leagueId === 848
    ) {
      const i = this.rondasEuropa.indexOf(this.knockout);
      if (i > 0) {
        this.knockout = this.rondasEuropa[i - 1];
        this.actualizarRuta();
      }
    } else {
      const i = this.rondas.indexOf(this.knockout);
      if (i > 0) {
        this.knockout = this.rondas[i - 1];
        this.actualizarRuta();
      }
    }
  }

  // Método para ir a la siguiente jornada o ronda
  irJornadaSiguiente() {
    if (
      this.leagueId === 140 ||
      this.leagueId === 39 ||
      this.leagueId === 135 ||
      this.leagueId === 78 ||
      this.leagueId === 61
    ) {
      if (this.round < this.jornadas.length) {
        this.round++;
        this.actualizarRuta();
      }
    } else if (
      this.leagueId === 2 ||
      this.leagueId === 3 ||
      this.leagueId === 848
    ) {
      const i = this.rondasEuropa.indexOf(this.knockout);
      if (i < this.rondasEuropa.length - 1) {
        this.knockout = this.rondasEuropa[i + 1];
        this.actualizarRuta();
      }
    } else {
      const i = this.rondas.indexOf(this.knockout);
      if (i < this.rondas.length - 1) {
        this.knockout = this.rondas[i + 1];
        this.actualizarRuta();
      }
    }
  }

  onFiltroCambio() {
    this.season = this.selectedTemporada; // Actualiza la temporada con la seleccionada por el usuario
    this.actualizarRuta();  // Actualiza la ruta para reflejar el cambio de temporada
  }

  actualizarRuta() {
    // Actualiza la ruta dependiendo de la liga y el formato de la ronda
    if (
      this.leagueId === 140 ||
      this.leagueId === 39 ||
      this.leagueId === 135 ||
      this.leagueId === 78 ||
      this.leagueId === 61
    ) {
      this.router.navigate([
        '/futbol',
        this.endpoint,
        this.leagueId,
        this.season,
        this.round,
      ]);
    } else {
      this.router.navigate([
        '/futbol',
        this.endpoint,
        this.leagueId,
        this.season,
        this.knockout,
      ]);
    }
  }

  cargarPartidos() {
    // API Key
    const headers = new HttpHeaders({
      'x-apisports-key': '4fd2512f15f791542e09ceb9073e2159',
    });

    let url = ''; // Variable para almacenar la URL de la API

    const roundText = encodeURIComponent(`Regular Season - ${this.round}`); // Codifica el texto de la ronda para usarlo en la URL

    // Construye la URL dependiendo de la liga y el formato de la ronda
    if (
      this.leagueId === 140 ||
      this.leagueId === 39 ||
      this.leagueId === 135 ||
      this.leagueId === 78 ||
      this.leagueId === 61
    ) {
      url = `https://v3.football.api-sports.io/${this.endpoint}?league=${this.leagueId}&season=${this.season}&round=${roundText}`;
    } else {
      url = `https://v3.football.api-sports.io/${this.endpoint}?league=${this.leagueId}&season=${this.season}&round=${this.knockout}`;
    }

    console.log('Requesting URL:', url);  // Muestra la URL solicitada en la consola para depuración

    this.http.get<any>(url, { headers }).subscribe({  // Realiza la solicitud a la API
      next: (data) => { // Maneja la respuesta de la API
        console.log('Datos recibidos:', data);  // Muestra los datos recibidos de la API en la consola para depuración

        if (data?.response?.length) {   // Comprueba si hay partidos en la respuesta de la API
          this.partidos = data.response;  // Asigna los partidos recibidos a la lista de partidos
          this.errorMessage = ''; // Limpia el mensaje de error si hay partidos disponibles
        } else {
          this.errorMessage = 'No hay partidos disponibles';  // Mensaje de error si no hay partidos disponibles
        }
      },
      error: (error) => {
        console.error('Error en la API:', error);   // Muestra un mensaje de error si la API falla
        this.errorMessage = 'Error al cargar los datos';  // Mensaje de error si la API falla
        this.partidos = []; // Limpia la lista de partidos en caso de error
      },
    });
  }

  // Método para obtener el texto de la jornada o ronda
  get textoJornada(): string {
    const ligasConRound = [140, 39, 135, 78, 61];  // Ligas que utilizan el formato de jornada
    return ligasConRound.includes(this.leagueId)   
      ? `Jornada ${this.round}`  
      : this.knockout;  
  }
}
