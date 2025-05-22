import { Routes } from '@angular/router';
import { LoginComponent } from './componentes/login/login.component';
import { AuthGuard } from './guards/auth.guard';
import { RegisterComponent } from './componentes/register/register.component';
import { HomeComponent } from './componentes/home/home.component';
import { UsuarioComponent } from './componentes/usuario/usuario.component';
import { ProfileSetupComponent } from './componentes/profile-setup/profile-setup.component';


import { FutbolPartidosComponent } from './componentes/Fut/futbol-partidos/futbol-partidos.component';
import { FutbolClasificacionComponent } from './componentes/Fut/futbol-clasificacion/futbol-clasificacion.component';
import { FutbolEquipoDetalleComponent } from './componentes/Fut/futbol-equipo-detalle/futbol-equipo-detalle.component';
import { FutbolPartidoDetalleComponent } from './componentes/Fut/futbol-partido-detalle/futbol-partido-detalle.component';
import { FutbolJugadorDetalleComponent } from './componentes/Fut/futbol-jugador-detalle/futbol-jugador-detalle.component';
import { FutbolPartidosDiaComponent } from './componentes/Fut/futbol-partidos-dia/futbol-partidos-dia.component';

import { NbaPartidosComponent } from './componentes/NBA/nba-partidos/nba-partidos.component';
import { NbaClasificacionComponent } from './componentes/NBA/nba-clasificacion/nba-clasificacion.component';
import { BaloncestoPartidosComponent } from './componentes/Basket/baloncesto-partidos/baloncesto-partidos.component';
import { BaloncestoClasificacionComponent } from './componentes/Basket/baloncesto-clasificacion/baloncesto-clasificacion.component';

export const routes: Routes = [
    {path: 'login', component: LoginComponent},
    {path: 'register', component: RegisterComponent},
    {path: 'profile-setup', component: ProfileSetupComponent}, 
    {path: 'home', component: HomeComponent},
    {path: 'usuario', component: UsuarioComponent, canActivate: [AuthGuard]},

    /* Futbol */
    {path: 'futbol/:endpoint/:leagueId/:season/:round', component: FutbolPartidosComponent},
    {path: 'clasificacion/:leagueId/:season', component: FutbolClasificacionComponent},
    {path: 'equipo/:teamId/:leagueId/:season', component: FutbolEquipoDetalleComponent},
    {path: 'partido/:matchId', component: FutbolPartidoDetalleComponent},
    {path: 'jugador/:playerId', component: FutbolJugadorDetalleComponent},
    {path: 'partidos-dia', component: FutbolPartidosDiaComponent},

    /* Fútbol */
    { path: 'futbol/:endpoint/:leagueId/:season/:round', component: FutbolPartidosComponent },
    { path: 'clasificacion/:leagueId/:season', component: FutbolClasificacionComponent },
    { path: 'equipo/:teamId', component: FutbolEquipoDetalleComponent },
    { path: 'partido/:matchId', component: FutbolPartidoDetalleComponent },

    /* NBA */
    { path: 'nba-partidos/:leagueId/:season', component: NbaPartidosComponent },
    { path: 'nba-clasificacion/:leagueId/:season', component: NbaClasificacionComponent },

    /* Baloncesto */
    {path: 'baloncesto-partidos/:leagueId/:season', component: BaloncestoPartidosComponent},
    {path: 'baloncesto-clasificacion/:leagueId/:season', component: BaloncestoClasificacionComponent},

    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: '**', redirectTo: 'home' }
];