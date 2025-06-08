import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ThemeService } from '../../../core/theme.service';

import { NavbarComponent } from '../../../shared/navbar/navbar.component';
import { FooterComponent } from '../../../shared/footer/footer.component';
import { SidebarFutbolComponent } from '../../../shared/sidebar-futbol/sidebar-futbol.component';

interface RankConfig {
  championsEnd: number;
  europaEnd: number;
  conferenceEnd: number;
  relegationCount: number;
}

@Component({
  selector: 'app-futbol-clasificacion',
  standalone: true,
  imports: [ CommonModule, NavbarComponent, FooterComponent, SidebarFutbolComponent, FormsModule, RouterModule ],
  templateUrl: './futbol-clasificacion.component.html',
  styleUrls: ['./futbol-clasificacion.component.scss']
})
export class FutbolClasificacionComponent implements OnInit {
  temporadas: number[] = [];  // Lista de temporadas disponibles
  selectedTemporada!: number; // Temporada seleccionada por el usuario
  clasificacion: any[] = [];  // Lista de equipos en la clasificación

  leagueId!: number;  // ID de la liga para la que se va a mostrar la clasificación
  season!: number;  // Temporada seleccionada por el usuario (por defecto 2024)
  
  errorMessage: string = '';  // Mensaje de error en caso de que no se pueda cargar la clasificación

  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    private router: Router,
    public themeService: ThemeService
  ) {}

  ngOnInit(): void {
    this.temporadas = [2024, 2023, 2022, 2021, 2020, 2019, 2018, 2017, 2016, 2015, 2014, 2013, 2012, 2011, 2010]; // Lista de temporadas disponibles

    this.route.params.subscribe(params => {
      this.leagueId = +params['leagueId'];  // Obtiene el ID de la liga desde los parámetros de la ruta y lo convierte a número
      this.season = +params['season'];  // Obtiene la temporada desde los parámetros de la ruta y lo convierte a número

      this.selectedTemporada = this.season; // Inicializa la temporada seleccionada con el valor obtenido de los parámetros
      this.cargarClasificacion(); // Llama a la función para cargar la clasificación de la liga
    });
  }

  onFiltroCambio(): void {
    this.season = this.selectedTemporada; // Actualiza la temporada con el valor seleccionado por el usuario
    this.actualizarRuta();  // Actualiza la ruta para reflejar el cambio en la temporada
  }

  actualizarRuta(): void {
    this.router.navigate(['/clasificacion', this.leagueId, this.season]); // Navega a la ruta de clasificación con el ID de la liga y la temporada seleccionada
  }

  cargarClasificacion(): void {
    // API Key
    const headers = new HttpHeaders({
      'x-apisports-key': '4fd2512f15f791542e09ceb9073e2159'
    });

    const url = `https://v3.football.api-sports.io/standings?league=${this.leagueId}&season=${this.season}`;  // Construye la URL para solicitar la clasificación de la liga
    console.log('Requesting URL:', url);  // Muestra la URL solicitada en la consola para depuración

    this.http.get<any>(url, { headers }).subscribe({  // Realiza la solicitud HTTP para obtener la clasificación
      next: (data) => { // Maneja la respuesta de la API
        console.log('Datos recibidos:', data);  // Muestra los datos recibidos de la API en la consola para depuración
        if (data?.response?.length) { // Verifica si hay datos disponibles en la respuesta
          this.clasificacion = data.response[0]?.league?.standings?.[0] || []; // Obtiene la clasificación del primer elemento de la respuesta
          this.errorMessage = ''; // Limpia el mensaje de error si la clasificación se carga correctamente
        } else {
          this.errorMessage = 'No hay datos disponibles'; // Mensaje de error si no hay datos disponibles
          this.clasificacion = [];  // Limpia la clasificación si no hay datos
        }
      },
      error: (error) => { // Maneja el error de la API
        console.error('Error en la API:', error); // Muestra un mensaje de error si la API falla
        this.errorMessage = 'Error al cargar los datos';  // Mensaje de error si no se pueden cargar los datos
        this.clasificacion = [];  // Limpia la clasificación en caso de error
      }
    });
  }

  //Metodo para asignar el color del numero dependiendo del torneo al que se clasifica el equipo o desciende
  getBadgeClass(description: string): string {
  switch (description) {
    case 'Champions League':
      return 'bg-champions';
    case 'Promotion - Champions League (Group Stage: )':
      return 'bg-champions';
    case 'UEFA Europa League':
      return 'bg-europa';
    case 'Promotion - Europa League (Group Stage: )':
      return 'bg-europa';
    case 'Conference League Qualification':
      return 'bg-conference';
    case 'Promotion - Europa Conference League (Qualification: )':
      return 'bg-conference';
    case 'Relegation':
      return 'bg-relegation';
    case 'Relegation - LaLiga2':
      return 'bg-relegation';
    default:
      return 'bg-secondary';
  }
}

}
