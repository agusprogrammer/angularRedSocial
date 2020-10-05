import { Component, OnInit, Input } from '@angular/core';
import { UsuarioModel } from '../modelos/UsuarioModel';
import { FormGroup, FormControl } from '@angular/forms';
import { UsuarioService } from '../servicios/usuario.service';
import { AppDialogComponent } from '../app-dialog/app-dialog.component';
import { MatDialog } from '@angular/material';
import { FotosService } from '../servicios/fotos.service';
import { FotosModel } from '../modelos/FotosModel';
import { PasarImgObj } from '../objetos/PasarImgObj';

/**
 * interfaz para input de archivos imagenes de perfil y portada
 */
interface HtmlInputEvent extends Event {
  target: HTMLInputElement & EventTarget;
}

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {

  // recibir datos del inicio
  @Input()
  public usuarioPerfil: UsuarioModel; // el perfil le pertence a este usuario

  @Input()
  public usuarioVisita: UsuarioModel; // el usuario que entra a ver este perfil


  public urlGet: string;  // Url para el componente de las publicaciones

  // comprobacion del tipo de usuario
  public usuEsAdmin: boolean;
  public usuarioPropio: boolean;

  // imagenes que mostramos
  private anyImgPerfil: any;
  private anyImgPortada: any;
  public pasarImgPerfil: PasarImgObj;
  public pasarImgPortada: PasarImgObj;

  // Activacion del componente de imagenes
  public activarImgs: boolean;

  // lista de imagenes
  private listaImgsAny: any[] = [];
  private imgAny: any;
  // public listaImgsMuestra: FotosModel[] = [];
  public listaPasarImgMuestra: PasarImgObj[] = [];
  private pasarImgMuestra: PasarImgObj;
  private numImgMuestraMax: number;

  // imagenes para el formulario de cambiar imagen
  imagenFilePortada: File; // Fichero de imagen que importamos para la portada
  imagenFilePerfil: File; // Fichero de imagen que importamos para el perfil

  formImgPortada: FormGroup;  // formulario imagen portada
  formImgPerfil: FormGroup;  // formulario imagen perfil

  /**
   * Constructor del perfil
   * @param usuServ servicio de usuarios
   * @param fotosServ servicio de fotos
   * @param dialog dialogo de imagenes
   */
  constructor(private usuServ: UsuarioService, private fotosServ: FotosService, public dialog: MatDialog) { }

  /**
   * inicio del perfil
   */
  ngOnInit() {

    this.urlGet = 'http://localhost:9191/getPublicacionesUsuario/';

    this.usuEsAdmin = false;
    this.usuarioPropio = false;
    this.activarImgs = false;

    this.numImgMuestraMax = 20;  // seleccionamos el numero de imagenes que se muestran en el perfil

    this.imagenFilePortada = null;
    this.imagenFilePerfil = null;

    this.pasarImgPerfil = new PasarImgObj();
    this.pasarImgPortada = new PasarImgObj();

    this.pasarImgMuestra = new PasarImgObj();

    this.formImgPortada = new FormGroup({
      fotoPortadaFCN: new FormControl('')
    });

    this.formImgPerfil = new FormGroup({
      fotoPerfilFCN: new FormControl('')
    });

    this.comprobarUsuario();
    this.cargarImagenesPerfil();

    console.log('Usuario de visita perfil: ' + this.usuarioVisita.idUsu);
    console.log('Usuario al que le pertence el perfil: ' + this.usuarioPerfil.idUsu);
  }

  /**
   * metodo que comprueba el tipo de usario que entra al perfil, segun si es administrador o no
   * tendra acceso a unas opciones u otras
   */
  private comprobarUsuario() {

    if (this.usuarioPerfil.idUsu === this.usuarioVisita.idUsu) {

      // el usuario que visita es el mismo que esta logueado
      this.usuarioPropio = true;

    }

    if (this.usuarioVisita.esAdministrador === 1) {

      // el usuario que visita es un administrador
      this.usuEsAdmin = true;
    }
  }

  /**
   * evento que activa la muestra del detalle de las fotos
   */
  public mostrarFotos() {

    if (this.activarImgs === false) {
      this.activarImgs = true;

    } else {
      this.activarImgs = false;
    }
  }

  /**
   * mostrar para que se carguen las imagnes de perfil
   */
  private cargarImagenesPerfil() {

    // fotos de portada y de perfil
    this.usuServ.getFotoPerfil(this.usuarioPerfil.idUsu).subscribe(
      dataImgPerfil => {
        console.log(dataImgPerfil);
        if (dataImgPerfil !== null || dataImgPerfil !== '') {
          this.anyImgPerfil = dataImgPerfil;

          // tslint:disable-next-line:no-string-literal
          this.pasarImgPerfil.imagenCompleta = this.anyImgPerfil['ficheroCompletoString'];
        }

      });

    this.usuServ.getFotoPortada(this.usuarioPerfil.idUsu).subscribe(
      dataImgPortada => {
        console.log(dataImgPortada);
        if (dataImgPortada !== null || dataImgPortada !== '') {
          this.anyImgPortada = dataImgPortada;

          // tslint:disable-next-line:no-string-literal
          this.pasarImgPortada.imagenCompleta = this.anyImgPortada['ficheroCompletoString'];
        }

      });

    // imagenes de la parte de fotos
    this.fotosServ.getArchivosFotoIdUsu(this.usuarioPerfil.idUsu).subscribe(
      data => {
        this.listaImgsAny = data;

        if (this.listaImgsAny.length > 0) {

          // tslint:disable-next-line:prefer-for-of
          for (let i = 0; i < this.listaImgsAny.length; i++) {

            if (i < this.numImgMuestraMax) {
              this.imgAny = this.listaImgsAny[i];
              this.pasarImgMuestra = new PasarImgObj();

              // tslint:disable-next-line:no-string-literal
              this.pasarImgMuestra.imagenCompleta = this.imgAny['ficheroCompletoString'];
              this.listaPasarImgMuestra.push(this.pasarImgMuestra);

            }
          }

        } else {
          // poner que no hay imagnes
        }

      }
    );

  }

  /**
   * evento que sirve para cambiar la foto de portada
   * @param event evento que nos transfiere la imagen para cargarla
   */
  public cambiarFotoPortada(event: HtmlInputEvent) {
    if (event.target.files && event.target.files[0]) {
      this.imagenFilePortada = event.target.files[0] as File;

      // llamar servicio
      this.usuServ.postFotoPortada(this.usuarioPerfil.idUsu, this.imagenFilePortada).subscribe(
      data => {
        console.log(data);
        // this.cargarImagenesPerfil();

        this.usuServ.getFotoPortada(this.usuarioPerfil.idUsu).subscribe(
          dataImgPort => {
            console.log(dataImgPort);
            if (dataImgPort !== null || dataImgPort !== '') {
              this.anyImgPortada = dataImgPort;

              // tslint:disable-next-line:no-string-literal
              this.pasarImgPortada.imagenCompleta = this.anyImgPortada['ficheroCompletoString'];
            }

          });

      });

    } else {
      this.openDialogImgs();
    }
  }

  /**
   * evento que sirve para cambiar la foto de perfil
   * @param event evento que nos transfiere la imagen para cargarla
   */
  public cambiarFotoPerfil(event: HtmlInputEvent) {
    if (event.target.files && event.target.files[0]) {
      this.imagenFilePerfil = event.target.files[0] as File;

      // llamar servicio
      this.usuServ.postFotoPerfil(this.usuarioPerfil.idUsu, this.imagenFilePerfil).subscribe(
        data => {
          console.log(data);
          // this.cargarImagenesPerfil();

          this.usuServ.getFotoPerfil(this.usuarioPerfil.idUsu).subscribe(
            dataImgPerfil => {
              console.log(dataImgPerfil);
              if (dataImgPerfil !== null || dataImgPerfil !== '') {
                this.anyImgPerfil = dataImgPerfil;

                // tslint:disable-next-line:no-string-literal
                this.pasarImgPerfil.imagenCompleta = this.anyImgPerfil['ficheroCompletoString'];
              }

            });

        });

    } else {
      this.openDialogImgs();
    }
  }

  /**
   * evento para borrar la foto de portada
   */
  public borrarFotoPortada() {
    this.usuServ.deleteFotoPortadaUsu(this.usuarioPerfil.idUsu).subscribe(
      data => {
        console.log(data);

        // this.cargarImagenesPerfil();

        this.usuServ.getFotoPortada(this.usuarioPerfil.idUsu).subscribe(
          dataImgPort => {
            console.log(dataImgPort);
            if (dataImgPort !== null || dataImgPort !== '') {
              this.anyImgPortada = dataImgPort;

              // tslint:disable-next-line:no-string-literal
              this.pasarImgPortada.imagenCompleta = this.anyImgPortada['ficheroCompletoString'];
            }

          });
      }
    );
  }

  /**
   * evento para borrar la foto de perfil
   */
  public borrarFotoPerfil() {
    this.usuServ.deleteFotoPerfilUsu(this.usuarioPerfil.idUsu).subscribe(
      data => {
        console.log(data);

        // this.cargarImagenesPerfil();

        this.usuServ.getFotoPerfil(this.usuarioPerfil.idUsu).subscribe(
          dataImgPerfil => {
            console.log(dataImgPerfil);
            if (dataImgPerfil !== null || dataImgPerfil !== '') {
              this.anyImgPerfil = dataImgPerfil;

              // tslint:disable-next-line:no-string-literal
              this.pasarImgPerfil.imagenCompleta = this.anyImgPerfil['ficheroCompletoString'];
            }

          });

      }
    );
  }

  /**
   * metodo para el dialogo de imagenes
   */
  public openDialogImgs() {

    const dialogRef = this.dialog.open(AppDialogComponent, {
      data: {
        tituloDialog: 'Problema',
        textoDialog: 'La imagen no se puede seleccionar o no se ha seleccionado ninguna'
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });

  }








}
