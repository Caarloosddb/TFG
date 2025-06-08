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
  temporadas: number[] = [];  // Lista de temporadas disponibles
  selectedTemporada!: number; // Temporada seleccionada por el usuario


  clasificacion: any[] = [];  // Clasificación general de la NBA

  clasificacionEste: any[] = [];  // Equipos de la conferencia Este
  clasificacionOeste: any[] = []; // Equipos de la conferencia Oeste

  leagueId!: string;  // ID de la liga NBA
  season!: number;  // Temporada seleccionada


  errorMessage: string = '';

  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    private router: Router,
    public themeService: ThemeService
  ) {}

  ngOnInit(): void {
     this.temporadas = [2023, 2022, 2021];  // Inicializa las temporadas disponibles

      this.route.params.subscribe(params => {
      this.leagueId = params['leagueId']; // Obtiene el ID de la liga desde los parámetros de la ruta
      this.season = +params['season'];  // Obtiene la temporada desde los parámetros de la ruta y la convierte a número

      this.selectedTemporada = this.season; // Establece la temporada seleccionada
      this.cargarClasificacion(); // inicia la funcion cargarClasificacion
    });
  }

  // Maneja el cambio de temporada cuando el usuario selecciona una nueva
    onFiltroCambio(): void {
    this.season = this.selectedTemporada; // Actualiza la temporada con la seleccionada por el usuario
    this.actualizarRuta();  // Actualiza la ruta para reflejar el cambio de temporada
  }

  actualizarRuta(): void {
    this.router.navigate(['/nba-clasificacion', this.leagueId, this.season]); // Navega a la ruta actualizada con el ID de la liga y la temporada seleccionada
  }

cargarClasificacion(): void {
  //API Key
  const headers = new HttpHeaders({
    'x-apisports-key': '4fd2512f15f791542e09ceb9073e2159'
  });

  const url = `https://v2.nba.api-sports.io/standings?league=${this.leagueId}&season=${this.season}`; //URL de la API para obtener la clasificación de la NBA
  console.log('Requesting URL:', url);  // Muestra la URL solicitada en la consola para depuración

  this.http.get<any>(url, { headers }).subscribe({
    next: (data) => {
      console.log('Datos recibidos:', data);  // Muestra los datos recibidos de la API en la consola para depuración
      if (data?.response?.length) { // Comprueba si hay datos en la respuesta de la API
        this.clasificacion = data.response; // Asigna los datos de la clasificación a la variable clasificacion

        // Filtrar y ordenar Este
        this.clasificacionEste = this.clasificacion
          .filter(team => team.conference.name.toLowerCase() === 'east')  // Filtra los equipos de la conferencia Este
          .sort((a, b) => b.conference.win - a.conference.win); // Ordena los equipos de la conferencia Este por victorias

        // Filtrar y ordenar Oeste
        this.clasificacionOeste = this.clasificacion
          .filter(team => team.conference.name.toLowerCase() === 'west')  // Filtra los equipos de la conferencia Oeste
          .sort((a, b) => b.conference.win - a.conference.win); // Ordena los equipos de la conferencia Oeste por victorias

        this.errorMessage = '';
      } else {
        this.errorMessage = 'No hay datos disponibles'; // Si no hay datos, muestra un mensaje de error
        this.clasificacion = [];  // Limpia la clasificación
        this.clasificacionEste = [];  // Limpia la clasificación Este
        this.clasificacionOeste = []; // Limpia la clasificación Oeste 

      }
    },
    error: (error) => {
      console.error('Error en la API:', error);  // Si no hay respuesta de la API, muestra un mensaje de error
      this.errorMessage = 'Error al cargar los datos';  // Mensaje de error si la API falla
      this.clasificacion = [];  // Limpia la clasificación
      this.clasificacionEste = [];  // Limpia la clasificación Este
      this.clasificacionOeste = []; // Limpia la clasificación Oeste
    }
  });
}

}