import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { NavbarComponent } from '../../../shared/navbar/navbar.component';
import { SidebarFutbolComponent } from '../../../shared/sidebar-futbol/sidebar-futbol.component';
import { FooterComponent } from '../../../shared/footer/footer.component';
import { ThemeService } from '../../../core/theme.service';
@Component({
  selector: 'app-futbol-jugador-detalle',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    NavbarComponent,
    SidebarFutbolComponent,
    FooterComponent,
  ],
  templateUrl: './futbol-jugador-detalle.component.html',
  styleUrl: './futbol-jugador-detalle.component.scss',
})
export class FutbolJugadorDetalleComponent implements OnInit {
  playerId!: number;  // ID del jugador que se va a mostrar
  season!: number;  // Temporada seleccionada por el usuario (por defecto 2024)

  player: any;  // Información del jugador
  stats: any[] = [];  // Estadísticas del jugador

  errorMessage = '';  // Mensaje de error en caso de que no se pueda cargar la información del jugador

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private location: Location,
    public themeService: ThemeService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.playerId = +params['playerId'];  // Obtiene el ID del jugador desde los parámetros de la ruta y lo convierte a número
      this.season = +params['season'] || 2024;  // Obtiene la temporada desde los parámetros de la ruta o usa 2024 por defecto

      console.log('Params:', this.playerId, this.season); // Muestra el ID del jugador y la temporada en la consola para depuración
      this.cargarJugador(); // Llama a la función para cargar la información del jugador
    });
  }

  cargarJugador() {
    // API Key
    const headers = new HttpHeaders({
      'x-apisports-key': '4fd2512f15f791542e09ceb9073e2159',
    });
    const url = `https://v3.football.api-sports.io/players?id=${this.playerId}&season=${this.season}`;  // Construye la URL para solicitar la información del jugador

    console.log('Requesting URL:', url);  // Muestra en la consola la URL que se está solicitando

    this.http.get<any>(url, { headers }).subscribe({  // Realiza la solicitud GET a la API de fútbol
      next: (data) => { // Maneja la respuesta de la API
        console.log('Datos recibidos:', data);  // Muestra en la consola los datos del jugador recibidos de la API

        if (data?.response?.length) { // Verifica si hay datos del jugador disponibles
          this.player = data.response[0].player;  // Asigna la información del jugador a la variable player
          this.stats = data.response[0].statistics; // Asigna las estadísticas del jugador a la variable stats
          this.errorMessage = ''; // Limpia el mensaje de error si hay datos disponibles
        } else {
          this.errorMessage = 'No hay estadisticas disponibles';  // Mensaje de error si no hay estadísticas disponibles
        }
      },
      error: (error) => {
        console.error('Error en la API:', error); // Muestra un mensaje de error si la API falla
        this.errorMessage = 'Error al cargar los datos';  // Mensaje de error si no se puede cargar la información del jugador
      },
    });
  }
}
