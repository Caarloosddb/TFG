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
  updatePassword
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

  login(email: string, password: string): Observable<void> {
    return from(
      signInWithEmailAndPassword(this.firebaseAuth, email, password).then(() => {})
    );
  }

  register(email: string, password: string): Observable<void> {
    return from(
      createUserWithEmailAndPassword(this.firebaseAuth, email, password).then(() => {})
    );
  }

  loginWithGoogle(): Observable<void> {
    const provider = new GoogleAuthProvider();
    return from(
      signInWithPopup(this.firebaseAuth, provider).then(() => {})
    );
  }

  logout(): Observable<void> {
    return from(
      signOut(this.firebaseAuth).then(() => {
        sessionStorage.clear();
      })
    );
  }

  updatePassword(newPassword: string): Observable<void> {
    const currentUser = this.firebaseAuth.currentUser;
    if (currentUser) {
      return from(updatePassword(currentUser, newPassword).then(() => {}));
    } else {
      throw new Error('No hay ningun usuaruio iniciado.');
    }
  }
}