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

  temporadasEl: any[] = ['2023', '2022', '2021']; // Temporadas de la Euroliga
  temporadasACB: any[] = ['2023-2024', '2022-2023', '2021-2022']; // Temporadas de la ACB
  temporadas: any[] = []; // Lista de temporadas que se mostrará al usuario

  selectedTemporada!: string; // Temporada seleccionada por el usuario

  clasificacion: any[] = [];  // Clasificación de baloncesto

  leagueId!: number;  // ID de la liga (117 para ACB, 120 para Euroliga)
  season!: string;  // Temporada seleccionada por el usuario

  errorMessage: string = '';  // Mensaje de error en caso de que no se encuentren datos o haya un error en la API

  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    private router: Router,
    public themeService: ThemeService
  ) {}

  ngOnInit(): void {
      this.route.params.subscribe(params => {
      this.leagueId = +params['leagueId'];  // Obtiene el ID de la liga desde los parámetros de la ruta y lo convierte a número
      this.season = params['season']; // Obtiene la temporada desde los parámetros de la ruta

      if(this.leagueId === 117){  // Si la liga es ACB
        this.temporadas = this.temporadasACB  // Asigna las temporadas de la ACB a la lista de temporadas
      }else {
        this.temporadas = this.temporadasEl // Asigna las temporadas de la Euroliga a la lista de temporadas
      }

      this.selectedTemporada = this.season; // Establece la temporada seleccionada por el usuario
      this.cargarClasificacion(); // Llama a la función para cargar la clasificación de baloncesto
    });
  }

    onFiltroCambio(): void {
    this.season = this.selectedTemporada; // Actualiza la temporada con la seleccionada por el usuario
    this.actualizarRuta();  // Actualiza la ruta para reflejar el cambio de temporada
  }

  actualizarRuta(): void {
    this.router.navigate(['/baloncesto-clasificacion', this.leagueId, this.season]);  // Navega a la ruta actualizada con el ID de la liga y la temporada seleccionada
  }

  cargarClasificacion(): void {
  // API Key
  const headers = new HttpHeaders({
    'x-apisports-key': '4fd2512f15f791542e09ceb9073e2159'
  });

  const url = `https://v1.basketball.api-sports.io/standings?league=${this.leagueId}&season=${this.season}`;  // URL de la API para obtener la clasificación de baloncesto
  
  console.log('Requesting URL:', url);  // Muestra la URL solicitada en la consola para depuración

  this.http.get<any>(url, { headers }).subscribe({  // Realiza la solicitud a la API
    next: (data) => {   // Maneja la respuesta de la API
      console.log('Datos recibidos:', data);  // Muestra los datos recibidos de la API en la consola para depuración
      if (data?.response?.length) { // Comprueba si hay datos en la respuesta de la API
        this.clasificacion = data.response; // Asigna los datos de la clasificación a la variable clasificacion
        this.errorMessage = ''; // Limpia el mensaje de error si hay datos disponibles
      } else {
        this.errorMessage = 'No hay datos disponibles'; // Mensaje de error si no hay datos disponibles
        this.clasificacion = [];  // Limpia la lista de clasificación si no hay datos
      }
    },
    error: (error) => { // Maneja el error de la API
      console.error('Error en la API:', error); // Muestra un mensaje de error si la API falla
      this.errorMessage = 'Error al cargar los datos';  // Mensaje de error si la API falla
      this.clasificacion = [];  // Limpia la lista de clasificación en caso de error
    }
  });
}

}
