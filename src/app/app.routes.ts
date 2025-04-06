import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './guards/auth.guard';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';
import { FutbolComponent } from './futbol/futbol.component';
import { EquiposComponent } from './equipos/equipos.component';
import { PartidosComponent } from './liga-espanola/partidos/partidos.component';
import { PartidosComponent as PremierPartidosComponent } from './premier/partidos/partidos.component';
import { PartidosComponent as BundesligaPartidosComponent } from './bundesliga/partidos/partidos.component';
import { PartidosComponent as SerieAPartidosComponent } from './serie-a/partidos/partidos.component';
import { PartidosComponent as Ligue1PartidosComponent } from './ligue-1/partidos/partidos.component';
import { ClasificacionComponent } from './liga-espanola/clasificacion/clasificacion.component';
import { ClasificacionComponent as PremierClasificacionComponent } from './premier/clasificacion/clasificacion.component';
import { ClasificacionComponent as BundesligaClasificacionComponent } from './bundesliga/clasificacion/clasificacion.component';
import { ClasificacionComponent as SerieAClasificacionComponent } from './serie-a/clasificacion/clasificacion.component';
import { ClasificacionComponent as Ligue1ClasificacionComponent } from './ligue-1/clasificacion/clasificacion.component';
import { CopaDelReyComponent } from './liga-espanola/copa-del-rey/copa-del-rey.component';
import { FaCupComponent } from './premier/fa-cup/fa-cup.component';
import { CarabaoCupComponent } from './premier/carabao-cup/carabao-cup.component';
import { DfbPokalComponent } from './bundesliga/dfb-pokal/dfb-pokal.component';
import { CopaItaliaComponent } from './serie-a/copa-italia/copa-italia.component';
import { CopaDeFranciaComponent } from './ligue-1/copa-de-francia/copa-de-francia.component';

export const routes: Routes = [
    {path: 'login', component: LoginComponent},
    {path: 'register', component: RegisterComponent},
    {path: 'home', component: HomeComponent},
    {path: 'futbol', component: FutbolComponent,
        children: [
            {path: 'liga-espanola/partidos', component: PartidosComponent},
            {path: 'liga-espanola/clasificacion', component: ClasificacionComponent},
            {path: 'liga-espanola/copa-del-rey', component: CopaDelReyComponent},

            {path: 'premier/partidos', component: PremierPartidosComponent},
            {path: 'premier/clasificacion', component: PremierClasificacionComponent},
            {path: 'premier/fa-cup', component: FaCupComponent},
            {path: 'premier/carabao-cup', component: CarabaoCupComponent},

            {path: 'bundesliga/partidos', component: BundesligaPartidosComponent},
            {path: 'bundesliga/clasificacion', component: BundesligaClasificacionComponent},
            {path: 'bundesliga/dfb-pokal', component: DfbPokalComponent},

            {path: 'serie-a/partidos', component: SerieAPartidosComponent},
            {path: 'serie-a/clasificacion', component: SerieAClasificacionComponent},
            {path: 'serie-a/copa-italia', component: CopaItaliaComponent},

            {path: 'ligue-1/partidos', component: Ligue1PartidosComponent},
            {path: 'ligue-1/clasificacion', component: Ligue1ClasificacionComponent},
            {path: 'ligue-1/copa-de-francia', component: CopaDeFranciaComponent},
        ]
    },
    {path: 'equipos', component: EquiposComponent},


    {path: '', redirectTo: 'home', pathMatch: 'full'},
    {path: '**', redirectTo: 'home'},
    //canActivate: [AuthGuard]
];
