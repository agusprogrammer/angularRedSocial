import { Component, OnInit, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
import { UsuarioService } from '../servicios/usuario.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UsuarioModel } from '../modelos/UsuarioModel';
import { Router } from '@angular/router';
import { AuthGuardService } from '../servicios/auth-guard.service';
import { PasarUsuarioService } from '../servicios/pasar-usuario.service';
import { AppDialogComponent } from '../app-dialog/app-dialog.component';
import { MatDialog } from '@angular/material';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {

  // variables
  formulario: FormGroup;  // formulario
  usersAny: any[] = []; // Datos que vienen del servicio
  idUsu: number;  // Comprobar si hay usuario, seleccionar id de usuario
  usuarioValido: boolean; // Indica si el usuario ha sido obtenido

  /**
   * Constructor del componente login
   * @param usuServ servicio de usuarios
   * @param dialog dialogo formulario login
   * @param router router para las rutas
   * @param auth authGuard para el login
   */
  constructor(private usuServ: UsuarioService, public dialog: MatDialog, private router: Router, private auth: AuthGuardService) { }


  /**
   * iniciamos las variables del login
   */
  ngOnInit() {

    this.idUsu = 0;
    this.usuarioValido = true;

    // detectar los campos del html
    this.formulario = new FormGroup({
      emailEntradaFCNLogin: new FormControl('', [Validators.email, Validators.required, Validators.maxLength(100)]),
      passwordFCNLogin: new FormControl('', [Validators.minLength(8), Validators.required, Validators.maxLength(100)])
    });

  }

  /**
   * Recoge los datos de los campos y nos recoge el usuario del formulario que se loggea
   * @param formValue valores que se recogen del formulario
   * @param event evento
   */
  public onSubmmit(formValue: any, event) {

    const usuario = new UsuarioModel();
    usuario.emailEntrada = formValue.emailEntradaFCNLogin;
    usuario.contrasenya = formValue.passwordFCNLogin;


    // Recoger datos del servicio para ver los datos del usuario recogido
    this.usuServ.getUserLogin(usuario.emailEntrada, usuario.contrasenya).subscribe(

      data => {
        this.usersAny = data;

        // tslint:disable-next-line:no-string-literal
        this.idUsu = this.usersAny['idUsu'];

        if (this.idUsu >= 1) {

          // Ir al inicio
          this.auth.activarDesactLogin(true); // activar el login
          this.auth.canActivate();
          this.router.navigate(['home/Network/inicio', this.idUsu]);


        } else {

          // decirle al usuario que los datos no son correctos
          this.usuarioValido = false;

        }

      }

    );

  }

  /**
   * metodo para ir a registrar el usuario mediante el route
   * @param event evento
   */
  public registrarUsu(event) {
    this.router.navigate(['home/Network/registro']);

  }

  /**
   * metodo para ir a la parte de politica de privacidad mediante el route
   * @param event evento
   */
  public politicaPrivacidad(event) {
    this.router.navigate(['home/Network/polPriva']);

  }

  /**
   * metodo para destruir componente y vaciar variables
   */
  ngOnDestroy() {
    // poner variables por defecto
    this.formulario = new FormGroup({});
    this.usersAny = [];
    this.idUsu = 0;
    this.usuarioValido = true;

  }

}
