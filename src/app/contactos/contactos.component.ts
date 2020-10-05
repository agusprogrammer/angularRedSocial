import { Component, Input, OnInit, ViewChild, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { MatDialog, MatPaginator, MatTableDataSource } from '@angular/material';
import { Observable } from 'rxjs';
import { AppDialogSelectComponent } from '../app-dialog-select/app-dialog-select.component';
import { AppDialogComponent } from '../app-dialog/app-dialog.component';
import { AmigosUsuIdModel } from '../modelos/AmigosUsuIdModel';
import { AmigosUsuModel } from '../modelos/AmigosUsuModel';
import { UsuarioModel } from '../modelos/UsuarioModel';
import { FechaHoy } from '../objetos/FechaHoy';
import { AmigosUsuService } from '../servicios/amigos-usu.service';
import { UsuarioService } from '../servicios/usuario.service';


/**
 * definicion del cardContact usado con paginacion
 */
export interface CardContact {
  usuario: UsuarioModel;
  usuarioLog: UsuarioModel;
  usuarioFoto: any;
  boolAmigo: boolean;
}

@Component({
  selector: 'app-contactos',
  templateUrl: './contactos.component.html',
  styleUrls: ['./contactos.component.css']
})
export class ContactosComponent implements OnInit, OnDestroy {

  @Input()
  public usuarioLogged: UsuarioModel; // usuario loggeado

  @Input()
  public urlGetContactos: string; // Url que le pasamos, segun la url hara una cosa u otra

  public urlGet: string; // url para las publ usuario

  // recoger objetos de los servicios
  // Para mostrar los amigos de un usuario
  private listAmUsuAny: any[];
  private amUsu: AmigosUsuModel;
  private listUsuAmigos: UsuarioModel[]; // lista de amigos de un usuario

  // Para buscar amigos y mostrar los amigos de usuario
  private usuListAny: any[];
  private usuListUsuarios: UsuarioModel[];
  private usu: UsuarioModel;

  // imagen de perfil
  private imgPer: any;

  // cosas del paginator
  @ViewChild(MatPaginator) paginator: MatPaginator;
  obsContact: Observable<any>;
  dataSource: MatTableDataSource<CardContact> = new MatTableDataSource<CardContact>();
  public dataCardContact: CardContact[] = [];

  // largo de la lista del paginator
  public numUsuarios: number;

  // activa el perfil que visita el usuario
  public perfilVisitadoBool: boolean;
  public perfilVisita: UsuarioModel; // perfil que se visita

  // AmigoUsuario Post para crear peticion de amistad
  private amUsuIdPost: AmigosUsuIdModel;
  private amUsuPost: AmigosUsuModel;
  private respPostPeticion: string; // respuesta del post de la peticion de amistad
  private boolEstaEnPet: boolean;
  // indica si la peticion ha sido realizada por alguna
  // de las 2 partes que participan en la amistad
  private boolEstaEnPet2: boolean;

  // objeto para poner fechas
  private fechas: FechaHoy;

  // variables para borrar el amigo de usuario
  private boolBorrarAmigo: boolean;
  private borrarAmigoAny: any;
  private respBorrarAmigo: string;
  private resultDiagBorrarAmistad: string;
  // respuesta del dialogo de la seleccion de la opcion de cancelar la amistad

  // Variables para obtener los ids del amigos usuario usuario a borrar en la base de datos
  private amIdSolDelete: number;
  private amIdRecepDelete: number;

  /**
   * Constructor del componente de contactos
   * @param usuServ inyeccion del servicio de usuarios
   * @param amUsuServ inyeccion del servicio de la tabla de amigos de usuarios
   * @param dialogContact inyeccion del mat dialog de contactos, usado para los dialogos
   * @param changeDetectorRef ChangeDetectorRef para los cambios en el card
   */
  constructor(private usuServ: UsuarioService, private amUsuServ: AmigosUsuService, public dialogContact: MatDialog, private changeDetectorRef: ChangeDetectorRef) { }

  /**
   * Inicio del componente de inicio
   */
  ngOnInit() {

    this.amUsu = new AmigosUsuModel();
    this.usu = new UsuarioModel();

    this.listUsuAmigos = [];
    this.usuListUsuarios = [];

    this.perfilVisitadoBool = false;
    this.perfilVisita = new UsuarioModel();

    this.fechas = new FechaHoy();

    this.boolBorrarAmigo = false;
    this.respBorrarAmigo = '';

    this.amIdSolDelete = 0;
    this.amIdRecepDelete = 0;

    this.resultDiagBorrarAmistad = '';
    this.boolEstaEnPet = false;
    this.boolEstaEnPet2 = false;

    this.activarModo();
  }

  /**
   * cuando se destruye el componente,  descativamos el paginator
   */
  ngOnDestroy() {
    if (this.dataSource) {
      this.dataSource.disconnect();
    }
  }

  /**
   * activar modo de funcionamiento, este metodo se activa con el inicio y segun la url de servicio que le pasamos
   * actuara de una forma u otra, ya sea para buscar los amigos del usario loggeado o para buscar nuevos amigos
   */
  private activarModo() {

    if (this.urlGetContactos === 'http://localhost:9191/getAmigosUsu/' + this.usuarioLogged.idUsu) {
      this.modoMostrarAmigos(); // activar modo de mostrar amigos
    } else {
      this.modoBuscarAmigos(); // activar modo de buscar amigos
    }
  }

  /**
   * metodo para actualizar cambios para cuando se realizan operaciones de modificacion o borrado
   */
  private actualizar() {

    if (this.dataSource) {
      this.dataSource.disconnect();
    }

    // Actualizar variables
    this.listUsuAmigos = [];
    this.listAmUsuAny = [];
    this.amUsu = new AmigosUsuModel();
    this.imgPer = undefined; // recordatorio, es de tipo any

    this.usuListAny = [];
    this.usuListUsuarios = [];
    this.perfilVisitadoBool = false;
    this.perfilVisita = new UsuarioModel();

    this.amUsuPost = new AmigosUsuModel();
    this.respPostPeticion = '';

    this.boolBorrarAmigo = false;
    this.respBorrarAmigo = '';

    this.amIdSolDelete = 0;
    this.amIdRecepDelete = 0;

    this.dataCardContact = [];  // vaciar lista datacard

    if (this.urlGetContactos === 'http://localhost:9191/getAmigosUsu/' + this.usuarioLogged.idUsu) {
      this.modoMostrarAmigos(); // activar modo de mostrar amigos
    } else {
      this.modoBuscarAmigos(); // activar modo de buscar amigos
    }

  }

  /**
   * metodo que se activa con el modo de mostrar amigos
   */
  private modoMostrarAmigos() {

    this.amUsuServ.getAmigosUsuVariasUrl(this.urlGetContactos).subscribe(
      dataAmUsu => {
        this.listAmUsuAny = [];
        this.listAmUsuAny = dataAmUsu;
        this.listUsuAmigos = [];
        // ver que usuarios son los amigos
        for (const amUsuAny of this.listAmUsuAny) {

          this.amUsu = amUsuAny;

          if (this.amUsu.usuAmIdReceptor.idUsu !== this.usuarioLogged.idUsu) {
            this.listUsuAmigos.push(this.amUsu.usuAmIdReceptor);
          }

          if (this.amUsu.usuAmIdSolicitante.idUsu !== this.usuarioLogged.idUsu) {
            this.listUsuAmigos.push(this.amUsu.usuAmIdSolicitante);
          }

        }

        // poner el numero de usuarios
        this.numUsuarios = this.listUsuAmigos.length;

        // mostrar los usuarios
        for (const usu of this.listUsuAmigos) {

          this.usuServ.getFotoPerfil(usu.idUsu).subscribe(
            dataImg => {

            this.imgPer = dataImg;
            // tslint:disable-next-line:no-string-literal
            this.imgPer = this.imgPer['ficheroCompletoString'];

            this.dataCardContact.push({
              usuario: usu,
              usuarioLog: this.usuarioLogged,
              usuarioFoto: this.imgPer,
              boolAmigo: true
            });

            // paginator, paginamos las publicaciones
            this.changeDetectorRef.detectChanges(); // detectamos los cambios

            this.dataSource = new MatTableDataSource<CardContact>(this.dataCardContact); // Agregamos el array de contactos
            this.dataSource.paginator = this.paginator;
            this.obsContact = this.dataSource.connect(); // Conectamos el paginador

          });


        }

      }
    );

  }

  /**
   * metodo que se activa con la busqueda de amigos
   */
  private modoBuscarAmigos() {

    this.usuServ.getUsuVariasUrl(this.urlGetContactos).subscribe(
      dataUsu => {
        this.usuListAny = [];
        this.usuListAny = dataUsu;

        // recoger usuarios
        for (const usuAny of this.usuListAny) {
          // console.log(usuAny);
          this.usu = usuAny;
          this.usuListUsuarios.push(this.usu);
        }

        this.numUsuarios = this.usuListUsuarios.length;

        for (const usu of this.usuListUsuarios) {
          this.modoBuscarAmigosPonerUsuarios(usu);
        }

      });

  }

  /**
   * metodo para poner uno o uno los usuarios en el card a partir del metodo modoBuscarAmigos()
   * @param usu usuario que le pasamos
   */
  private modoBuscarAmigosPonerUsuarios(usu: UsuarioModel) {

    // console.log(usu.idUsu);

    this.usuServ.getFotoPerfil(usu.idUsu).subscribe(
      dataImg => {

        this.imgPer = dataImg;
        // tslint:disable-next-line:no-string-literal
        this.imgPer = this.imgPer['ficheroCompletoString'];

        // averiguar si es amigo
        // this.averiguarAmigos(usu);

        this.dataCardContact.push({
          usuario: usu,
          usuarioLog: this.usuarioLogged,
          usuarioFoto: this.imgPer,
          boolAmigo: false
        });

        // paginator, paginamos las publicaciones
        this.changeDetectorRef.detectChanges(); // detectamos los cambios

        this.dataSource = new MatTableDataSource<CardContact>(this.dataCardContact); // Agregamos el array de publicaciones
        this.dataSource.paginator = this.paginator;
        this.obsContact = this.dataSource.connect(); // Conectamos el paginador


    });
  }

  /**
   * metodo (evento) para activar visita de un usuario seleccionado
   * @param usuVisit usuario al que visitamos
   */
  public visitarPerfil(usuVisit: UsuarioModel) {

    if (this.perfilVisitadoBool === false) {
      this.perfilVisitadoBool = true;
      this.perfilVisita = usuVisit;
    } else {
      this.perfilVisitadoBool = false;
      this.perfilVisita = new UsuarioModel();
    }
  }

  /**
   * metodo (evento) para envio de peticiones de amistad para la parte de buscar amigos,
   * este metodo comprueba antes de enviar de que no se haya enviado antes
   * @param usuRecept usuario al que le enviamos la peticion de amistad
   */
  public enviarPeticionAmistad(usuRecept: UsuarioModel) {

    // comprobacion de que la peticion no ha sido enviada anteriormente, para evitar repeticiones
    this.amUsuServ.getAmigosUsuIds(usuRecept.idUsu, this.usuarioLogged.idUsu).subscribe(
      data => {

        // tslint:disable-next-line:no-string-literal
        if (data['idUsuAm'] === null) {
          this.boolEstaEnPet = false;

        } else {
          this.boolEstaEnPet = true;
        }

        this.amUsuServ.getAmigosUsuIds(this.usuarioLogged.idUsu, usuRecept.idUsu).subscribe(
          data2 => {

            // tslint:disable-next-line:no-string-literal
            if (data2['idUsuAm'] === null) {

              this.boolEstaEnPet2 = false;

            } else {
              this.boolEstaEnPet2 = true;
            }

            this.enviarPeticionAmistadGuardar(usuRecept);

          }
        );


      }
    );


  }

  /**
   * metodo para el envio de la peticion de amistad
   * @param usuReceptGuardar usuario al que se le envia la peticion de amistad
   */
  private enviarPeticionAmistadGuardar(usuReceptGuardar: UsuarioModel) {

    if (this.boolEstaEnPet === true && this.boolEstaEnPet2 === true) {

      this.amUsuPost = new AmigosUsuModel();

      this.amUsuPost.usuAmIdSolicitante = this.usuarioLogged;
      this.amUsuPost.usuAmIdReceptor = usuReceptGuardar;

      this.amUsuIdPost = new AmigosUsuIdModel();
      this.amUsuPost.idUsuAm = this.amUsuIdPost;

      this.amUsuPost.idUsuAm.idSolicitante = this.usuarioLogged.idUsu;
      this.amUsuPost.idUsuAm.idReceptor = usuReceptGuardar.idUsu;

      this.amUsuPost.solicitudAceptada = 0;

      this.amUsuPost.fechaEnviada = this.fechas.fechaHoraActual();

      this.amUsuServ.postAmigoUsu(this.amUsuPost).subscribe(
      dataPostAm => {

        // tslint:disable-next-line:no-string-literal
        this.respPostPeticion = dataPostAm['respuesta'];

        // recoger respuesta, mostrar dialogo
        if (this.respPostPeticion === 'Amigo usuario insertado') {
          this.openDialogContacts('Petición', 'Su petición ha sido enviada');
          this.actualizar();

        } else if (this.respPostPeticion === 'Problemas, Amigo usuario no insertado') {
          this.openDialogContacts('Problemas', 'Problemas con la petición');

        } else {
          this.openDialogContacts('Problemas', 'Petición vacia');
        }


      });

    } else {
      this.openDialogContacts('Petición', 'La petición ya ha sido enviada, revise la parte de peticiones');
    }

  }

  /**
   * metodo (evento) de la parte de amigos para cancelar la Amistad con un usuario, realiza la comprobacion antes de borrar
   * @param usuAmigo usuario al que le enviamos que queremos cancelar la amistad
   */
  public cancelarAmistad(usuAmigo: UsuarioModel) {

    // va por ids el de borrar, recibe un si o un no segun si se borra o no

    // comprobar que esta en la tabla de amigos usu

    const dialogRef = this.dialogContact.open(AppDialogSelectComponent, {
      data: {
        tituloDialog: 'Borrar',
        textoDialog: '¿Seguro que quieres cancelar la amistad?'
      }
    });

    dialogRef.afterClosed().subscribe(result => {

      this.resultDiagBorrarAmistad = result;

      if (this.resultDiagBorrarAmistad === 'true') {

        this.amUsuServ.getAmigosUsuIds(usuAmigo.idUsu, this.usuarioLogged.idUsu).subscribe(
        data => {
          this.borrarAmigoAny = undefined;
          this.borrarAmigoAny = data;

          if (this.borrarAmigoAny.idUsuAm !== null) {
          this.boolBorrarAmigo = true;
          this.amIdSolDelete = usuAmigo.idUsu;
          this.amIdRecepDelete = this.usuarioLogged.idUsu;

          if (this.boolBorrarAmigo === true) {
            this.borrarAmistad();
          }

        }
        });

        this.amUsuServ.getAmigosUsuIds(this.usuarioLogged.idUsu, usuAmigo.idUsu).subscribe(
        data => {
          this.borrarAmigoAny = undefined;
          this.borrarAmigoAny = data;

          if (this.borrarAmigoAny.idUsuAm !== null) {
          this.boolBorrarAmigo = true;
          this.amIdSolDelete = this.usuarioLogged.idUsu;
          this.amIdRecepDelete = usuAmigo.idUsu;

          if (this.boolBorrarAmigo === true) {
            this.borrarAmistad();
          }

        }
        });

      }

    });

  }

  // No es un evento, solo lo borra de la base de datos
  /**
   * metodo para borrar la amistad despues de realizar la comprobacion en cancelarAmistad(usuAmigo: UsuarioModel)
   */
  private borrarAmistad() {

    if (this.boolBorrarAmigo === true) {

      // cambiar los ids, no siempre van a ser los mismos
      this.amUsuServ.deleteAmigoUsu(this.amIdSolDelete, this.amIdRecepDelete).subscribe(
        data => {
          this.borrarAmigoAny = undefined;
          this.borrarAmigoAny = data;

          // tslint:disable-next-line:no-string-literal
          this.respBorrarAmigo = this.borrarAmigoAny['respuesta'];

          if (this.respBorrarAmigo === 'si') {
            this.openDialogContacts('Amistad borrada', 'Esta relación ya no existe');
            this.actualizar();

          } else {
            this.openDialogContacts('Problema', 'Problemas al borrar la amistad');

          }

        }
      );

    } else {
      this.openDialogContacts('Problema', 'Esta relación no existe');

    }

  }

  /**
   * metodo para abrir un dialogo
   * @param titulo titulo del dialogo
   * @param texto texto del dialogo
   */
  public openDialogContacts(titulo: string, texto: string) {

    const dialogRef = this.dialogContact.open(AppDialogComponent, {
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
