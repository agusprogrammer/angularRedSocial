import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
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

  // comunicacion entre componentes
  // @Input() selectorNumCompInpReg: number;  // selector de componentes

  // @Output() selectorNumCompOut = new EventEmitter();  // selector de componentes
  // selectComp: number;

  // variables
  formularioRegistro: FormGroup;
  usarEmailContact: boolean; // opcion que te permite introducir un email visible
  passwdCorrecto: boolean; // nos indica si la repeticion del campo passwd es correcta
  usuarioRegistro: UsuarioModel; // usuario que registramos
  usuarioCorrectoRegistrarse: boolean;
  // indica a la interfaz de usuario si la Api da una respuesta correcta
  tipoErrorString: string; // tipo de error al registrarse

  // variables para la fecha por defecto
  fechaAnyoReg: number;
  fechaDiaReg: number;
  fechaMesReg: number;
  fechaHoraReg: number;
  fechaMinReg: number;
  fechaSecReg: number;
  fechaRegLogin: Date; // fecha del primer registro

  // variables checkbox opciones de privacidad y politica de privacidad
  perfilPrivadoBool: boolean; // el perfil es privado
  aceptaPolPriva: boolean;    // Acepta la politica de privacidad

  // Variables para acceder al inicio con el usuario registrado
  usersAny: any[] = [];
  idUsu: number;  // comprobar si hay usuario creado

  // lista de paises para campo pais
  paises: Pais[] = [
    { value: 'Espanya', viewValue: 'España' },
    { value: 'Portugal', viewValue: 'Portugal' },
    { value: 'Reino Unido', viewValue: 'Reino Unido' },
    { value: 'Estados Unidos', viewValue: 'Estados Unidos' },
    { value: 'Italia', viewValue: 'Italia' }
  ];

  // variables fecha, fechas limite para la fecha de nacimiento
  // tipo number
  fechaAnyoMaxNum = Number(new Date().getFullYear().toString()); // anyo de hoy
  fechaDia = Number(new Date().getDate().toString());      // dia (Nota: day es num dia de semana)
  fechaMes = Number(new Date().getMonth().toString());     // mes

  fechaAnyoMinEntradaNum = this.fechaAnyoMaxNum - 14;  // no permitida la entrada a menores de 14

  fechaMax = new Date(this.fechaAnyoMinEntradaNum, this.fechaMes, this.fechaDia);

  // fechaMin = new Date();
  // date = new FormControl(new Date());

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

  // Seleccionar opcion email
  public emailContactDistinto($event) {

    if (this.usarEmailContact === false) {
      this.usarEmailContact = true;
    } else {
      this.usarEmailContact = false;
    }

    // console.log(this.usarEmailContact);

  }

  // volver atras
  public volverAtras($event) {
    this.router.navigate(['home/Redhubs/login']);
  }

  // Registrar usuario
  public onSubmmit(formValue: any, $event) {

    // comprobar que acepta la politica de privacidad

    if (this.aceptaPolPriva === true) {

      this.comprobarPasswd(formValue); // comprobar el password

      if (this.passwdCorrecto === true) {

        this.usuarioRegistro.nombreUsu = formValue.nombreUsuFCNRegistro;
        this.usuarioRegistro.contrasenya = formValue.passwordFCNRegistro;

        // poner email
        if (this.usarEmailContact === true) {
          this.usuarioRegistro.emailEntrada = formValue.emailEntradaFCNRegistro;
          this.usuarioRegistro.email = formValue.emailFCNRegistro;
        } else {
          this.usuarioRegistro.emailEntrada = formValue.emailEntradaFCNRegistro;
          this.usuarioRegistro.email = formValue.emailEntradaFCNRegistro;
        }

        this.usuarioRegistro.nombre = formValue.nombreFCNRegistro;
        this.usuarioRegistro.apellidos = formValue.apellidosFCNRegistro;

        // comprobar la fecha antes de insertar
        this.usuarioRegistro.fechaNacimiento = formValue.fechaNacimientoFCNRegistro;

        // Ver si se puede obtener el valor del campo select de esta forma
        this.usuarioRegistro.pais = formValue.paisFCNRegistro;

        this.usuarioRegistro.ciudad = formValue.ciudadFCNRegistro;
        this.usuarioRegistro.region = formValue.regionFCNRegistro;
        this.usuarioRegistro.telefono = formValue.telfFCNRegistro;

        // Los valores deben de ser true o false, los vacios pasarlos a false
        // Como son otro tipo de campos, se ha puesto de otra forma

        // this.usuarioRegistro.perfilPrivado = formValue.esPrivadoFCNRegistro;
        // this.usuarioRegistro.aceptaPolPriv = formValue.aceptPolPrivaFCNRegistro;

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

        // Crear metodo para registrar el usuario (ver si esta creado, puede ser el post)
        // continuar con lo del servicio
        // this.usuServ.postUser();

        // despues de registrar, navegar atras (implementar parte en el app component)
        // meterse en el inicio

        // console.log(this.usuarioRegistro);
        // descomentar luego
        // this.router.navigate(['home/Redhubs/inicio']);

        this.usuServ.postUser(this.usuarioRegistro).subscribe(

          resp => {
            // console.log(resp);
            // return resp;
            // this.registroPostResulString = resp.toString();

            if (resp.toString() === '') {
              this.tipoErrorString = 'Problemas de conexión con el servidor';
              this.usuarioCorrectoRegistrarse = false;

            } else if (resp.toString() === 'Usuario insertado') {
              this.tipoErrorString = '';
              this.usuarioCorrectoRegistrarse = true;

              this.irAlInicio();

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

  // Nos lleva al inicio despues de registrarnos
  private irAlInicio() {
    this.usuServ.getUserLogin(this.usuarioRegistro.emailEntrada, this.usuarioRegistro.contrasenya).subscribe(
      data => {
        this.usersAny = data;

        // tslint:disable-next-line:no-string-literal
        this.idUsu = this.usersAny['idUsu'];

        if (this.idUsu >= 1) {
          this.auth.activarDesactLogin(true); // activar el login
          this.auth.canActivate();
          this.router.navigate(['home/Redhubs/inicio', this.idUsu]);
        }

      }
    );

  }

  // comprobar contrasenya
  private comprobarPasswd(formValue: any) {

    this.passwdCorrecto = false;

    if (formValue.passwordFCNRegistro === formValue.passwordRepeFCNRegistro) {
      this.passwdCorrecto = true;

    } else {
      this.passwdCorrecto = false;

    }

  }

  // poner fecha por defecto
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
    // console.log(this.fechaRegLogin);

    return this.fechaRegLogin;

  }

  // Opciones de privacidad
  public esPerfilPrivado($event) {

    if (this.perfilPrivadoBool === false) {
      this.perfilPrivadoBool = true;

    } else {
      this.perfilPrivadoBool = false;
    }

  }

  public aceptaPoliticaPriva($event) {

    if (this.aceptaPolPriva === false) {
      this.aceptaPolPriva = true;

    } else {
      this.aceptaPolPriva = false;
    }
  }

}
