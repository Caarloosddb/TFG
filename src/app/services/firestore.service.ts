import { Injectable } from '@angular/core';
import { Firestore, doc, setDoc } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {

  constructor(private firestore: Firestore) { }
  
  //Logica para las preferncias de usuario de nacion equipo y jugador
  createUserProfile(
    uid: string,
    data: { nationality: string; favoriteTeam: string; favoritePlayer: string; }
  ): Promise<void> {
    const ref = doc(this.firestore, `users/${uid}`);
    return setDoc(ref, data);
  }
}
