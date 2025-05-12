import { Routes } from '@angular/router';
import { LoginComponent } from './componentes/login/login.component';
import { AuthGuard } from './guards/auth.guard';
import { RegisterComponent } from './componentes/register/register.component';
import { HomeComponent } from './componentes/home/home.component';
import { UsuarioComponent } from './componentes/usuario/usuario.component';

import { EquiposComponent } from './componentes/ejemplo/equipos.component';
import { FutbolPartidosComponent } from './componentes/Fut/futbol-partidos/futbol-partidos.component';
import { FutbolClasificacionComponent } from './componentes/Fut/futbol-clasificacion/futbol-clasificacion.component';



export const routes: Routes = [
    {path: 'login', component: LoginComponent},
    {path: 'register', component: RegisterComponent},
    {path: 'equipos', component: EquiposComponent},
    {path: 'home', component: HomeComponent},
    {path: 'usuario', component: UsuarioComponent, canActivate: [AuthGuard]},
    {path: 'futbol/:endpoint/:leagueId/:season/:round', component: FutbolPartidosComponent},
    {path: 'clasificacion/:leagueId/:season', component: FutbolClasificacionComponent},

    {path: '', redirectTo: 'home', pathMatch: 'full'},
    {path: '**', redirectTo: 'home'},
    //canActivate: [AuthGuard]
];