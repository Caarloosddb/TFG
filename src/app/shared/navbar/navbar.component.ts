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
  searchTerm: string = '';
  // Declaramos user$ usando el auth que inyectamos
  user$: Observable<User | null>;

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
  const query = this.searchTerm.trim();
  if (!query) return;

  const teamUrl = `https://v3.football.api-sports.io/teams?search=${encodeURIComponent(query)}`;
  const headers = this.headers;

  this.http.get<any>(teamUrl, { headers }).subscribe({
    next: (data) => {
      const team = data?.response?.[0]?.team;
      if (team?.id) {
        this.router.navigate(['/equipo', team.id]);
      } else {
        // No encontró equipo, intentar buscar jugador en una liga general (como LaLiga)
        this.buscarJugador(query);
      }
    },
    error: (error) => {
      console.error('Error buscando equipo:', error);
      alert('Error al buscar equipo');
      this.searchTerm = '';
    }
  });
}

private buscarJugador(nombre: string): void {
  const leagueId = 140; // Ej: LaLiga
  const season = 2024;
  const url = `https://v3.football.api-sports.io/players?search=${encodeURIComponent(nombre)}&league=${leagueId}&season=${season}`;

  this.http.get<any>(url, { headers: this.headers }).subscribe({
    next: (data) => {
      const jugador = data?.response?.[0]?.player;
      if (jugador?.id) {
        this.router.navigate(['/jugador', jugador.id]);
      } else {
        alert('No se encontró equipo ni jugador con ese nombre');
      }
    },
    error: (error) => {
      console.error('Error buscando jugador:', error);
      alert('Error al buscar jugador');
    },
    complete: () => {
      this.searchTerm = '';
    }
  });
}



  logout(): void {
    this.auth.logout();
    this.router.navigate(['/login']);
  }
}
