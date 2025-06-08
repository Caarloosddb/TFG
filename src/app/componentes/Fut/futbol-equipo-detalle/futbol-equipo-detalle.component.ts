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
  selector: 'app-futbol-equipo-detalle',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    NavbarComponent,
    SidebarFutbolComponent,
    FooterComponent
  ],
  templateUrl: './futbol-equipo-detalle.component.html',
  styleUrls: ['./futbol-equipo-detalle.component.scss']
})
export class FutbolEquipoDetalleComponent implements OnInit {
  leagueId!: number;  // ID de la liga a la que pertenece el equipo
  season: number = 2024;  // Temporada seleccionada por el usuario (por defecto 2024)
  teamId!: number;  // ID del equipo que se va a mostrar

  teamInfo: any;  // Información del equipo
  venueInfo: any; // Información del estadio del equipo
  squad: any[] = [];  // Lista de jugadores del equipo
  statistics: any;  // Estadísticas del equipo en la liga y temporada seleccionadas

  errorMessage = '';  // Mensaje de error en caso de que no se pueda cargar la información del equipo

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private location: Location,
    public themeService: ThemeService
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.teamId = +params['teamId'];  // Obtiene el ID del equipo desde los parámetros de la ruta y lo convierte a número
      this.leagueId = +params['leagueId'] || 140; // Obtiene el ID de la liga desde los parámetros de la ruta y lo convierte a número, o usa 140 por defecto
      this.season = +params['season'] || 2024;  // Obtiene la temporada desde los parámetros de la ruta y lo convierte a número, o usa 2024 por defecto

    console.log('Params:', this.leagueId, this.season, this.teamId);
    this.cargarEquipo();  // Llama a la función para cargar la información del equipo
    this.cargarPlantilla(); // Llama a la función para cargar la plantilla del equipo
    this.cargarEstadisticas();  // Llama a la función para cargar las estadísticas del equipo
    });
  }

cargarEquipo() {
  // API Key
  const headers = new HttpHeaders({
    'x-apisports-key': '4fd2512f15f791542e09ceb9073e2159'
  });
  const url = `https://v3.football.api-sports.io/teams?id=${this.teamId}`;  // Construye la URL para solicitar la información del equipo

  this.http.get<any>(url, { headers }).subscribe({
    next: (data) => { // Maneja la respuesta de la API
      console.log('Requesting URL:', url);  // Muestra en la consola la URL que se está solicitando
      console.log("Datos del equipo:", data); // Muestra en la consola los datos del equipo recibidos de la API
      const response = data?.response?.[0]; // Obtiene la primera respuesta del equipo
      this.teamInfo = response?.team || null; // Asigna la información del equipo a la variable teamInfo
      this.venueInfo = response?.venue || null; // Asigna la información del estadio del equipo a la variable venueInfo
    },
    error: (error) => { // Maneja el error de la API
      console.error('Error en la API (equipo):', error);  // Muestra un mensaje de error si la API falla
      this.errorMessage = "Error al cargar la información del equipo";  // Mensaje de error si no se puede cargar la información del equipo
    }
  });
}

  cargarPlantilla() {
    // API Key
    const headers = new HttpHeaders({
      'x-apisports-key': '4fd2512f15f791542e09ceb9073e2159'
    });
    const url = `https://v3.football.api-sports.io/players/squads?team=${this.teamId}`; // Construye la URL para solicitar la plantilla del equipo

    this.http.get<any>(url, { headers }).subscribe({  // Realiza la solicitud GET a la API de fútbol
      next: (data) => { // Maneja la respuesta de la API
        console.log("Plantilla del equipo:", data); // Muestra en la consola los datos de la plantilla del equipo recibidos de la API
        this.squad = data?.response?.[0]?.players || [];  // Verifica si hay datos de respuesta y toma los jugadores de la plantilla, o un array vacío si no hay datos
      },
      error: (error) => { // Maneja el error de la API
        console.error('Error en la API (plantilla):', error); // Muestra un mensaje de error si la API falla
        this.errorMessage = "Error al cargar la plantilla"; // Mensaje de error si no se puede cargar la plantilla del equipo
      }
    });
  }

  cargarEstadisticas() {
    // API Key
    const headers = new HttpHeaders({
      'x-apisports-key': '4fd2512f15f791542e09ceb9073e2159'
    });
    const url = `https://v3.football.api-sports.io/teams/statistics?league=${this.leagueId}&season=${this.season}&team=${this.teamId}`; // Construye la URL para solicitar las estadísticas del equipo

    this.http.get<any>(url, { headers }).subscribe({ // Realiza la solicitud GET a la API de fútbol
      next: (data) => { // Maneja la respuesta de la API
        console.log("Estadísticas del equipo:", data);  // Muestra en la consola las estadísticas del equipo recibidas de la API
        this.statistics = data?.response || null; // Verifica si hay datos de respuesta y toma las estadísticas del equipo, o null si no hay datos
      },
      error: (error) => { // Maneja el error de la API
        console.error('Error en la API (estadísticas):', error);  // Muestra un mensaje de error si la API falla
        this.errorMessage = "Error al cargar las estadísticas"; // Mensaje de error si no se pueden cargar las estadísticas del equipo
      }
    });
  }

  // Método para navegar hacia atrás en el historial de navegación
  goBack(): void {
    this.location.back();
  }
}
