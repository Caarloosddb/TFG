import { Routes } from '@angular/router';
import { LoginComponent } from './componentes/login/login.component';
import { AuthGuard } from './guards/auth.guard';
import { RegisterComponent } from './componentes/register/register.component';
import { HomeComponent } from './componentes/home/home.component';
import { UsuarioComponent } from './componentes/usuario/usuario.component';

import { FutbolPartidosComponent } from './componentes/Fut/futbol-partidos/futbol-partidos.component';
import { FutbolClasificacionComponent } from './componentes/Fut/futbol-clasificacion/futbol-clasificacion.component';
import { FutbolEquipoDetalleComponent } from './componentes/Fut/futbol-equipo-detalle/futbol-equipo-detalle.component';
import { FutbolPartidoDetalleComponent } from './componentes/Fut/futbol-partido-detalle/futbol-partido-detalle.component';

import { NbaPartidosComponent } from './componentes/NBA/nba-partidos/nba-partidos.component';
import { NbaClasificacionComponent } from './componentes/NBA/nba-clasificacion/nba-clasificacion.component';




export const routes: Routes = [
    {path: 'login', component: LoginComponent},
    {path: 'register', component: RegisterComponent},
    {path: 'home', component: HomeComponent},
    {path: 'usuario', component: UsuarioComponent, canActivate: [AuthGuard]},

    /* Futbol */
    {path: 'futbol/:endpoint/:leagueId/:season/:round', component: FutbolPartidosComponent},
    {path: 'clasificacion/:leagueId/:season', component: FutbolClasificacionComponent},
    {path: 'equipo/:teamId', component: FutbolEquipoDetalleComponent},
    {path: 'partido/:matchId', component: FutbolPartidoDetalleComponent},


    /* NBA */
    {path: 'nba', component: NbaPartidosComponent},
    {path: 'nba-clasificacion', component: NbaClasificacionComponent},

    {path: '', redirectTo: 'home', pathMatch: 'full'},
    {path: '**', redirectTo: 'home'},
    //canActivate: [AuthGuard]
];