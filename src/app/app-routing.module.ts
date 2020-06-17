import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { PoliticaPrivComponent } from './politica-priv/politica-priv.component';
import { AppInicioComponent } from './app-inicio/app-inicio.component';
import { RegistroComponent } from './registro/registro.component';
import { AuthGuardService } from './servicios/auth-guard.service';


const routes: Routes = [

    { path: 'home/Redhubs/login', component: LoginComponent },
    { path: 'home/Redhubs/polPriva', component: PoliticaPrivComponent },
    { path: 'home/Redhubs/registro', component: RegistroComponent },
    { path: 'home/Redhubs/inicio/:idUsu', component: AppInicioComponent, canActivate: [AuthGuardService] }, // Necesario auth, poner el id si eso en url
    { path: 'home/Redhubs', component: AppComponent },
    { path: '**', redirectTo: 'home/Redhubs/login' }

    /*
    {
        path: 'home/Redhubs/polPriva', component: PoliticaPrivComponent,
        pathMatch: 'full'
    },
    */

    /*
    {
        // ruta general
        path: 'home/Redhubs', component: AppComponent,
        pathMatch: 'full'          // la ruta debe de coincidir exactamente
        // Componente al que le ponemos lo de las rutas
    },
    {
        // en la primera ruta, nos vamos al login
        path: '',                   // ruta de inicio '/'
        pathMatch: 'full',          // la ruta debe de coincidir exactamente
        redirectTo: 'home/Redhubs'    // Ir al login
    },
    {
        // nota: este path debe de estar siempre el ultimo
        path: '**',
        redirectTo: 'home/Redhubs'

        // Cualquier otra ruta del programa que se dirijira al login
        // Nota: poner si eso una pantalla de no encontrado (como lo de 404 not found)

    }
    */


];


@NgModule({
    imports: [
        RouterModule.forRoot(routes)
    ],
    exports: [RouterModule]
})
export class AppRoutingModule { }
