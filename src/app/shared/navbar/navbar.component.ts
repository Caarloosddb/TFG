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

  async onSearch(): Promise<void> {
    const q = this.searchTerm.trim();
    if (!q) return;

    try {
      const url = `https://v3.football.api-sports.io/teams?search=${encodeURIComponent(q)}`;
      const data: any = await this.http.get<any>(url, { headers: this.headers }).toPromise();
      const resp = data.response;
      if (resp?.length) {
        const team = resp[0].team;
        this.router.navigate(['/equipo', team.id]);
      } else {
        alert('Equipo no encontrado');
      }
    } catch (err) {
      console.error('Error buscando equipo:', err);
      alert('Error al buscar equipo');
    } finally {
      this.searchTerm = '';
    }
  }

  logout(): void {
    this.auth.logout();
    this.router.navigate(['/login']);
  }
}
