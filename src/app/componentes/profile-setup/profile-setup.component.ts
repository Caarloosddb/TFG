import { Component, OnInit } from '@angular/core';
import { CommonModule }            from '@angular/common';
import { ReactiveFormsModule }     from '@angular/forms';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router }                  from '@angular/router';
import { FirestoreService }        from '../../services/firestore.service';
import { Auth }                    from '@angular/fire/auth';
import { ThemeService } from '../../core/theme.service';

@Component({
  selector: 'app-profile-setup',
  standalone: true, 
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './profile-setup.component.html',
  styleUrls: ['./profile-setup.component.scss']
})
export class ProfileSetupComponent implements OnInit {
  profileForm: FormGroup;
  uid!: string;
  error: string | null = null;

  constructor(
    private fb: FormBuilder,
    private firestoreService: FirestoreService,
    private auth: Auth,
    private router: Router,
    public themeService: ThemeService
  ) {
    this.profileForm = this.fb.group({
      nationality:     ['', Validators.required],   // Campo de nacionalidad con validación requerida
      favoriteTeam:    ['', Validators.required],   // Campo de equipo favorito con validación requerida
      favoritePlayer:  ['', Validators.required]  // Campo de jugador favorito con validación requerida
    });
  }

  ngOnInit(): void {
    const user = this.auth.currentUser; // Obtiene el usuario actual autenticado
    if (user) {
      this.uid = user.uid;  // Asigna el UID del usuario autenticado
    } else {
      this.router.navigate(['/register']);  // Si no hay usuario autenticado, redirige a la página de registro
    }
  }

  onCompleteProfile(): void {
    if (this.profileForm.invalid) return; // Si el formulario es inválido, no hace nada
    this.firestoreService.createUserProfile(this.uid, this.profileForm.value) // Llama al servicio Firestore para crear el perfil del usuario
      .then(() => this.router.navigate(['/home']))  // Si se guarda correctamente, redirige al usuario a la página de inicio
      .catch(() => this.error = 'Error al guardar perfil'); // Si hay un error al guardar el perfil, muestra un mensaje de error
  }
}
