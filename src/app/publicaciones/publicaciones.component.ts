import { Component, OnInit, Input, ViewChild, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { UsuarioModel } from '../modelos/UsuarioModel';
import { PublicacionService } from '../servicios/publicacion.service';
import { PublicacionModel } from '../modelos/PublicacionModel';
import { MatDialog, MatPaginator, MatTableDataSource } from '@angular/material';
import { Observable } from 'rxjs';
import { ComentarioModel } from '../modelos/ComentarioModel';
import { ComentarioService } from '../servicios/comentario.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { FechaHoy } from '../objetos/FechaHoy';
import { UsuarioService } from '../servicios/usuario.service';
import { ComentarioPubl } from '../objetos/ComentarioPubl';
import { AppDialogComponent } from '../app-dialog/app-dialog.component';
import { AppDialogSelectComponent } from '../app-dialog-select/app-dialog-select.component';
import { PasarImgObj } from '../objetos/PasarImgObj';
import { HostListener } from '@angular/core/src/metadata/directives';
import { ElementRef } from '@angular/core/src/linker/element_ref';

/**
 * Card de publicaciones
 */
export interface CardPubl {
  usuarioPublFoto: any;
  /* listaCommentCard: ComentarioModel[]; */
  /* listaComentariosPubl: ComentarioPubl[]; */
  esPrivadaNum: number;
  esPublPrivada: string;
  publObj: PublicacionModel;
  fechaPubl: Date;
  idPubl: number;
  actBtnSubir: boolean;
}

/**
 * card de comentarios
 */
export interface CardComment {
  idPubl: number;
  comment: ComentarioModel;
  imgComment: any;
}

@Component({
  selector: 'app-publicaciones',
  templateUrl: './publicaciones.component.html',
  styleUrls: ['./publicaciones.component.css']
})
export class PublicacionesComponent implements OnInit {

  @Input()
  public usuarioLogged: UsuarioModel; // usuario del que son las publicaciones
  public idUsuLogged: number;         // id del usuario del que son las publicaciones

  @Input()
  public usuarioVisita: UsuarioModel; // usuario que visita las publicaciones
  public idUsuVisita: number;         // id del usuario que visita las publicaciones

  @Input()
  public urlGetPubl: string; // url para poner en getVariasUrlPubl(urlGet: string, idUsu: number);

  // variables para ver que tipo de usuario entra
  public boolEsAdmin: boolean;  // si accede el administrador
  public propioUsu: boolean; // si es el propio usuario el que accede

  // variables para activar la edicion
  public actEdit: boolean; // activa la edicion

  // variables de informacion de publicaciones
  public listaPublAny: any[] = [];
  private listaPubl: PublicacionModel[] = [];
  public numPubl: number; // numero de publicaciones
  public mensajeNoPubl: string;

  // variables para poner los botones para subir arriba
  public boolActivarSubir: boolean; // activa la parte del boton para subir arriba
  private numElementoCont: number; // cuenta el numero del elemento publicacion de 0 a 9 en el for de publicaciones
  // si llega a 9 pone a true la parte de subir y se resetea


  // foto publicacion
  private anyImgPerfilPubl: any;
  private anyImgPerfilPublExt: string; // imagen extraida para su comprobacion y para ponerla en las publicaciones
  public pasarImgPerfilPubl: PasarImgObj;

  // foto comentario
  public anyImgPerfilComment: any;
  public usuarioCommentIdImg: UsuarioModel;
  public usuForComment: ComentarioModel;

  // variables comentarios
  public boolComment: boolean; // muestra o oculta los comentarios
  private listCommentAny: any[] = [];
  public listComment: ComentarioModel[] = [];
  public listCommentResult: ComentarioModel[] = [];
  public listComentPubl: ComentarioPubl[] = [];  // lista de comentarios con las imagenes de perfil
  private commentPubl: ComentarioPubl;
  public idPublCommentAbrir: number;  // abre o cierra los comentarios de una publicacion
  private fotoComentUsu: any;


  // variables para la paginacion publicaciones
  // @ViewChild(MatPaginator) paginator: MatPaginator;
  // obsPubl: Observable<any>;
  // dataSource: MatTableDataSource<CardPubl> = new MatTableDataSource<CardPubl>();
  public dataCardPubl: CardPubl[] = [];

  // variables para la paginacion comentarios
  // @ViewChild(MatPaginator) paginatorComment: MatPaginator;
  // obsComment: Observable<any>;
  // dataSourceComment: MatTableDataSource<CardComment> = new MatTableDataSource<CardComment>();
  public dataCardComment: CardComment[] = [];

  // seleccion de privacidad para el CardPubl
  private esPrivadaNum: number;
  private esPrivadaString: string;

  // Formulario comentarios
  formularioComment: FormGroup;
  fecha: FechaHoy;

  // Respuesta de los dialogos
  resultDiagString: string;

  // usuario que le pertence las publicaciones id
  private publicacionesId: number;

  // Valor para la comparacion de strings
  private valorComparacionStrings: number;

  /**
   * Constructor componente de publicaciones
   * @param publServ servicio de publicaciones
   * @param usuComentarioServ servicio del usuario de los comentarios
   * @param commentServ servicio de comentarios
   * @param usuServ servicio de usuario
   * @param dialog dialogo de publicaciones y comentarios
   * @param dialogSelect dialogo de publicaciones y comentarios de seleccion
   */
  constructor(private publServ: PublicacionService, private usuComentarioServ: UsuarioService , private commentServ: ComentarioService, private usuServ: UsuarioService, public dialog: MatDialog, public dialogSelect: MatDialog) { }

  /**
   * Inicio de publicaciones y comentarios
   */
  ngOnInit() {

    this.boolEsAdmin = false;
    this.propioUsu = false;
    this.mensajeNoPubl = '';
    this.actEdit = false;
    this.boolComment = false;
    this.idPublCommentAbrir = 0;

    this.fecha = new FechaHoy();
    this.commentPubl = new ComentarioPubl();
    this.pasarImgPerfilPubl = new PasarImgObj();

    this.usuarioCommentIdImg = new UsuarioModel();
    this.usuForComment = new ComentarioModel();

    this.resultDiagString = '';

    this.formularioComment = new FormGroup({
      textoComentarioFCN: new FormControl('', [Validators.maxLength(500)])
    });

    this.publicacionesId = 0;

    this.idUsuLogged = 0;
    this.idUsuVisita = 0;

    // this.comprobacionUrl();

    this.numElementoCont = 0;
    this.boolActivarSubir = false;

    console.log('Usuario de visita perfil - publ: ' + this.usuarioVisita.idUsu);
    console.log('Usuario al que le pertence el perfil - publ: ' + this.usuarioLogged.idUsu);

  }

  /**
   * Actualizar cambios, evento que nos actualiza y recoge las publicaciones
   */
  public actualizarCambios() {

    this.dataCardPubl = []; // vaciar array publicaciones

    this.listCommentAny = []; // vaciar array comentarios
    this.listComment = [];

    this.listComentPubl = [];
    // vaciamos la lista de comentarios que le pasamos a la vista de la publicacion

    this.usuForComment = new ComentarioModel(); // vaciamos el objeto para el for de comentarios

    this.numElementoCont = 0; // poner contador a 0
    this.boolActivarSubir = false; // poner boton de subir a false

    this.comprobacionUrl();
    this.comprobarUsuario(); // comprobar usuario

    this.recogerPublicaciones();
  }

  // comprueba el tipo de url para saber a donde se dirije el get del servicio
  /**
   * metodo que comprueba el tipo de url para saber a donde se dirije el get del servicio
   */
  private comprobacionUrl() {

    this.idUsuLogged = this.usuarioLogged.idUsu;
    this.idUsuVisita = this.usuarioVisita.idUsu;

    if (this.urlGetPubl === 'http://localhost:9191/getPublicacionesUsuario/') {
      if (this.idUsuLogged !== this.idUsuVisita) {
        this.publicacionesId = this.usuarioLogged.idUsu;

      } else {

        this.publicacionesId = this.usuarioVisita.idUsu;
      }
    }

    if (this.urlGetPubl === 'http://localhost:9191/getPubliInicioUsuario/') {
      this.publicacionesId = this.usuarioLogged.idUsu;
    }


    // if (this.urlGetPubl === 'http://localhost:9191/getPubliPubl') {}
    // en este caso no se pasa valor es un comentario de referencia


    // Si se visita un perfil, se muetran las publicaciones
    /*
    this.valorComparacionStrings = this.urlGetPubl.localeCompare('http://localhost:9191/getPublicacionesUsuario/');
    if (this.valorComparacionStrings > 0) {
      this.publicacionesId = this.usuarioLogged.idUsu;

    } else {
      this.publicacionesId = this.usuarioVisita.idUsu;
    }
    */

  }

  /**
   * comprobamos el usuario que entra se visita a si mismo sus publicaciones o es un admin
   */
  private comprobarUsuario() {

    // tslint:disable-next-line:triple-equals
    if (this.usuarioLogged.idUsu == this.usuarioVisita.idUsu) {
      this.propioUsu = true; // puede modificar sus publicaciones
    }

    if (this.usuarioVisita.esAdministrador > 0) {
      this.boolEsAdmin = true; // solo puede borrar publicaciones de otros usuarios
    }

  }

  /**
   * metodo para recoger publicaciones y comentarios
   */
  private recogerPublicaciones() {

    this.publServ.getVariasUrlPubl(this.urlGetPubl, this.publicacionesId).subscribe(
      data => {
        this.listaPublAny = data;
        this.listaPubl = this.listaPublAny;

        // numero de publicaciones para la paginacion
        this.numPubl = this.listaPubl.length;

        // sino hay publicaciones
        if (this.numPubl < 1) {

          // poner mensaje
          this.mensajeNoPubl = 'No hay publicaciones diponibles';

        } else {

          // mostrar publicaciones
          for (const publ of this.listaPubl) {


            // console.log('Publicacion: '  + publ.idPublicacion + '/Id usuario publicacion: ' + publ.usuarioPubl.idUsu);

            this.esPrivadaNum = 0;
            this.esPrivadaNum = publ.pubEsPrivada;

            // tslint:disable-next-line:triple-equals
            if (this.esPrivadaNum > 0) {
              // if (this.esPrivadaNum <= 0) {
              this.esPrivadaString = 'Publicación Privada';
            } else {
              this.esPrivadaString = 'Publicación Pública';
            }

            // obtener la foto del usuario que escribio la publicacion
            this.usuServ.getFotoPerfil(publ.usuarioPubl.idUsu).subscribe(
              dataFotoUsu => {
                this.anyImgPerfilPubl = dataFotoUsu;

                this.anyImgPerfilPublExt = '';
                // tslint:disable-next-line:no-string-literal
                this.anyImgPerfilPublExt = this.anyImgPerfilPubl['ficheroCompletoString'];

                console.log('id usu ' + publ.usuarioPubl.idUsu);
                // console.log('Id usu ' + publ.usuarioPubl.idUsu + '/ foto ' + this.anyImgPerfilPublExt);

                if (this.anyImgPerfilPublExt !== '') {

                  // tslint:disable-next-line:no-string-literal
                  this.pasarImgPerfilPubl.imagenCompleta = this.anyImgPerfilPublExt;

                } else {
                  // tslint:disable-next-line:no-string-literal
                  this.pasarImgPerfilPubl.imagenCompleta = this.anyImgPerfilPubl['ficheroCompletoString'];
                }

                // comprobacion para activar el boton de subir

                if (this.numElementoCont > 5) {
                  this.numElementoCont = 0;
                  this.boolActivarSubir = true;
                } else {
                  this.boolActivarSubir = false;
                }

                this.numElementoCont = this.numElementoCont + 1;

                this.dataCardPubl.push(
                  {
                    usuarioPublFoto: this.pasarImgPerfilPubl.imagenCompleta,
                    /* listaCommentCard: ComentarioModel[]; */
                    /* listaComentariosPubl: ComentarioPubl[]; */
                    esPrivadaNum: this.esPrivadaNum,
                    esPublPrivada: this.esPrivadaString,
                    publObj: publ,
                    fechaPubl: publ.fechaCreacionPub,
                    idPubl: publ.idPublicacion,
                    actBtnSubir: this.boolActivarSubir
                  });

                // this.recogerComentarios(publ);

            });
          }
        }
      });
    }

  /**
   * metodo para recoger comentarios de una publicacion
   * @param idPublicacion id de publicacion para recoger los comentarios de esa publicacion
   */
  public recogerComentarios(idPublicacion: number) {

    this.dataCardComment = [];

    this.commentServ.getComentariosPublicacion(idPublicacion).subscribe(
      dataComent => {
        this.listCommentAny = dataComent;

        this.listComment = this.listCommentAny;

        for (const com of this.listComment) {

          this.usuComentarioServ.getFotoPerfil(com.usuarioComent.idUsu).subscribe(
            dataFotoComent => {

              // tslint:disable-next-line:no-string-literal
              this.fotoComentUsu = dataFotoComent['ficheroCompletoString'];

              this.dataCardComment.push({
                idPubl: idPublicacion,
                comment: com,
                imgComment: this.fotoComentUsu
              });

            });

        }



      });

  }

  /**
   * evento para el boton de mostrar comentarios
   * @param idPubl id de publicacion
   * @param actualizar nos indica si se actualiza o no la lista de comentarios al introducir o quitar uno
   */
  public mostrarComentarios(idPubl: number, actualizar: boolean) {


    if (this.boolComment === false) {
      this.boolComment = true;
      this.idPublCommentAbrir = idPubl;

      this.recogerComentarios(this.idPublCommentAbrir);

    } else {
      // vaciar lista de comentarios
      // this.dataCardComment = [];
      // this.boolComment = false;

      if (actualizar === true) {

        this.idPublCommentAbrir = idPubl;
        this.dataCardComment = [];
        this.recogerComentarios(this.idPublCommentAbrir);

      } else {
        this.dataCardComment = [];
        this.boolComment = false;
        this.idPublCommentAbrir = 0;
      }

    }

    // console.log(this.idPublCommentAbrir);

  }

  // de momento la edicion de publicaciones no se usan, usar mas adelante
  public editarPubl() {
    if (this.actEdit === false) {
      this.actEdit = true;
    } else {
      this.actEdit = false;
    }
  }

  /**
   * evento para borrar una publicacion junto a sus comentarios
   * @param idPubl id de publicacion a borrar
   * @param listaCom lista de comentarios pertenecientes a esa publicacion
   */
  public borrarPubl(idPubl: number, listaCom: ComentarioModel[]) {

    console.log(idPubl);

    const dialogRef = this.dialogSelect.open(AppDialogSelectComponent, {
      data: {
        tituloDialog: 'Borrar publicación',
        textoDialog: '¿Seguro que quieres borrar la publicación? (Se borraran tambien sus comentarios)'
      }
    });

    dialogRef.afterClosed().subscribe(result => {

      this.resultDiagString = result;

      if (this.resultDiagString === 'true') {

        // borrar los comentarios de la publicacion
        for (const com of listaCom) {
          this.borrarCommentsPubl(com.idComentario); // Quitar los null despues de la comprobacion
        }

        // borrar publicacion
        this.publServ.deletePublicacion(idPubl).subscribe(
        data => {
        console.log(data);

        // tslint:disable-next-line:no-string-literal
        if (data['respuesta'] === 'si') {
          this.openDialogPublComments('Publicacion', 'Publicacion borrada');
          this.actualizarCambios();

        } else {
          this.openDialogPublComments('Problemas', 'Publicacion no borrada');
        }

      });


      }


    });

  }

  // onSubmmitComment(formValue: any, publComment: PublicacionModel, event) {
    /**
     * evento para poner un comentario
     * @param formValue form value para recoger los datos del formulario de comentarios
     * @param publCommentId id de la publicacion al cual le pertenece el comentario nuevo
     * @param publCommentario objeto publicacion al cual le pertenece el comentario nuevo
     * @param event evento de crear un comentario
     */
  onSubmmitComment(formValue: any, publCommentId: number, publCommentario: PublicacionModel , event) {

    console.log(publCommentId);
    console.log(publCommentario);

    if (publCommentario != null) {

      const coment = new ComentarioModel();
      coment.fechaCreacionCom = this.fecha.fechaHoraActual();
      coment.textoComentario = formValue.textoComentarioFCN;
      coment.publComent = publCommentario;
      coment.usuarioComent = this.usuarioVisita;

      this.commentServ.postComentario(coment).subscribe(
        data => {

        // tslint:disable-next-line:no-string-literal
        if (data['respuesta'] === 'Comentario insertado') {
          // this.actualizarCambios();
          this.mostrarComentarios(this.idPublCommentAbrir, true);

        } else {
          this.openDialogPublComments('Problemas', 'Comentario no insertado');
        }

      });

    } else {
      this.openDialogPublComments('Problemas', 'Comentario no se puede insertar en la publicacion');
    }


  }

  /**
   * metodo para borrar los comentarios de una publicacion
   */
  private borrarCommentsPubl(idComment: number) {

    this.commentServ.deleteComentario(idComment).subscribe(
      data => {
        console.log(data);
      }
    );

  }

  /**
   * evento para borrar el comentario
   * @param idComment id del comentario a borrar
   */
  public borrarComment(idComment: number) {

    const dialogRef = this.dialogSelect.open(AppDialogSelectComponent, {
      data: {
        tituloDialog: 'Borrar comentario',
        textoDialog: '¿Seguro que quieres borrar el comentario?'
      }
    });

    dialogRef.afterClosed().subscribe(result => {

      this.resultDiagString = result;

      if (this.resultDiagString === 'true') {

        this.commentServ.deleteComentario(idComment).subscribe(
        data => {
          console.log(data);

          // tslint:disable-next-line:no-string-literal
          if (data['respuesta'] === 'si') {
            this.openDialogPublComments('Comentario', 'Comentario borrado');
            // this.actualizarCambios();
            this.mostrarComentarios(this.idPublCommentAbrir, true);
          } else {
            this.openDialogPublComments('Problemas', 'Problemas al borrar el comentario');
          }

        });

      }

    });

  }

  // dialogos ----------------------------------

  /**
   * dialogo para las publicaciones y comentarios
   * @param titulo titulo dialogo comentarios publicacion
   * @param texto texto dialogo comentarios publicacion
   */
  public openDialogPublComments(titulo: string, texto: string) {
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
