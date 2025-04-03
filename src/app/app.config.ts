import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }),
     provideRouter(routes), 
     provideFirebaseApp(() => initializeApp({ 
      projectId: "tfg-bbdd-3161f",
      appId: "1:33345453442:web:9a00f860a48f25d7aaa39b", 
      storageBucket: "tfg-bbdd-3161f.firebasestorage.app", 
      apiKey: "AIzaSyCpDd1HYpbE6nxmDx9dxL_r0HH5G8prZGA", 
      authDomain: "tfg-bbdd-3161f.firebaseapp.com", 
      messagingSenderId: "33345453442" })), 
      provideAuth(() => getAuth()), provideFirestore(() => getFirestore())]
};
