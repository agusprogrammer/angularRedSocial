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
  public sidenavOpen: boolean;      // abre o cierra el sidenav
  private idUsuLoginString: string; // variable string que recoge el id de la ruta
  private idUsuLogin: number;       // variable numero que viene de idUsuLoginString para recoger los datos del usuario
  public selectorComponente: number;       // selecciona el componente a mostrar segun se pulse un boton u otro del sidenav

  // usuario obtenido
  private usersAny: any[] = [];   // variable any para recoger el usuario obtenido
  public usuarioSelectLogged: UsuarioModel; // usuario obtenido loggeado
  public cualquierUsuario: UsuarioModel; // usuario vacio para las publicaciones de varios usuarios

  // estas url se usan para los servicios de publicaciones y contactos
  // al pasar estas url entre componentes permite utilizar un solo metodo
  // de servicio para varias url permitiendo ahorrar codigo en los servicios
  // en algunos casos que se utiliza el get

  // urls componente publicaciones
  public urlPublInicio: string;   // Variable de string para url de publicaciones de inicio
  public urlPublExplorar: string; // Variable de string para url de publicaciones de explorar

  // urls componente contactos
  public urlContactAmigos: string;        // Variable de string para url de los contactos amigos
  public urlContactBuscarAmigos: string;  // Variable de string para url de los contactos de buscar amigos nuevos

  // Nota: en el futuro se pondra compodoc para la documentacion de proyecto
  /**
   * constructor del componente
   * @param routeActivate ruta por la cual nos viene el id del usuario que ha hecho loggin
   * @param router  ruta para salir del loggeo
   * @param usuServ inyeccion del servicio para los datos de usuario que se ha loggeado
   */
  constructor(private routeActivate: ActivatedRoute, private router: Router, private usuServ: UsuarioService) { }

  /**
   * Inicio del componente de inicio
   */
  ngOnInit() {
    this.sidenavOpen = false;

    this.usuarioSelectLogged = new UsuarioModel();
    // Obtener datos que vienen de la ruta
    this.idUsuLoginString = this.routeActivate.snapshot.paramMap.get('idUsu'); // lo de las comillas viene del router
    // tslint:disable-next-line:radix
    this.idUsuLogin = Number(this.idUsuLoginString);

    // cuando se inicia el componente de inicio, obtiene el usuario que ha accedido
    this.buscarUsuarioId();
    this.configuracionUrl();

    this.selectorComponente = 1;

  }

  /**
   * metodo para configurar las url de los servicios para obterner los datos desde una ruta u otra
   */
  private configuracionUrl() {

    // configuracion del usuario para las listas de publicaciones de varios usuarios
    // se usa un usuario vacio para indicar que las publicaciones del componente son de varios usuarios
    this.cualquierUsuario = new UsuarioModel();

    this.urlPublInicio = 'http://localhost:9191/getPubliInicioUsuario/'; // + this.usuarioSelectLogged
    this.urlPublExplorar = 'http://localhost:9191/getPubliPubl';

    this.urlContactAmigos = 'http://localhost:9191/getAmigosUsu/' + this.usuarioSelectLogged.idUsu;
    this.urlContactBuscarAmigos = 'http://localhost:9191/getNuevosAmigos/' + this.usuarioSelectLogged.idUsu;
  }

  /**
   * metodo para mostrar u ocultar el sidenav
   */
  public muestraSideNav() {

    if (this.sidenavOpen === true) {
      this.sidenavOpen = false;

    } else {
      this.sidenavOpen = true;
    }

  }

  /**
   * metodo (evento) para salir a la pantalla de login de la aplicacion
   */
  public salirAplicacion() {
    this.router.navigate(['home/Network/login']);
  }

  /**
   * metodo (evento) para seleccionar que componente se muestra en la interfaz
   * @example por ejemplo, el numero 3 le pertenece al perfil del usuario que se loggea, si se le pasa un 3 nos muestra el perfil de usuario
   * @param numSelect cada componente del sidenav tiene un numero, este numero indica que componnente se muestra
   */
  public seleccionarComponente(numSelect: number) {
    this.selectorComponente = numSelect;
  }

  // la parte de actualizar el login con el servicio se pondra en el futuro
  // Nota: actualizar la fecha del ultimo login
  // obtener usuario que ha accedido por login

  /**
   * metodo para obtener el usuario loggeado
   */
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

        this.configuracionUrl();

      }
    );
  }

}
