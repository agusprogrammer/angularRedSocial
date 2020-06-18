import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UsuarioService } from '../servicios/usuario.service';
import { UsuarioModel } from '../modelos/UsuarioModel';
import { Router } from '@angular/router';
import { AuthGuardService } from '../servicios/auth-guard.service';


// Interface para el selector de paises
interface Pais {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  // lista de paises para campo pais
  paises: Pais[] = [
    { value: 'Espanya', viewValue: 'España' },
    { value: 'Portugal', viewValue: 'Portugal' },
    { value: 'Reino Unido', viewValue: 'Reino Unido' },
    { value: 'Estados Unidos', viewValue: 'Estados Unidos' },
    { value: 'Italia', viewValue: 'Italia' }
  ];

  // variables
  formularioRegistro: FormGroup;  // formulario
  usarEmailContact: boolean;
  // opcion que te permite introducir el mismo email o no para mostrar en los datos de usuario
  passwdCorrecto: boolean; // nos indica si la repeticion del campo passwd es correcta
  usuarioRegistro: UsuarioModel; // usuario que registramos
  usuarioCorrectoRegistrarse: boolean;
  // indica a la interfaz de usuario si la Api da una respuesta correcta
  tipoErrorString: string;
  // tipo de error al registrarse, nos indica que esta mal en el registro del usuario

  // variables para la fecha por defecto, sirven para
  // seleccionar la fecha del primer registro
  fechaAnyoReg: number;
  fechaDiaReg: number;
  fechaMesReg: number;
  fechaHoraReg: number;
  fechaMinReg: number;
  fechaSecReg: number;
  fechaRegLogin: Date;
  // fecha del primer registro y login en la plataforma

  // variables checkbox opciones de privacidad y politica de privacidad
  perfilPrivadoBool: boolean; // el perfil es privado
  aceptaPolPriva: boolean;    // Acepta la politica de privacidad

  // Variables para acceder al inicio con el usuario registrado
  usersAny: any[] = [];
  idUsu: number;  // comprobar si hay usuario creado

  // variables fecha, fechas limite para la fecha de nacimiento
  // tipo number
  fechaAnyoMaxNum = Number(new Date().getFullYear().toString()); // anyo de hoy
  fechaDia = Number(new Date().getDate().toString());  // dia (Nota: day es num dia de semana)
  fechaMes = Number(new Date().getMonth().toString()); // mes
  fechaAnyoMinEntradaNum = this.fechaAnyoMaxNum - 14;  // no permitida la entrada a menores de 14
  fechaMax = new Date(this.fechaAnyoMinEntradaNum, this.fechaMes, this.fechaDia);


  constructor(private usuServ: UsuarioService, private router: Router, private auth: AuthGuardService) { }

  ngOnInit() {

    // este en principio es verdadero, si se envia el formulario de manera incorrecta
    // pasa a false y se muestra un mensaje en la interfaz
    this.usuarioCorrectoRegistrarse = true;
    this.tipoErrorString = '';

    // en principio poner el email de registro y el de contacto, los mismos
    this.usarEmailContact = false;

    // inicializar comprobacion de repeticion de passwd
    this.passwdCorrecto = false;

    this.fechaRegLogin = new Date();  // Fecha de registro, primer login

    // Inicializar usuario
    this.usuarioRegistro = new UsuarioModel();

    // Opciones de privacidad
    this.perfilPrivadoBool = false;
    this.aceptaPolPriva = false;

    // Id usuario creado
    this.idUsu = 0;

    // detectar los campos del html
    this.formularioRegistro = new FormGroup({
      nombreUsuFCNRegistro: new FormControl('', [Validators.required, Validators.maxLength(60)]),
      passwordFCNRegistro: new FormControl('', [Validators.required, Validators.minLength(8), Validators.maxLength(100)]),
      passwordRepeFCNRegistro: new FormControl('', [Validators.required, Validators.minLength(8), Validators.maxLength(100)]),
      emailEntradaFCNRegistro: new FormControl('', [Validators.required, Validators.email, Validators.maxLength(100)]),
      emailFCNRegistro: new FormControl('', [Validators.email, Validators.maxLength(100)]),

      nombreFCNRegistro: new FormControl('', [Validators.maxLength(100)]),
      apellidosFCNRegistro: new FormControl('', [Validators.maxLength(200)]),
      fechaNacimientoFCNRegistro: new FormControl('', [Validators.required]),

      paisFCNRegistro: new FormControl('', [Validators.maxLength(100)]),
      ciudadFCNRegistro: new FormControl('', [Validators.maxLength(100)]),
      regionFCNRegistro: new FormControl('', [Validators.maxLength(100)]),
      telfFCNRegistro: new FormControl('', [Validators.maxLength(20)]),

      esPrivadoFCNRegistro: new FormControl(''),
      AceptPolPrivaFCNRegistro: new FormControl('', [Validators.required])

    });

  }

  // Seleccionar la opcion de usar el email de entrada
  // distinto del email para mostrar en la plataforma
  public emailContactDistinto($event) {

    if (this.usarEmailContact === false) {
      this.usarEmailContact = true;
    } else {
      this.usarEmailContact = false;
    }

  }

  // volver atras
  public volverAtras($event) {
    this.router.navigate(['home/Network/login']);
  }

  // Registrar usuario
  public onSubmmit(formValue: any, $event) {

    // comprobar que acepta la politica de privacidad

    if (this.aceptaPolPriva === true) {

      this.comprobarPasswd(formValue); // comprobar el password

      if (this.passwdCorrecto === true) {

        this.usuarioRegistro.nombreUsu = formValue.nombreUsuFCNRegistro;
        this.usuarioRegistro.contrasenya = formValue.passwordFCNRegistro;

        // comprobar si la opcion de poner email distinto al de entrada ha sido aceptada
        if (this.usarEmailContact === true) {
          this.usuarioRegistro.emailEntrada = formValue.emailEntradaFCNRegistro;
          this.usuarioRegistro.email = formValue.emailFCNRegistro;
        } else {
          this.usuarioRegistro.emailEntrada = formValue.emailEntradaFCNRegistro;
          this.usuarioRegistro.email = formValue.emailEntradaFCNRegistro;
        }

        this.usuarioRegistro.nombre = formValue.nombreFCNRegistro;
        this.usuarioRegistro.apellidos = formValue.apellidosFCNRegistro;

        this.usuarioRegistro.fechaNacimiento = formValue.fechaNacimientoFCNRegistro;

        this.usuarioRegistro.pais = formValue.paisFCNRegistro;

        this.usuarioRegistro.ciudad = formValue.ciudadFCNRegistro;
        this.usuarioRegistro.region = formValue.regionFCNRegistro;
        this.usuarioRegistro.telefono = formValue.telfFCNRegistro;


        if (this.perfilPrivadoBool === false) {
          this.usuarioRegistro.perfilPrivado = 0;
        } else {
          this.usuarioRegistro.perfilPrivado = 1;
        }

        // como ya se comprueba mediante un if, este valor se pone por defecto
        this.usuarioRegistro.aceptaPolPriv = 1; // la pol priva, es aceptada

        // valores por defecto ------------------
        // campo id, dejar vacio
        this.usuarioRegistro.esAdministrador = 0;
        this.usuarioRegistro.usuarioActivo = 1;
        this.usuarioRegistro.usuarioBaneado = 0;
        // fecha fin de baneo, vacio, por defecto
        // Estado, se configura en el perfil
        this.usuarioRegistro.numVisitas = 0;
        // fecha ultimo login, por defecto, poner dia que se registra
        this.usuarioRegistro.fechaUltLogin = this.fechaPrimerLoginRegistro();
        this.usuarioRegistro.fechaAlta = this.fechaPrimerLoginRegistro();
        // --------------------------------------

        this.usuServ.postUser(this.usuarioRegistro).subscribe(

          resp => {

            // comprobacion de la respuesta al crear el usuario,
            // manejamos las respuestas de la API
            if (resp.toString() === '') {
              this.tipoErrorString = 'Problemas de conexión con el servidor';
              this.usuarioCorrectoRegistrarse = false;

            } else if (resp.toString() === 'Usuario insertado') {
              this.tipoErrorString = '';
              this.usuarioCorrectoRegistrarse = true;

              this.irAlInicio();  // ir al inicio

            } else if (resp.toString() === 'Problemas, usuario no insertado') {
              this.tipoErrorString = 'Problemas de registro, el email o usuario coinciden con uno ya registrado';
              this.usuarioCorrectoRegistrarse = false;

            } else if (resp.toString() === 'Usuario vacio') {
              this.tipoErrorString = 'Problemas de registro, hay que completar los campos obligatorios';
              this.usuarioCorrectoRegistrarse = false;

            } else {
              this.tipoErrorString = 'Problemas de conexión con el servidor';
              this.usuarioCorrectoRegistrarse = false;
            }

            this.tipoErrorString = resp.toString();
          }
        );


      } else {
        // indicar al usuario tiene que tener el password igual en los 2 campos
        // console.log('La contraseña tiene que ser igual en los 2 campos de contraseña');
        this.tipoErrorString = 'Problemas de registro, la contraseña tiene que coincidir';
        this.usuarioCorrectoRegistrarse = false;
      }

    } else {
      // informar al usuario
      // console.log('Si te registras tienes que aceptar la politica de privacidad');
      this.tipoErrorString = 'Problemas de registro, tienes que aceptar la política de privacidad';
      this.usuarioCorrectoRegistrarse = false;
    }


  }

  // Metodos que nos lleva al inicio despues de registrarnos
  private irAlInicio() {
    this.usuServ.getUserLogin(this.usuarioRegistro.emailEntrada, this.usuarioRegistro.contrasenya).subscribe(
      data => {
        this.usersAny = data;

        // tslint:disable-next-line:no-string-literal
        this.idUsu = this.usersAny['idUsu'];

        if (this.idUsu >= 1) {
          this.auth.activarDesactLogin(true); // activar el login (La guardia de la ruta deja pasar)
          this.auth.canActivate();
          this.router.navigate(['home/Network/inicio', this.idUsu]);
        }

      }
    );

  }

  // comprobar que la contrasenya es igual en ambos campos
  private comprobarPasswd(formValue: any) {

    this.passwdCorrecto = false;

    if (formValue.passwordFCNRegistro === formValue.passwordRepeFCNRegistro) {
      this.passwdCorrecto = true;

    } else {
      this.passwdCorrecto = false;

    }

  }

  // poner fecha por defecto del primer login despues del registro
  // tambien se usa como la fecha de alta
  private fechaPrimerLoginRegistro(): Date {
    // variables fecha, fechas limite para la fecha de nacimiento
    // tipo number

    this.fechaAnyoReg = Number(new Date().getFullYear().toString()); // anyo de hoy
    this.fechaDiaReg = Number(new Date().getDate().toString());      // dia (Nota: day es num dia de semana)
    this.fechaMesReg = Number(new Date().getMonth().toString());     // mes

    this.fechaHoraReg = Number(new Date().getHours().toString());
    this.fechaMinReg = Number(new Date().getMinutes().toString());
    this.fechaSecReg = Number(new Date().getSeconds().toString());

    this.fechaRegLogin = new Date(this.fechaAnyoReg, this.fechaMesReg, this.fechaDiaReg, this.fechaHoraReg, this.fechaMinReg, this.fechaSecReg);

    return this.fechaRegLogin;

  }

  // Evento que cambia la opcion de si ponemos el perfil privado o publico
  public esPerfilPrivado($event) {

    if (this.perfilPrivadoBool === false) {
      this.perfilPrivadoBool = true;

    } else {
      this.perfilPrivadoBool = false;
    }

  }

  // evento que indica si la politica de privacidad es aceptada por el usuario
  public aceptaPoliticaPriva($event) {

    if (this.aceptaPolPriva === false) {
      this.aceptaPolPriva = true;

    } else {
      this.aceptaPolPriva = false;
    }
  }

}
