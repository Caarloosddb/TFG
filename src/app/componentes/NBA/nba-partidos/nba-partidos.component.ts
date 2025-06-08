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

  temporadas: number[] = [];  // Lista de temporadas disponibles
  selectedTemporada!: number; // Temporada seleccionada por el usuario
  partidos: any[] = []; // Lista de partidos de la NBA
  isLoading: boolean = false; // Indica si los datos están siendo cargados

  minFecha!: string;  // Fecha mínima para los partidos
  maxFecha!: string;  // Fecha máxima para los partidos

  partidosPorFecha: { [fecha: string]: any[] } = {};  // Objeto que agrupa los partidos por fecha
  fechaSeleccionada: string = ''; // Fecha seleccionada por el usuario para filtrar los partidos
  partidosFiltrados: any[] = [];  // Lista de partidos filtrados por la fecha seleccionada

  leagueId!: string;  // ID de la liga NBA
  season!: number;  // Temporada seleccionada

  errorMessage: string = '';  // Mensaje de error en caso de que no se encuentren partidos o haya un error en la API

  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    private router: Router,
    public themeService: ThemeService
  ) {}

  ngOnInit(): void {
    this.temporadas = [2023, 2022, 2021]; // Inicializa las temporadas disponibles

    this.route.params.subscribe(params => {
      this.leagueId = params['leagueId']; // Obtiene el ID de la liga desde los parámetros de la ruta
      this.season = +params['season'];  // Obtiene la temporada desde los parámetros de la ruta y la convierte a número

      // Establece las fechas mínima y máxima según la temporada seleccionada
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

      this.fechaSeleccionada = this.maxFecha ; // Inicializa la fecha seleccionada con la fecha máxima
      this.selectedTemporada = this.season; // Establece la temporada seleccionada
      
      this.cargarPartidosNBA(); // Llama a la función para cargar los partidos de la NBA
    });
  }

  onFiltroCambio(): void {
    this.season = this.selectedTemporada; // Actualiza la temporada con la seleccionada por el usuario
    this.actualizarRuta();  // Actualiza la ruta para reflejar el cambio de temporada
  }

  actualizarRuta(): void {
    this.router.navigate(['/nba-partidos', this.leagueId, this.season]);  // Navega a la ruta actualizada con el ID de la liga y la temporada seleccionada
  }

  cargarPartidosNBA(): void {
    // API Key
    const headers = new HttpHeaders({
      'x-apisports-key': '4fd2512f15f791542e09ceb9073e2159'
    });

    this.isLoading = true;  // Indica que los datos están siendo cargados

    const url = `https://v2.nba.api-sports.io/games?league=standard&season=${this.season}`; // URL de la API para obtener los partidos de la NBA
    console.log('Requesting NBA Games URL:', url);  // Muestra la URL solicitada en la consola para depuración

    this.http.get<any>(url, { headers }).subscribe({  // Realiza la solicitud HTTP a la API de la NBA
      next: (data) => {
        console.log('Datos recibidos:', data);  // Muestra los datos recibidos de la API en la consola para depuración
        this.isLoading = false; // Indica que la carga de datos ha finalizado

        if (data?.response?.length) { // Comprueba si hay datos en la respuesta de la API
          this.partidos = data.response;  // Asigna los datos de los partidos a la variable partidos

          this.partidosPorFecha = this.partidos.reduce((acc: any, partido: any) => {  // Agrupa los partidos por fecha
            const fecha = partido.date.start.slice(0, 10);  // Extrae la fecha del partido (formato YYYY-MM-DD)
            if (!acc[fecha]) {  // Si no existe un array para esa fecha, lo crea
              acc[fecha] = [];
            }
            acc[fecha].push(partido);
            return acc;
          }, {});

          this.errorMessage = ''; // Limpia el mensaje de error si hay partidos disponibles
        } else {
          this.errorMessage = 'No hay partidos disponibles';  // Mensaje de error si no hay partidos disponibles
          this.partidos = []; // Limpia la lista de partidos si no hay datos
          this.partidosPorFecha = {}; // Limpia los partidos por fecha si no hay datos
        }
        this.filtrarPorFecha();
      },
      error: (error) => {
        console.error('Error en la API:', error); // Muestra un mensaje de error si la API falla
        this.isLoading = false;
        this.errorMessage = 'Error al cargar los partidos'; // Mensaje de error si la API falla
        this.partidos = []; // Limpia la lista de partidos en caso de error
        this.partidosPorFecha = {}; // Limpia los partidos por fecha en caso de error
      }
    });
  }

  filtrarPorFecha(): void {
  if (this.fechaSeleccionada && this.partidosPorFecha[this.fechaSeleccionada]) {  // Comprueba si hay partidos para la fecha seleccionada
    this.partidosFiltrados = this.partidosPorFecha[this.fechaSeleccionada];  // Asigna los partidos de la fecha seleccionada a la variable partidosFiltrados
  } else {
    this.partidosFiltrados = [];  // Si no hay partidos para la fecha seleccionada, limpia la lista de partidos filtrados
  }
}
}
