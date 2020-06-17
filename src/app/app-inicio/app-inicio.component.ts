import { Component, OnInit, Input } from '@angular/core';
import { UsuarioModel } from '../modelos/UsuarioModel';
import { ActivatedRoute, Router } from '@angular/router';
import { PasarUsuarioService } from '../servicios/pasar-usuario.service';

@Component({
  selector: 'app-app-inicio',
  templateUrl: './app-inicio.component.html',
  styleUrls: ['./app-inicio.component.css']
})
export class AppInicioComponent implements OnInit {

  // Variables
  usuarioSelectLogged: UsuarioModel; // usuario obtenido loggeado
  sidenavOpen: boolean;    // abre o cierra el sidenav
  idUsuLoginString: string;
  idUsuLogin: number;

  // comunicacion entre componentes

  constructor(private routeActivate: ActivatedRoute, private router: Router) { }


  ngOnInit() {
    this.sidenavOpen = false;

    // Obtener datos que vienen de la ruta
    this.idUsuLoginString = this.routeActivate.snapshot.paramMap.get('idUsu'); // lo de las comillas viene del router
    // tslint:disable-next-line:radix
    this.idUsuLogin = Number(this.idUsuLoginString);

  }

  // muestra sideNav
  muestraSideNav() {

    if (this.sidenavOpen === true) {
      this.sidenavOpen = false;

    } else {
      this.sidenavOpen = true;
    }

  }

  salirAplicacion() {
    this.router.navigate(['home/Redhubs/login']);
  }

}
