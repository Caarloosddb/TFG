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
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  onRegister(): void {
    if (this.registerForm.invalid) return;
    const { email, password } = this.registerForm.value;
    this.authService.register(email, password).subscribe({
      next: () => {
        this.router.navigateByUrl('/profile-setup');
      },
      error: () => {
        this.error = 'Error al registrar usuario';
      }
    });
  }
    loginWithGoogle(): void {
    this.authService.loginWithGoogle().subscribe({
      next: () => this.router.navigate(['/profile-setup']),
      error: () => this.error = 'Error con Google'
    });
  }
}
