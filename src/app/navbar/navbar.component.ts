// src/app/navbar/navbar.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { ThemeService } from '../core/theme.service';
import { AuthService } from '../../app/services/auth.service';
import { User } from 'firebase/auth';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [ CommonModule, RouterLink ],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  user$: Observable<User | null>;

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
