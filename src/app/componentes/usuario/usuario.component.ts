import { Component } from '@angular/core';
import { NavbarComponent } from "../../navbar/navbar.component";
import { FooterComponent } from "../../footer/footer.component";
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { User } from 'firebase/auth';

@Component({
  selector: 'app-usuario',
  imports: [NavbarComponent, FooterComponent, FormsModule],
  templateUrl: './usuario.component.html',
  styleUrl: './usuario.component.scss'
})
export class UsuarioComponent {
  username: string = ''; // Aquí almacenamos el nombre del usuario
  profilePic: string  = ''; // Aquí almacenamos la URL de la foto de perfil
  userEmail: string  = '';
  newEmail: string = '';
  newPassword: string = '';
  currentPassword: string = '';

  notificationsEnabled: boolean = false;

  constructor(private authService: AuthService) {
    this.authService.user$.subscribe((user: User | null) => {
      this.userEmail = user?.email || '';
    });
  }

    // Cambiar contraseña
    updatePassword() {
      if (this.currentPassword && this.newPassword) {
        this.authService.updatePassword(this.newPassword).subscribe(() => {
          alert('Contraseña actualizada correctamente');
        }, (error) => {
          alert('Hubo un error al actualizar la contraseña: ' + error.message);
        });
      } else {
        alert('Por favor, introduce tu contraseña actual y la nueva contraseña.');
      }
    }

    actualizarPerfil() {
      this.authService.updateUserProfile(this.username, this.profilePic)
        .subscribe({
          next: () => console.log('Perfil actualizado correctamente'),
          error: err => console.error('Error al actualizar el perfil', err)
        });
    }


}
