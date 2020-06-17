import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { UsuarioService } from '../servicios/usuario.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UsuarioModel } from '../modelos/UsuarioModel';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { AuthGuardService } from '../servicios/auth-guard.service';
import { PasarUsuarioService } from '../servicios/pasar-usuario.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {


  // variables

  selectorNumComp: number;  // valor de navegacion para componentes
  formulario: FormGroup;
  resultadoLogin: string;
  usersAny: any[] = []; // Nota, ver como convertir a un obj UsuarioModel
  idUsu: number;  // comprobar si hay usuario
  usuarioEntrada: UsuarioModel; // Usuario que pasamos a la pantalla de inicio
  usuarioValido: boolean; // Indica si el usuario ha sido obtenido


  // comunicacion entre componentes
  // @Input() selectorNumCompInpLogin: number;  // selector de componentes
  // los event emmiter de los output deben de ser importados de angular core
  // @Output() selectorNumCompOut = new EventEmitter();  // selector de componentes
  // selectComp: number;

  @Output() usuarioLogged = new EventEmitter();       // Devolver usuario
  usuLogged: UsuarioModel;

  constructor(private usuServ: UsuarioService, private router: Router, private auth: AuthGuardService, private pasarUsuServ: PasarUsuarioService) { }

  ngOnInit() {

    this.selectorNumComp = 1; // valor inicial
    this.usuarioValido = true;

    // detectar los campos del html
    this.formulario = new FormGroup({
      emailEntradaFCNLogin: new FormControl('', [Validators.email, Validators.required, Validators.maxLength(100)]),
      passwordFCNLogin: new FormControl('', [Validators.minLength(8), Validators.required, Validators.maxLength(100)])
    });

    // Inicializar objetos
    this.usuarioEntrada = new UsuarioModel();
    this.usuLogged = new UsuarioModel();

  }

  public onSubmmit(formValue: any, event) {

    const usuario = new UsuarioModel();
    usuario.emailEntrada = formValue.emailEntradaFCNLogin;
    usuario.contrasenya = formValue.passwordFCNLogin;

    // Recoger datos del servicio para ver los datos del usuario recogido

    this.usuServ.getUserLogin(usuario.emailEntrada, usuario.contrasenya).subscribe(
      data => {
        this.usersAny = data;
        // console.log(data);
        // console.log(this.usersAny);
        // tslint:disable-next-line:no-string-literal
        // console.log(this.idUsu = this.usersAny['idUsu']);

        // Comprobar si hay usuario
        // tslint:disable-next-line:no-string-literal
        this.idUsu = this.usersAny['idUsu'];

        if (this.idUsu >= 1) {

          // poner usuario
          // tslint:disable-next-line:no-string-literal
          this.usuarioEntrada.idUsu = this.usersAny['idUsu'];

          // tslint:disable-next-line:no-string-literal
          this.usuarioEntrada.nombreUsu = this.usersAny['nombreUsu'];

          // tslint:disable-next-line:no-string-literal
          this.usuarioEntrada.fechaAlta = this.usersAny['fechaAlta'];

          // tslint:disable-next-line:no-string-literal
          this.usuarioEntrada.pais = this.usersAny['pais'];

          // tslint:disable-next-line:no-string-literal
          this.usuarioEntrada.ciudad = this.usersAny['ciudad'];

          // tslint:disable-next-line:no-string-literal
          this.usuarioEntrada.region = this.usersAny['region'];

          // tslint:disable-next-line:no-string-literal
          this.usuarioEntrada.email = this.usersAny['email'];

          // tslint:disable-next-line:no-string-literal
          this.usuarioEntrada.nombre = this.usersAny['nombre'];

          // tslint:disable-next-line:no-string-literal
          this.usuarioEntrada.apellidos = this.usersAny['apellidos'];

          // tslint:disable-next-line:no-string-literal
          this.usuarioEntrada.fechaNacimiento = this.usersAny['fechaNacimiento'];

          // tslint:disable-next-line:no-string-literal
          this.usuarioEntrada.telefono = this.usersAny['telefono'];

          // tslint:disable-next-line:no-string-literal
          this.usuarioEntrada.emailEntrada = this.usersAny['emailEntrada'];   // email de entrada

          // tslint:disable-next-line:no-string-literal
          this.usuarioEntrada.contrasenya = this.usersAny['contrasenya'];    // contrasenya entrada

          // tslint:disable-next-line:no-string-literal
          this.usuarioEntrada.perfilPrivado = this.usersAny['perfilPrivado'];

          // tslint:disable-next-line:no-string-literal
          this.usuarioEntrada.aceptaPolPriv = this.usersAny['aceptadaPolPriva'];

          // tslint:disable-next-line:no-string-literal
          this.usuarioEntrada.esAdministrador = this.usersAny['esAdministrador'];

          // tslint:disable-next-line:no-string-literal
          this.usuarioEntrada.usuarioActivo = this.usersAny['usuarioActivo'];

          // tslint:disable-next-line:no-string-literal
          this.usuarioEntrada.usuarioBaneado = this.usersAny['usuarioBaneado'];

          // tslint:disable-next-line:no-string-literal
          this.usuarioEntrada.fechaFinBaneo = this.usersAny['fechaFinBaneo'];

          // tslint:disable-next-line:no-string-literal
          this.usuarioEntrada.estado = this.usersAny['estado'];

          // tslint:disable-next-line:no-string-literal
          this.usuarioEntrada.numVisitas = this.usersAny['numVisitas'];

          // tslint:disable-next-line:no-string-literal
          this.usuarioEntrada.fechaUltLogin = this.usersAny['fechaUltimoLogin'];

          // tslint:disable-next-line:no-string-literal
          this.usuarioEntrada.fotoPerfil = this.usersAny['fotoPerfil'];

          // tslint:disable-next-line:no-string-literal
          this.usuarioEntrada.fotoPortada = this.usersAny['fotoPortada'];

          // pasar datos a inicio (pasa por app component) (Output, quitar y ponerlo por servicio)
          // this.usuarioLogged.emit({usuLogged: this.usuarioEntrada}); // ver si pasar por app o directamente a inicio

          // this.pasarUsuServ.enviarUsuarioServRuta(this.usuarioEntrada);

          // this.envioMedianteServ(this.usuarioEntrada);

          // this.selectorNumCompInpLogin = 4;
          // this.selectorNumCompOut.emit({selectComp: this.selectorNumCompInpLogin});

          // Ir al inicio
          this.auth.activarDesactLogin(true); // activar el login
          this.auth.canActivate();
          this.router.navigate(['home/Redhubs/inicio', this.usuarioEntrada.idUsu]);


        } else {

          // decirle al usuario que los datos no son correctos
          this.usuarioValido = false;

        }


      }
    );


  }

  private envioMedianteServ(usuEnt: UsuarioModel) {

    // Envio mediante servicio
    this.pasarUsuServ.enviarUsuObservable.subscribe(responseUsuario => {
      usuEnt = responseUsuario;
    });

    this.pasarUsuServ.enviarUsuario(usuEnt);

  }


  // metodo para ir a registrar el usuario (cambiar)
  public registrarUsu(event) {
    this.router.navigate(['home/Redhubs/registro']);
    // this.router.navigate(['./registro.component.html']);
    // this.selectorNumCompInpLogin = 2;
    // this.selectorNumCompOut.emit({selectComp: this.selectorNumCompInpLogin});
  }

  // Ir a la politica de privacidad
  public politicaPrivacidad(event) {
    this.router.navigate(['home/Redhubs/polPriva']);
    // this.selectorNumCompInpLogin = 3;
    // this.selectorNumCompOut.emit({selectComp: this.selectorNumCompInpLogin});

  }

  // destruir componente
  // tslint:disable-next-line:use-life-cycle-interface
  ngOnDestroy() {
    // poner variables por defecto (borra el contenido de las variables)
    this.usuarioEntrada = new UsuarioModel();
    this.formulario = new FormGroup({});
    this.usersAny = [];
    this.idUsu = 0;
    this.usuarioValido = true;

    // usuario que se ha transmitido a otro lugar
    this.usuLogged = new UsuarioModel();
  }

}
