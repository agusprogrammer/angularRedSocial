import { Component, OnInit, Input } from '@angular/core';
import { UsuarioModel } from '../modelos/UsuarioModel';
import { ActivatedRoute, Router } from '@angular/router';
import { PasarUsuarioService } from '../servicios/pasar-usuario.service';
import { UsuarioService } from '../servicios/usuario.service';

@Component({
  selector: 'app-app-inicio',
  templateUrl: './app-inicio.component.html',
  styleUrls: ['./app-inicio.component.css']
})
export class AppInicioComponent implements OnInit {

  // Variables
  sidenavOpen: boolean;    // abre o cierra el sidenav
  idUsuLoginString: string;
  idUsuLogin: number;

  // usuario obtenido
  usersAny: any[] = [];
  usuarioSelectLogged: UsuarioModel; // usuario obtenido loggeado

  // comunicacion entre componentes
  // Aqui van las variables de inputs y outputs

  constructor(private routeActivate: ActivatedRoute, private router: Router, private usuServ: UsuarioService) { }


  ngOnInit() {
    this.sidenavOpen = false;

    this.usuarioSelectLogged = new UsuarioModel();
    // Obtener datos que vienen de la ruta
    this.idUsuLoginString = this.routeActivate.snapshot.paramMap.get('idUsu'); // lo de las comillas viene del router
    // tslint:disable-next-line:radix
    this.idUsuLogin = Number(this.idUsuLoginString);

    // cuando se inicia el componente de inicio, obtiene el usuario que ha accedido
    this.buscarUsuarioId();

  }

  // muestra sideNav
  muestraSideNav() {

    if (this.sidenavOpen === true) {
      this.sidenavOpen = false;

    } else {
      this.sidenavOpen = true;
    }

  }

  // Salir de la aplicacion
  salirAplicacion() {
    this.router.navigate(['home/Network/login']);
  }

  // Nota: actualizar la fecha del ultimo login
  // obtener usuario que ha accedido por login
  private buscarUsuarioId() {

    this.usuServ.getUserId(this.idUsuLogin).subscribe(
      data => {

        this.usersAny = data;

        // tslint:disable-next-line:no-string-literal
        this.usuarioSelectLogged.idUsu = this.usersAny['idUsu'];

        // tslint:disable-next-line:no-string-literal
        this.usuarioSelectLogged.nombreUsu = this.usersAny['nombreUsu'];

        // tslint:disable-next-line:no-string-literal
        this.usuarioSelectLogged.fechaAlta = this.usersAny['fechaAlta'];

        // tslint:disable-next-line:no-string-literal
        this.usuarioSelectLogged.pais = this.usersAny['pais'];

        // tslint:disable-next-line:no-string-literal
        this.usuarioSelectLogged.ciudad = this.usersAny['ciudad'];

        // tslint:disable-next-line:no-string-literal
        this.usuarioSelectLogged.region = this.usersAny['region'];

        // tslint:disable-next-line:no-string-literal
        this.usuarioSelectLogged.email = this.usersAny['email'];

        // tslint:disable-next-line:no-string-literal
        this.usuarioSelectLogged.nombre = this.usersAny['nombre'];

        // tslint:disable-next-line:no-string-literal
        this.usuarioSelectLogged.apellidos = this.usersAny['apellidos'];

        // tslint:disable-next-line:no-string-literal
        this.usuarioSelectLogged.fechaNacimiento = this.usersAny['fechaNacimiento'];

        // tslint:disable-next-line:no-string-literal
        this.usuarioSelectLogged.telefono = this.usersAny['telefono'];

        // tslint:disable-next-line:no-string-literal
        this.usuarioSelectLogged.emailEntrada = this.usersAny['emailEntrada'];   // email de entrada

        // tslint:disable-next-line:no-string-literal
        this.usuarioSelectLogged.contrasenya = this.usersAny['contrasenya'];    // contrasenya entrada

        // tslint:disable-next-line:no-string-literal
        this.usuarioSelectLogged.perfilPrivado = this.usersAny['perfilPrivado'];

        // tslint:disable-next-line:no-string-literal
        this.usuarioSelectLogged.aceptaPolPriv = this.usersAny['aceptadaPolPriva'];

        // tslint:disable-next-line:no-string-literal
        this.usuarioSelectLogged.esAdministrador = this.usersAny['esAdministrador'];

        // tslint:disable-next-line:no-string-literal
        this.usuarioSelectLogged.usuarioActivo = this.usersAny['usuarioActivo'];

        // tslint:disable-next-line:no-string-literal
        this.usuarioSelectLogged.usuarioBaneado = this.usersAny['usuarioBaneado'];

        // tslint:disable-next-line:no-string-literal
        this.usuarioSelectLogged.fechaFinBaneo = this.usersAny['fechaFinBaneo'];

        // tslint:disable-next-line:no-string-literal
        this.usuarioSelectLogged.estado = this.usersAny['estado'];

        // tslint:disable-next-line:no-string-literal
        this.usuarioSelectLogged.numVisitas = this.usersAny['numVisitas'];

        // tslint:disable-next-line:no-string-literal
        this.usuarioSelectLogged.fechaUltLogin = this.usersAny['fechaUltimoLogin'];

        // tslint:disable-next-line:no-string-literal
        this.usuarioSelectLogged.fotoPerfil = this.usersAny['fotoPerfil'];

        // tslint:disable-next-line:no-string-literal
        this.usuarioSelectLogged.fotoPortada = this.usersAny['fotoPortada'];

      }
    );
  }

}
