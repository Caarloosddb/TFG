import { Component }    from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink }   from '@angular/router';
import { ThemeService } from '../core/theme.service';
import { AuthService }  from '../../app/services/auth.service';
import { Observable }   from 'rxjs';
import { User }         from '../componentes/usuario/usuario.component'; // ajústalo según tu modelo

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [ CommonModule, RouterLink ],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  // expone el observable de usuario
  user$: Observable<User | null>;

  // inyecta los servicios, ojo al public en themeService
  constructor(
    public themeService: ThemeService,
    private auth: AuthService
  ) {
    this.user$ = this.auth.user$;
  }

  logout(): void {
    this.auth.logout();
  }
}
