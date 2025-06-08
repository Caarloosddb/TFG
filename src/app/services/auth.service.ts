import { Injectable } from '@angular/core';
import {
  Auth,
  browserSessionPersistence,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  user,
  User,
  setPersistence,
  updatePassword,
  updateProfile,
  UserCredential
} from '@angular/fire/auth';
import { from, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  user$: Observable<User | null>;

  constructor(private firebaseAuth: Auth) {
    this.user$ = user(this.firebaseAuth);
    this.setSessionStoragePersistence();
  }

  private async setSessionStoragePersistence(): Promise<void> {
    await setPersistence(this.firebaseAuth, browserSessionPersistence);
  }

  //Logica de registro de usarios mediante email y contraseña
  login(email: string, password: string): Observable<void> {
    return from(
      signInWithEmailAndPassword(this.firebaseAuth, email, password).then(() => {})
    );
  }
  //Logica de registro de usarios mediante email y contraseña
  register(email: string, password: string): Observable<UserCredential> {
    return from(
      createUserWithEmailAndPassword(this.firebaseAuth, email, password)
    );
  }

  //Logica de registro de usarios mediante Google
  loginWithGoogle(): Observable<void> {
    const provider = new GoogleAuthProvider();
    return from(
      signInWithPopup(this.firebaseAuth, provider).then(() => {})
    );
  }

  //Logica de cerrar sesión
  logout(): Observable<void> {
    return from(
      signOut(this.firebaseAuth).then(() => {
        sessionStorage.clear();
      })
    );
  }

  //Logica para modificar conntraseña
  updatePassword(newPassword: string): Observable<void> {
    return from(updatePassword(this.firebaseAuth.currentUser!, newPassword).then(() => {}));
  }

  //Logica para modificar la foto de perfil y nombre de usuario
  updateUserProfile(displayName: string, photoURL: string): Observable<void> {
    return from(updateProfile(this.firebaseAuth.currentUser!, { displayName, photoURL }).then(() => {}));
  }
  
}