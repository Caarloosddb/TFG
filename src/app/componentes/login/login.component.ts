import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { ThemeService } from '../../core/theme.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink, CommonModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loginForm: FormGroup;
  error: string | null = null;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    public themeService: ThemeService
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  // Método para manejar el envío del formulario de inicio de sesión
  onSubmit(): void {
    const { email, password } = this.loginForm.value; // Obtiene los valores del formulario
    this.authService.login(email, password).subscribe({ // Se suscribe al servicio de autenticación
      next: () => this.router.navigate(['/home']),  // Si el inicio de sesión es exitoso, redirige al usuario a la página de inicio
      error: () => this.error = 'Credenciales incorrectas'  // Si hay un error, muestra un mensaje de error
    });
  }

  // Método para manejar el inicio de sesión con Google
  loginWithGoogle(): void {
    this.authService.loginWithGoogle().subscribe({  // Se suscribe al servicio de autenticación para iniciar sesión con Google
      next: () => this.router.navigate(['/home']),  // Si el inicio de sesión es exitoso, redirige al usuario a la página de inicio
      error: () => this.error = 'Error con Google'  // Si hay un error, muestra un mensaje de error
    });
  }
}