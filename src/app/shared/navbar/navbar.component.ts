import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule }  from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User }       from 'firebase/auth';
import { ThemeService } from '../../core/theme.service';
import { AuthService }  from '../../services/auth.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    HttpClientModule
  ],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {

  searchTerm: string = '';  // Término de búsqueda introducido por el usuario

  suggestions: { id: number, name: string, logo?: string, type: 'team' | 'player' }[] = []; // Sugerencias de equipos o jugadores basadas en el término de búsqueda

  // Declaramos user$ usando el auth que inyectamos
  user$: Observable<User | null>;

  //Api Key
  private headers = new HttpHeaders({
    'x-apisports-key': '4fd2512f15f791542e09ceb9073e2159'
  });

  constructor(
    public themeService: ThemeService,
    private auth: AuthService,  
    private router: Router,
    private http: HttpClient
  ) {
    // Asignamos la propiedad user$ tras inyectar auth
    this.user$ = this.auth.user$;
  }

onSearch(): void {
  // Verifica si el término de búsqueda no está vacío
  const query = this.searchTerm.trim();
  if (!query) return;

  const teamUrl = `https://v3.football.api-sports.io/teams?search=${encodeURIComponent(query)}`;  // URL para buscar equipos
  const headers = this.headers; 

  this.http.get<any>(teamUrl, { headers }).subscribe({
    next: (data) => { // Maneja la respuesta de la API
      const team = data?.response?.[0]?.team; // Obtiene el primer equipo de la respuesta
      if (team?.id) { // Si se encuentra un equipo con ID
        this.router.navigate(['/equipo', team.id]); // Navega a la página del equipo
      } else {  
        this.buscarJugador(query);  // Si no se encuentra un equipo, busca un jugador con el mismo término
      }
    },
    error: (error) => {
      console.error('Error buscando equipo:', error); // Muestra un mensaje de error en la consola si la búsqueda falla
      alert('Error al buscar equipo');  // Muestra un mensaje de alerta al usuario
      this.searchTerm = ''; // Limpia el término de búsqueda
    }
  });
}

buscarJugador(nombre: string): void {
  const leagueId = 140;
  const season = 2024;
  const url = `https://v3.football.api-sports.io/players?search=${encodeURIComponent(nombre)}&league=${leagueId}&season=${season}`; // URL para buscar jugadores

  this.http.get<any>(url, { headers: this.headers }).subscribe({
    next: (data) => {
      const jugador = data?.response?.[0]?.player;  // Obtiene el primer jugador de la respuesta
      if (jugador?.id) {  
        this.router.navigate(['/jugador', jugador.id]); // Navega a la página del jugador si se encuentra un ID
      } else {
        alert('No se encontró equipo ni jugador con ese nombre'); // Muestra un mensaje de alerta si no se encuentra ni equipo ni jugador
      }
    },
    error: (error) => { // Maneja el error de la API
      console.error('Error buscando jugador:', error);  // Muestra un mensaje de error en la consola si la búsqueda falla
      alert('Error al buscar jugador'); // Muestra un mensaje de alerta al usuario
    },
    // Limpia el término de búsqueda al completar la búsqueda
    complete: () => { 
      this.searchTerm = '';
    }
  });
}

onSearchChange(): void {
  const query = this.searchTerm.trim(); // Elimina espacios al inicio y al final del término de búsqueda
  if (query.length < 2) { // Si el término de búsqueda tiene menos de 2 caracteres
    this.suggestions = [];  // Limpia las sugerencias si el término de búsqueda es menor a 2 caracteres
    return;
  }

  const teamUrl = `https://v3.football.api-sports.io/teams?search=${encodeURIComponent(query)}`;  // URL para buscar equipos
  const playerUrl = `https://v3.football.api-sports.io/players?search=${encodeURIComponent(query)}&league=140&season=2024`; // URL para buscar jugadores en la liga 140 y temporada 2024

  // Ejecutar ambas peticiones en paralelo
  Promise.all([
    this.http.get<any>(teamUrl, { headers: this.headers }).toPromise(), // Petición para buscar equipos
    this.http.get<any>(playerUrl, { headers: this.headers }).toPromise()  // Petición para buscar jugadores
  ])
  .then(([teamsRes, playersRes]) => {
    const teamSuggestions = (teamsRes.response || []).map((item: any) => ({ // Mapea los equipos obtenidos de la respuesta
      id: item.team.id, // ID del equipo
      name: item.team.name, // Nombre del equipo
      logo: item.team.logo, // Logo del equipo
      type: 'team'  // Tipo de sugerencia, en este caso 'team'
    }));

    const playerSuggestions = (playersRes.response || []).slice(0, 5).map((item: any) => ({ // Limita a 5 jugadores las sugerencias
      id: item.player.id, // ID del jugador 
      name: item.player.name, // Nombre del jugador
      logo: item.player.photo,  // Foto del jugador
      type: 'player'  // Tipo de sugerencia, en este caso 'player'
    }));

    this.suggestions = [...teamSuggestions, ...playerSuggestions];  // Combina las sugerencias de equipos y jugadores
  })
  .catch((error) => {
    console.error('Error buscando sugerencias:', error);  // Muestra un mensaje de error en la consola si la búsqueda falla
    this.suggestions = [];  // Limpia las sugerencias en caso de error
  });
}

onSuggestionClick(item: { id: number, type: 'team' | 'player' }) {
  this.suggestions = [];  //Array de sugerencias vacío
  this.searchTerm = ''; 

  if (item.type === 'team') { // Si el tipo es 'team', navega a la página del equipo junto a su ID
    this.router.navigate(['/equipo', item.id]);   
  } else {  // Si el tipo es 'player', navega a la página del jugador junto a su ID
    this.router.navigate(['/jugador', item.id]);
  }
}

  //Metodo para cerrar sesión
  logout(): void {
    this.auth.logout();
    this.router.navigate(['/login']);
  }
}
