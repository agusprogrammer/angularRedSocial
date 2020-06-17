import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegistroComponent } from './registro/registro.component';
import { AppRoutingModule } from './app-routing.module'; // Importamos modulo de rutas

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; // Importamos formularios

import { MatCardModule } from '@angular/material/card'; // interfaz material ------
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material'; // Necesario para el mat date picker
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatIconModule } from '@angular/material/icon';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatSelectModule } from '@angular/material/select';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatStepperModule } from '@angular/material/stepper';

import { HttpClientModule } from '@angular/common/http';
import { PoliticaPrivComponent } from './politica-priv/politica-priv.component';
import { AppInicioComponent } from './app-inicio/app-inicio.component';  // Http para servicios
import { AuthGuardService } from './servicios/auth-guard.service';       // Autentificacion usuarios

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegistroComponent,
    PoliticaPrivComponent,
    AppInicioComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,         // importamos modulo de rutas
    BrowserAnimationsModule,
    FormsModule,              // importamos forms
    ReactiveFormsModule,      // importamos forms
    HttpClientModule,         // Http para servicios
    MatCardModule,            // importamos interfaz material ----
    MatToolbarModule,
    MatCheckboxModule,
    MatDatepickerModule, MatNativeDateModule,
    MatInputModule,
    MatFormFieldModule,
    MatAutocompleteModule,
    MatSlideToggleModule,
    MatIconModule,
    MatGridListModule,
    MatButtonModule,
    MatDividerModule,
    MatSelectModule,
    MatDialogModule,
    MatSidenavModule,
    MatStepperModule
  ],
  exports: [
    FormsModule,              // exportamos forms
    ReactiveFormsModule       // exportamos forms
  ],
  providers: [AuthGuardService],
  bootstrap: [AppComponent]
})
export class AppModule { }
