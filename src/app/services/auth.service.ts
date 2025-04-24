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
  updateProfile
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
    return from(updatePassword(this.firebaseAuth.currentUser!, newPassword).then(() => {}));
  }

  updateUserProfile(displayName: string, photoURL: string): Observable<void> {
    return from(updateProfile(this.firebaseAuth.currentUser!, { displayName, photoURL }).then(() => {}));
  }
  
}