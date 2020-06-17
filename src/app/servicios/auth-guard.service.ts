import { Injectable } from '@angular/core';
// import { CanActivate } from '@angular/router/src/utils/preactivation';
import { Router, CanActivate } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(private routes: Router) { }

  usuarioLoggeado: boolean;

  // sino se puede activar, volver al login
  public canActivate(): boolean {

    if (this.userAuthenticated()) {
      return true;
    }

    this.routes.navigate(['home/Redhubs/login']);
    return false;

  }

  private userAuthenticated(): boolean {

    // return false;
    return this.usuarioLoggeado;
  }

  // Activar y descativar el loggin de un usuario
  public activarDesactLogin(activarLogin: boolean) {
    this.usuarioLoggeado = false;

    if (activarLogin === true) {
      this.usuarioLoggeado = true;
    } else {
      this.usuarioLoggeado = false;
    }

  }


}
