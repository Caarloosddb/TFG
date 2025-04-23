import { Routes } from '@angular/router';
import { LoginComponent } from './componentes/login/login.component';
import { AuthGuard } from './guards/auth.guard';
import { RegisterComponent } from './componentes/register/register.component';
import { HomeComponent } from './componentes/home/home.component';
import { FutbolComponent } from './componentes/futbol/futbol.component';
import { EquiposComponent } from './componentes/equipos/equipos.component';


export const routes: Routes = [
    {path: 'login', component: LoginComponent},
    {path: 'register', component: RegisterComponent},
    {path: 'equipos', component: EquiposComponent},
    {path: 'home', component: HomeComponent},
    {path: 'futbol', component: FutbolComponent},


    {path: '', redirectTo: 'home', pathMatch: 'full'},
    {path: '**', redirectTo: 'home'},
    //canActivate: [AuthGuard]
];