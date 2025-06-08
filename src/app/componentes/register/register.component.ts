import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { ThemeService } from '../../core/theme.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  registerForm: FormGroup;
  error: string | null = null;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    public themeService: ThemeService 
  ) {
    this.registerForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]], //Campo de email con validacion de email
      password: ['', [Validators.required, Validators.minLength(6)]]  //Campo de contraseña con validacion de minimo 6 caracteres
    });
  }

  //Logica de registro de usuario
  onRegister(): void {
    if (this.registerForm.invalid) return;  //Si el formulario es invalido no hace nada
    const { email, password } = this.registerForm.value;  
    this.authService.register(email, password).subscribe({  //Se suscribe al servicio de autenticación para registrar al usuario
      next: () => {
        this.router.navigateByUrl('/profile-setup');  //Si la informacion es correcta redirige al usuario a la configuracion de perfil
      },
      error: () => {
        this.error = 'Error al registrar usuario';  //Si hay un error muestra un mensaje de error
      }
    });
  }

  //Registro con google manejo de errores y si es correcto redirige al usuario a la configuracion de perfil
    loginWithGoogle(): void {
    this.authService.loginWithGoogle().subscribe({
      next: () => this.router.navigate(['/profile-setup']),
      error: () => this.error = 'Error con Google'
    });
  }
}
