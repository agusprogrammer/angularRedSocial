import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { PoliticaPrivComponent } from './politica-priv/politica-priv.component';
import { AppInicioComponent } from './app-inicio/app-inicio.component';
import { RegistroComponent } from './registro/registro.component';
import { AuthGuardService } from './servicios/auth-guard.service';


const routes: Routes = [

    { path: 'home/Network/login', component: LoginComponent },
    { path: 'home/Network/polPriva', component: PoliticaPrivComponent },
    { path: 'home/Network/registro', component: RegistroComponent },
    { path: 'home/Network/inicio/:idUsu', component: AppInicioComponent, canActivate: [AuthGuardService] }, // Necesario auth, poner el id si eso en url
    { path: 'home/Network', component: AppComponent },
    { path: '**', redirectTo: 'home/Network/login' }

    /*
    {
        path: 'home/Network/polPriva', component: PoliticaPrivComponent,
        pathMatch: 'full'
    },
    */

    /*
    {
        // ruta general
        path: 'home/Network', component: AppComponent,
        pathMatch: 'full'          // la ruta debe de coincidir exactamente
        // Componente al que le ponemos lo de las rutas
    },
    {
        // en la primera ruta, nos vamos al login
        path: '',                   // ruta de inicio '/'
        pathMatch: 'full',          // la ruta debe de coincidir exactamente
        redirectTo: 'home/Network'    // Ir al login
    },
    {
        // nota: este path debe de estar siempre el ultimo
        path: '**',
        redirectTo: 'home/Network'

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
