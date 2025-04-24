import { Component , OnInit} from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { RouterLink } from '@angular/router';
import { User } from '@angular/fire/auth';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-navbar',
  imports: [RouterLink, CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent implements OnInit {

  user$: Observable<User | null>;

  constructor(private authService: AuthService, private router: Router) {

    this.user$ = this.authService.user$;
  }

  logout() {
    this.authService.logout().subscribe(() => {
      this.router.navigate(['/home']); 
    });
  }

  ngOnInit(): void {}

}
