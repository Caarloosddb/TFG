import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  Validators
} from '@angular/forms';
import { NavbarComponent } from '../../shared/navbar/navbar.component';
import { FooterComponent } from '../../shared/footer/footer.component';
import { AuthService } from '../../services/auth.service';
import { User } from 'firebase/auth';

interface Favorite {
  type: 'team' | 'player';
  name: string;
}

@Component({
  selector: 'app-usuario',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NavbarComponent,
    FooterComponent
  ],
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.scss']
})
export class UsuarioComponent implements OnInit {
  // Definimos las propiedades del usuario y sus favoritos
  user: User | null = null;
  userEmail = '';
  profilePic: string | ArrayBuffer = '';
  favorites: Favorite[] = [
    { type: 'team',   name: 'FC Barcelona' },
    { type: 'player', name: 'Lionel Messi' },
    { type: 'team',   name: 'Manchester City' },
    { type: 'player', name: 'Kevin De Bruyne' },
  ];

  passwordForm: FormGroup;
  profileForm: FormGroup;
  isUpdatingPassword = false;
  isUpdatingProfile = false;

  constructor(
    private auth: AuthService,
    private fb: FormBuilder
  ) {
    this.passwordForm = this.fb.group({
      currentPassword: ['', Validators.required],
      newPassword: ['', [Validators.required, Validators.minLength(8)]]
    });

    this.profileForm = this.fb.group({
      username: ['', Validators.required],
      notificationsEnabled: [false]
    });
  }

  ngOnInit() {
    this.auth.user$.subscribe(user => {
      this.user = user;
      this.userEmail = user?.email ?? '';
      this.profilePic = user?.photoURL ?? '';
      this.profileForm.patchValue({
        username: user?.displayName ?? '',
        notificationsEnabled: false
      });
    });
  }

  onFileSelected(evt: Event) {
    const input = evt.target as HTMLInputElement;
    if (!input.files?.length) return;
    const file = input.files[0];
    const reader = new FileReader();
    reader.onload = () => this.profilePic = reader.result!;
    reader.readAsDataURL(file);
  }

  async onSubmitPassword() {
    if (this.passwordForm.invalid) {
      this.passwordForm.markAllAsTouched();
      return;
    }
    this.isUpdatingPassword = true;
    const { newPassword } = this.passwordForm.value;

    try {
      await this.auth.updatePassword(newPassword);
      alert('✅ Contraseña actualizada correctamente');
    } catch (err: any) {
      alert('❌ ' + (err.message || 'Error inesperado'));
    } finally {
      this.isUpdatingPassword = false;
    }
  }

  async onSubmitProfile() {
    if (this.profileForm.invalid) {
      this.profileForm.markAllAsTouched();
      return;
    }
    this.isUpdatingProfile = true;
    const { username } = this.profileForm.value;

    try {
      await this.auth.updateUserProfile(username, this.profilePic as string);
      alert('✅ Perfil actualizado correctamente');
    } catch (err: any) {
      alert('❌ ' + (err.message || 'Error actualizando perfil'));
    } finally {
      this.isUpdatingProfile = false;
    }
  }
}
