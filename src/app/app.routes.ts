import { Routes } from '@angular/router';
import { LoginComponent } from './componentes/login/login.component';
import { AuthGuard } from './guards/auth.guard';
import { RegisterComponent } from './componentes/register/register.component';
import { HomeComponent } from './componentes/home/home.component';
import { UsuarioComponent } from './componentes/usuario/usuario.component';

import { EquiposComponent } from './componentes/ejemplo/equipos.component';
import { FutbolPartidosComponent } from './componentes/Fut/futbol-partidos/futbol-partidos.component';
import { FutbolClasificacionComponent } from './componentes/Fut/futbol-clasificacion/futbol-clasificacion.component';
import { NbaPartidosComponent } from './componentes/NBA/nba-partidos/nba-partidos.component';
import { NbaClasificacionComponent } from './componentes/NBA/nba-clasificacion/nba-clasificacion.component';
import { F1CarrerasComponent } from './componentes/F1/f1-carreras/f1-carreras.component';
import { F1ClasificacionComponent } from './componentes/F1/f1-clasificacion/f1-clasificacion.component';



export const routes: Routes = [
    {path: 'login', component: LoginComponent},
    {path: 'register', component: RegisterComponent},
    {path: 'equipos', component: EquiposComponent},
    {path: 'home', component: HomeComponent},
    {path: 'usuario', component: UsuarioComponent, canActivate: [AuthGuard]},

    /* Futbol */
    {path: 'futbol/:endpoint/:leagueId/:season/:round', component: FutbolPartidosComponent},
    {path: 'clasificacion/:leagueId/:season', component: FutbolClasificacionComponent},

    /* NBA */
    {path: 'nba', component: NbaPartidosComponent},
    {path: 'nba-clasificacion', component: NbaClasificacionComponent},

    /* F1 */
    {path: 'f1', component: F1CarrerasComponent},
    {path: 'f1-clasificacion', component: F1ClasificacionComponent},

    {path: '', redirectTo: 'home', pathMatch: 'full'},
    {path: '**', redirectTo: 'home'},
    //canActivate: [AuthGuard]
];