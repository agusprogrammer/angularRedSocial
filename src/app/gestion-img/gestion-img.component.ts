import { Component, OnInit, Input } from '@angular/core';
import { FotosService } from '../servicios/fotos.service';
import { UsuarioModel } from '../modelos/UsuarioModel';
import { FotosModel } from '../modelos/FotosModel';
import { AppDialogSelectComponent } from '../app-dialog-select/app-dialog-select.component';
import { MatDialog } from '@angular/material';
import { PasarImgObj } from '../objetos/PasarImgObj';
import { FechaHoy } from '../objetos/FechaHoy';
import { AppDialogComponent } from '../app-dialog/app-dialog.component';
import { ArchivosGen } from '../objetos/ArchivosGen';

@Component({
  selector: 'app-gestion-img',
  templateUrl: './gestion-img.component.html',
  styleUrls: ['./gestion-img.component.css']
})
export class GestionImgComponent implements OnInit {

  // inputs
  // uno si es administrador (no hace falta input)
  // dos el del usuario logueado
  @Input()
  public usuarioLogged: UsuarioModel;
  private idUsuVisitarFot: number; // id de usuario para obtener las fotos que se visitan
  private idUsuarioLogged: number; // extraccion del id del usuario loggeado, se usa para que vayan bien los ifs

  // tres el usuario al que le visitan las fotos
  @Input()
  public usuarioVisita: UsuarioModel;
  private idUsuVisita: number; // id de usuario que visita, se usa para que vayan bien los ifs

  // 4 recibir imagen que se sube (en un metodo)

  // Comprobacion de usuario administrador
  public usuLogAdmin: boolean;

  // comprobacion de que el usuario propio accede a sus fotos
  public usuAccedeSusFot: boolean;

  // lista de fotos a mostrar
  public listFotosAny: any[] = [];     // lista de fotos que recogemos del servicio
  private objFotAny: any;               // objeto tipo any para extraer variables para la lista de mostrar las fotos
  public listFotos: FotosModel[] = [];  // array de objetos model fotos para mostrar los datos de las fotos
  private mostrarFotoVacia: FotosModel; // si el array de la lista de fotos viene vacio, poner foto vacia
  private fot: FotosModel;              // obtener el objeto foto pra guardar la foto en un array para mostrar las fotos
  private contArray: number;            // posicion para guardar en el array de listaFotosFile
  private fotoBlob: Blob;               // blob que nos viene de la BD
  private fotoImgFile: File;                // lo pasamos a file para obtener la img html

  private imgView: ArrayBuffer | string;      // objeto para poner en el array de listaPasarImgs
  private pasarImg: PasarImgObj;              // objeto para pasar una a una las imagenes al array
  public listaPasarImgs: PasarImgObj[] = [];  // array para mostrar las imagenes en html y el resto de datos

  public boolNoImgs: boolean;   // Variable que oculta el boton de borrar sino hay imagenes

  // variables para mostrar fotos 2
  private recibirArch: ArchivosGen;

  // variables para subir una imagen
  private pasarImgSubir: PasarImgObj;  // objeto para pasar un objeto con la foto cuando se sube con la foto
  private fotoModelSubir: FotosModel;  // objeto que usamos para subir la foto al servicio
  private fechaActualSubir: FechaHoy;  // objeto para poner fecha a la foto que se sube
  private respStringJavaSubir: string; // respuesta de cuando se sube

  // activar la gestion de imagenes
  public actGestionImg: boolean;

  // resultado del dialogo
  private resultDiagAny: any[] = [];
  resultDiagBorrarImg: string;  // resultado dialogo de borrar

  /**
   * Constructor del componente de gestion
   * @param dialog dialogo de gestion de imagenes
   * @param fotoServ servicio de fotos
   */
  constructor(public dialog: MatDialog, private fotoServ: FotosService) { }

  /**
   * Inicio de gestion de imagenes
   */
  ngOnInit() {

    this.recibirArch = new ArchivosGen();

    this.mostrarFotoVacia = new FotosModel();

    this.fot = new FotosModel();
    this.pasarImg = new PasarImgObj();

    // this.usuAccedeSusFot = false;
    // this.usuLogAdmin = false;
    this.actGestionImg = false;
    this.resultDiagBorrarImg = '';

    this.contArray = 0;

    this.pasarImgSubir = new PasarImgObj();
    this.fotoModelSubir = new FotosModel();
    this.fechaActualSubir = new FechaHoy();

    this.idUsuarioLogged = this.usuarioLogged.idUsu;
    this.idUsuVisita = this.usuarioVisita.idUsu;

    this.boolNoImgs = true;

    this.comprobarUsu();
    this.recogerListaFotos();

    console.log('Usuario de visita perfil - img: ' + this.usuarioVisita.idUsu);
    console.log('Usuario al que le pertence el perfil - img: ' + this.usuarioLogged.idUsu);
  }


  /**
   * metodo para comprobar si el usuario logueado es el mismo y si es administrador
   */
  private comprobarUsu() {

    // si es true, puede cambiar cosas de otros usuarios

    if (this.usuarioVisita.esAdministrador > 0) {
      this.usuLogAdmin = true;
    } else {
      this.usuLogAdmin = false;
    }

    // si el usuario que accede al componente de las fotos es el mismo usuario
    // puede cambiar cosas
    if (this.idUsuarioLogged === this.idUsuVisita) {
      this.usuAccedeSusFot = true;



    }

    this.idUsuVisitarFot = this.idUsuarioLogged;


  }

  // metodo para probar, cuando tenga la solucion, quitarlo,
  // modificar los blobs y programar de manera similar los videos y otros archivos
  // recoger listado de fotos del usuario y mostrarlos

  /**
   * metodo para recoger la lista de fotos
   */
  private recogerListaFotos() {

    this.fotoServ.getArchivosFotoIdUsu(this.idUsuVisitarFot).subscribe(
      data => {

        this.listaPasarImgs = [];
        this.listFotosAny = [];

        this.listFotosAny = data;

        console.log(this.listFotosAny);

        // comprobar si el array esta vacio
        if (this.listFotosAny.length === 0) {
          // if (this.listFotosAny === null || (this.listFotosAny[0] === null)) {
          this.mostrarFotoVacia.fotoString = 'No hay fotos subidas';
          this.pasarImg.objetoFoto = this.mostrarFotoVacia;
          this.listaPasarImgs[0] = this.pasarImg;
          this.boolNoImgs = true;

        } else {

        this.boolNoImgs = false;

        for (this.objFotAny of this.listFotosAny) {

          // inicializar las variables de objetos dentro del for para
          // evitar repeticiones de objetos en los bucles
          this.fot = new FotosModel();
          this.pasarImg = new PasarImgObj();

          // Extraer datos del array de tipo any
          // tslint:disable-next-line:no-string-literal
          this.pasarImg.imagenCompleta = this.objFotAny['ficheroCompletoString'];
          // tslint:disable-next-line:no-string-literal
          this.pasarImg.objetoFoto = this.objFotAny['obj'];

          // pasar al objeto foto a pasar img
          this.listaPasarImgs.push(this.pasarImg);


        }

      }

    });

  }

  // metodo para habilitar la gestion de imagenes (usar un bool junto al permiso de administrador)

  /**
   * evento para habilitar la gestion de imagenes
   * @param event evento
   */
  public gestionarImgs(event) {

    if (this.actGestionImg === false) {
      this.actGestionImg = true;
    } else {
      this.actGestionImg = false;
    }

  }

  // subir foto --------------------------------------------------------------------

  // metodo para  que se va a subir
  /**
   * evento con el que se puede recibir la imagen que se ha subido del componente
   * app-subir-img mediante el event, pero en nuestro caso solo dispara la actualizacion
   * del componente para mostrar las imagenes que ya estaban junto con la imagen que
   * acabamos de subir
   */
  public recibirFotoSubida(event) {

    // pasar de los datos al objeto

    // actualizar
    this.actualizarListaFotos();

  }

  // sube la foto usando el servicio (puesto en el componente de subir img)

  /**
   * actualiza la lista despues de subir las fotos
   */
  private actualizarListaFotos() {

    // vaciar lista de fotos y volver a actualizar
    this.listFotosAny = [];
    this.listFotos = [];
    this.listaPasarImgs = [];
    this.boolNoImgs = true;
    this.recogerListaFotos();
  }

  // borrar foto -----------------------------------------------------------------

  // metodo para borrar img (recoge id de la interfaz html)
  /**
   * evento para borrar fotos
   * @param event evento
   * @param idFot id de foto a borrar
   */
  public borrarImg(event, idFot: number) {

    this.abrirDialogBorrarImg(idFot);


  }

  /**
   * metodo para borrar foto y abrir el dialog
   * @param idFot id de foto a borrar
   */
  private abrirDialogBorrarImg(idFot: number) {

    // abre el dialogo para preguntar por borrar una imagen
    // enviar informacion al dialogo
    const dialogRef = this.dialog.open(AppDialogSelectComponent, {
      data: {
        tituloDialog: 'Borrar',
        textoDialog: '¿Seguro que quieres borrar la imagen?'
      }
    });

    dialogRef.afterClosed().subscribe(result => {

      this.resultDiagAny = result;
      this.resultDiagBorrarImg = result;

      // llamar a borrar al back end
      if (this.resultDiagBorrarImg === 'true') {
        console.log('Borrar');

        this.fotoServ.deleteArchivosFoto(idFot).subscribe(
          resp => {
              console.log(resp);
              this.actualizarListaFotos();
              this.resultDiagBorrarImg = '';
            }
        );
      }

    });

  }

  // dialogo para los problemas ------------------------------------------------------------

  // abrir dialogo sino se sube correctamente la imagen
  /**
   * dialogo de imagenes: abre dialogo sino se sube correctamente la imagen
   * @param titulo titulo dialogo
   * @param texto texto del dialogo
   */
  public openDialogProblem(titulo: string, texto: string) {

    // this.dialogData.ponerDatosDialog('Problema', 'No se ha podido subir la imagen');
    // const dialogRef = this.dialog.open(this.dialogoImg);
    const dialogRef = this.dialog.open(AppDialogComponent, {
      data: {
        tituloDialog: titulo,
        textoDialog: texto
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

}
