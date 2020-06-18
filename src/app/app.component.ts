import { Component } from '@angular/core';
import { UsuarioModel } from './modelos/UsuarioModel';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  selectorNumComp: number; // selector de componentes por numero
  usuLogged: UsuarioModel; // Usuario loggeado
  sidenavOpen: boolean;    // abre o cierra el sidenav

  constructor(private router: Router) {}

  // tslint:disable-next-line:use-life-cycle-interface
  ngOnInit() {

    this.selectorNumComp = 1;  // iniciamos variables de login
    this.usuLogged = new UsuarioModel();
    this.sidenavOpen = false;
  }

  // 1  sin nada
  // 2  boton de ir atras
  // 3  menu
  // 4  menu + boton ir atras

  // selecciona el valor de navegacion nuevo
  seleccionarValor(event) {
    // console.log(event.selectComp);
    this.selectorNumComp = event.selectComp;
  }

  // obtenemos el usuario logueado, llevarlo al inicio
  obtenerUsuLogin(event) {
    this.usuLogged = event.usuarioEntrada;
  }

  // muestra sideNav
  muestraSideNav() {

    if (this.sidenavOpen === true) {
      this.sidenavOpen = false;

    } else {
      this.sidenavOpen = true;
    }

  }

  // valor para volver atras sin loggin
  volverAtras() {
    // this.selectorNumComp = 1;
    this.router.navigate(['home/Network/login']);
  }

}
