import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { NavbarComponent } from '../../../shared/navbar/navbar.component';
import { FooterComponent } from '../../../shared/footer/footer.component';
import { SidebarFutbolComponent } from '../../../shared/sidebar-futbol/sidebar-futbol.component';
import { ThemeService } from '../../../core/theme.service';

@Component({
  selector: 'app-futbol-partido-detalle',
  standalone: true,
  imports: [CommonModule, RouterModule,NavbarComponent, FooterComponent, SidebarFutbolComponent],
  templateUrl: './futbol-partido-detalle.component.html',
  styleUrl: './futbol-partido-detalle.component.scss'
})
export class FutbolPartidoDetalleComponent implements OnInit{

    matchId!: number; // ID del partido que se va a mostrar

    matchInfo: any; // Información del partido
    statsInfo: any[] = [];  // Estadísticas del partido
    teamStats: any[] = [];  // Estadísticas de los equipos
    statistics: { type: string, teamA: any, teamB: any }[] = [];  // Estadísticas comparativas entre los dos equipos
    lineups: any[] = [];  // Alineaciones de los equipos
    matchEvents: any[] = [];  // Eventos del partido (goles, tarjetas, etc.)

    errorMessage = '';  // Mensaje de error en caso de que no se pueda cargar la información del partido

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private location: Location,
    public themeService: ThemeService
  ) { }

    ngOnInit(): void {
    this.route.params.subscribe(params => { 
      this.matchId = +params['matchId'];  // Obtiene el ID del partido desde los parámetros de la ruta y lo convierte a número

    console.log('Params:', this.matchId); // Muestra el ID del partido en la consola para depuración
    this.cargarPartido(); // Llama a la función para cargar la información del partido
    this.cargarEstadisticas();  // Llama a la función para cargar las estadísticas del partido
    this.cargarAlineacion();  // Llama a la función para cargar las alineaciones de los equipos
    this.cargarEventos(); // Llama a la función para cargar los eventos del partido
    });
  }

  cargarPartido(){
  // API Key
  const headers = new HttpHeaders({
    'x-apisports-key': '4fd2512f15f791542e09ceb9073e2159'
  });
  const url = `https://v3.football.api-sports.io/fixtures?id=${this.matchId}`;  // Construye la URL para solicitar la información del partido

  this.http.get<any>(url, { headers }).subscribe({
    next: (data) => { // Maneja la respuesta de la API
      console.log("Datos del partido:", data);  // Muestra en la consola los datos del partido recibidos de la API
      const response = data?.response?.[0]; // Verifica si hay datos de respuesta y toma el primer elemento
      this.matchInfo = response || null;  // Asigna la información del partido a la variable matchInfo, o null si no hay datos
    },
    error: (error) => { // Maneja el error de la API
      console.error('Error en la API:', error); // Muestra un mensaje de error si la API falla
      this.errorMessage = "Error al cargar la información del partido"; // Mensaje de error si no se puede cargar la información del partido
    }
  });
  }

  cargarEstadisticas() {
  // API Key
    const headers = new HttpHeaders({
      'x-apisports-key': '4fd2512f15f791542e09ceb9073e2159'
    });
    const url = `https://v3.football.api-sports.io/fixtures/statistics?fixture=${this.matchId}`;  // Construye la URL para solicitar las estadísticas del partido

    this.http.get<any>(url, { headers }).subscribe({  
      next: (data) => { // Maneja la respuesta de la API
        console.log("Estadísticas del partido:", data); // Muestra en la consola las estadísticas del partido recibidas de la API
        this.statsInfo = data.response || []; // Verifica si hay datos de respuesta y toma el primer elemento, o un array vacío si no hay datos
        this.teamStats = this.statsInfo;  // Asigna las estadísticas de los equipos a la variable teamStats

        const statsA = this.teamStats[0]?.statistics || []; // Obtiene las estadísticas del primer equipo (equipo A)
        const statsB = this.teamStats[1]?.statistics || []; // Obtiene las estadísticas del segundo equipo (equipo B)

        this.statistics = statsA.map((item: any) => { // Mapea las estadísticas del equipo A
          const matching = statsB.find((s: any) => s.type === item.type); // Busca la estadística correspondiente en el equipo B
          return {
            type: item.type,  // Tipo de estadística
            teamA: item.value !== null ? item.value : '-',  // Valor de la estadística del equipo A, o '-' si es null
            teamB: matching?.value !== null ? matching.value : '-'  // Valor de la estadística del equipo B, o '-' si es null
          };
        });
      },
      error: (error) => { // Maneja el error de la API
        console.error('Error en la API:', error); // Muestra un mensaje de error si la API falla
        this.errorMessage = "Error al cargar las estadísticas del partido"; // Mensaje de error si no se pueden cargar las estadísticas del partido
      }
    });
  }


  cargarAlineacion() {
  // API Key
    const headers = new HttpHeaders({
      'x-apisports-key': '4fd2512f15f791542e09ceb9073e2159'
    });
    const url = `https://v3.football.api-sports.io/fixtures/lineups?fixture=${this.matchId}`; // Construye la URL para solicitar las alineaciones de los equipos

    this.http.get<any>(url, { headers }).subscribe({  // Realiza la solicitud GET a la API de fútbol
      next: (data) => { // Maneja la respuesta de la API
        console.log("Alineaciones del partido:", data); // Muestra en la consola las alineaciones del partido recibidas de la API
        this.lineups = data.response || []; // Verifica si hay datos de respuesta y toma el primer elemento, o un array vacío si no hay datos
      },
      error: (error) => { // Maneja el error de la API
        console.error('Error cargando alineaciones:', error); // Muestra un mensaje de error si la API falla
        this.errorMessage = 'Error al cargar las alineaciones'; // Mensaje de error si no se pueden cargar las alineaciones del partido
      }
    });
  }

    cargarEventos() {
  // API Key
    const headers = new HttpHeaders({
      'x-apisports-key': '4fd2512f15f791542e09ceb9073e2159'
    });
    const url = `https://v3.football.api-sports.io/fixtures/events?fixture=${this.matchId}`;  // Construye la URL para solicitar los eventos del partido

    this.http.get<any>(url, { headers }).subscribe({  // Realiza la solicitud GET a la API de fútbol
      next: (data) => { // Maneja la respuesta de la API
        console.log("Eventos del partido:", data);  // Muestra en la consola los eventos del partido recibidos de la API
        this.matchEvents = data.response || []; // Verifica si hay datos de respuesta y toma el primer elemento, o un array vacío si no hay datos
      },  
      error: (error) => { // Maneja el error de la API
        console.error('Error cargando eventos:', error);  // Muestra un mensaje de error si la API falla
        this.errorMessage = 'Error al cargar los eventos';  // Mensaje de error si no se pueden cargar los eventos del partido
      }
    });
  }

  // Método para calcular el porcentaje de una estadística entre dos valores
  getStatPercentage(valA: any, valB: any): number { 
  const numA = parseFloat(valA?.toString().replace('%', '')); // Convierte el valor A a un número, eliminando el símbolo de porcentaje si está presente
  const numB = parseFloat(valB?.toString().replace('%', '')); // Convierte el valor B a un número, eliminando el símbolo de porcentaje si está presente
  const total = numA + numB;  // Suma los valores A y B para obtener el total
  return total ? (numA / total) * 100 : 50; // Calcula el porcentaje del valor A respecto al total, o devuelve 50 si el total es 0
}

// Método para obtener la imagen correspondiente a un evento del partido
getEventImage(event: any): string {
  if (event.type === 'Goal') { // Si el evento es un gol
    if(event.detail === 'Missed Penalty') // Si el detalle del evento es un penalti fallado
      return '/fail.png'; 
    else  // Si el detalle del evento es un gol normal o de cualquier otro tipo
    return '/goal.png'; 
  }
  if (event.type === 'Var') { // Si el evento es una revisión del VAR
    return '/var.png';  
  }
  if (event.type === 'Card') {  // Si el evento es una tarjeta
    if (event.detail === 'Yellow Card') return '/yellow-card.png';  
    if (event.detail === 'Red Card') return '/red-card.png';  
    if (event.detail === 'Second Yellow card') return '/red-card.png';
  }

  if (event.type === 'subst') { // Si el evento es un cambio de jugador
    return '/sub.png';
  }

  return 'fas fa-info-circle text-muted'; // Devuelve un icono de información si el evento no coincide con ninguno de los anteriores
}

  // Método para navegar hacia atrás en el historial de navegación
  goBack(): void {
    this.location.back();
  }

  // Métodos para filtrar los jugadores por posición
  getGoalkeeper(players: any[]): any[] {
    return players.filter(p => p.player.pos === 'G');
  }
  getDefender(players: any[]): any[] {
    return players.filter(p => p.player.pos === 'D');
  }
  getMifielder(players: any[]): any[] {
    return players.filter(p => p.player.pos === 'M');
  }
  getForward(players: any[]): any[] {
    return players.filter(p => p.player.pos === 'F');
  }


}
