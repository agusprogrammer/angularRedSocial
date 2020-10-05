import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { AppDialogSelectComponent } from '../app-dialog-select/app-dialog-select.component';
import { AppDialogComponent } from '../app-dialog/app-dialog.component';
import { AmigosUsuModel } from '../modelos/AmigosUsuModel';
import { UsuarioModel } from '../modelos/UsuarioModel';
import { AmigosUsuService } from '../servicios/amigos-usu.service';
import { UsuarioService } from '../servicios/usuario.service';

/**
 * card para peticiones usando interfaz sin paginator
 */
export interface CardPeticiones {
  usuario: UsuarioModel;
  usuarioLog: UsuarioModel;
  usuarioFoto: any;
}

@Component({
  selector: 'app-peticiones',
  templateUrl: './peticiones.component.html',
  styleUrls: ['./peticiones.component.css']
})
export class PeticionesComponent implements OnInit {

  @Input()
  public usuarioLogged: UsuarioModel; // usuario loggeado

  // interfaces card
  public dataCardReciv: CardPeticiones[] = [];
  public dataCardPendientes: CardPeticiones[] = [];

  // variables de la parte recibidas
  private listaAnyRecv: any[];
  private petRecv: AmigosUsuModel;
  private usuRecv: UsuarioModel;
  private listaUsuRecv: UsuarioModel[];
  private fotoUsuRecv: any;

  // variables de la parte pendientes
  private listaAnyPend: any[];
  private petPend: AmigosUsuModel;
  private usuPend: UsuarioModel;
  private listaUsuPend: UsuarioModel[];
  private fotoUsuPend: any;

  // variables para la parte de actualizar
  private amigoUsuActualizar: AmigosUsuModel;

  // respuesta para borrar peticiones para el dialogo de informacion
  private stringDataBorrar: string;

  // respuesta para borrar peticiones por dialogo de seleccion
  private resultDiagBorrarPeticion: string;

  /**
   * Constructor del componente de peticiones
   * @param usuServ servicio de usuarios
   * @param amUsuServ servicio de amigos de usuario
   * @param dialogPeticion dialogo de peticion
   */
  constructor(private usuServ: UsuarioService , private amUsuServ: AmigosUsuService, public dialogPeticion: MatDialog) { }

  /**
   * inicio de peticiones
   */
  ngOnInit() {

    this.dataCardReciv = [];
    this.dataCardPendientes = [];

    this.listaAnyRecv = [];
    this.listaAnyPend = [];

    this.petRecv = new AmigosUsuModel();
    this.petPend = new AmigosUsuModel();

    this.listaUsuRecv = [];
    this.listaUsuPend = [];

    this.amigoUsuActualizar = new AmigosUsuModel();

    this.stringDataBorrar = '';
    this.resultDiagBorrarPeticion = '';

    this.cargarPeticionesRecibidas();
    this.cargarPeticionesPendientes();

  }

  /**
   * metodo de actualizar peticiones
   */
  actualizar() {

    this.dataCardReciv = [];
    this.dataCardPendientes = [];

    this.listaAnyRecv = [];
    this.listaAnyPend = [];

    this.petRecv = new AmigosUsuModel();
    this.petPend = new AmigosUsuModel();

    this.listaUsuRecv = [];
    this.listaUsuPend = [];

    this.amigoUsuActualizar = new AmigosUsuModel();

    this.stringDataBorrar = '';

    this.cargarPeticionesRecibidas();
    this.cargarPeticionesPendientes();
  }

  /**
   * metodo para la carga de peticiones recibidas
   */
  private cargarPeticionesRecibidas() {

    this.amUsuServ.getPeticionesRecibidas(this.usuarioLogged.idUsu).subscribe(
      dataPeRecv => {

        this.listaAnyRecv = dataPeRecv;
        for (const recvAny of this.listaAnyRecv) {
          this.petRecv = recvAny;

          this.usuRecv = this.petRecv.usuAmIdSolicitante;
          this.listaUsuRecv.push(this.usuRecv);

        }

        for (const usuRe of this.listaUsuRecv) {

          this.usuServ.getFotoPerfil(usuRe.idUsu).subscribe(
            dataFotoRecv => {
              // tslint:disable-next-line:no-string-literal
              this.fotoUsuRecv = dataFotoRecv['ficheroCompletoString'];

              this.dataCardReciv.push({
                usuario: usuRe,
                usuarioLog: this.usuarioLogged,
                usuarioFoto: this.fotoUsuRecv
              });

            });

        }



      }
    );
  }

  /**
   * metodo para la carga de peticiones pendientes
   */
  private cargarPeticionesPendientes() {

    this.amUsuServ.getPeticionesRealizadas(this.usuarioLogged.idUsu).subscribe(
      dataPePendient => {

        this.listaAnyPend = dataPePendient;
        for (const pendAny of this.listaAnyPend) {
          this.petPend = pendAny;

          this.usuPend = this.petPend.usuAmIdReceptor;
          this.listaUsuPend.push(this.usuPend);
        }

        for (const usuPen of this.listaUsuPend) {

          this.usuServ.getFotoPerfil(usuPen.idUsu).subscribe(
            dataFotoSol => {

              // tslint:disable-next-line:no-string-literal
              this.fotoUsuPend = dataFotoSol['ficheroCompletoString'];

              this.dataCardPendientes.push({
                usuario: usuPen,
                usuarioLog: this.usuarioLogged,
                usuarioFoto: this.fotoUsuPend
              });

            });

        }

      }
    );
  }

  /**
   * metodo (evento) para cancelar una peticion recibida
   * @param usuSolReciv usuario el cual hio la peticion
   */
  public cancelarPeticionRecibida(usuSolReciv: UsuarioModel) {

    const dialogRef = this.dialogPeticion.open(AppDialogSelectComponent, {
      data: {
        tituloDialog: 'Borrar',
        textoDialog: '¿Seguro que quieres cancelar la peticion?'
      }
    });

    dialogRef.afterClosed().subscribe(result => {

      this.resultDiagBorrarPeticion = result;

      if (this.resultDiagBorrarPeticion === 'true') {

        this.amUsuServ.deleteAmigoUsu(usuSolReciv.idUsu, this.usuarioLogged.idUsu).subscribe(
        data => {

          // tslint:disable-next-line:no-string-literal
          this.stringDataBorrar = data['respuesta'];

          if (this.stringDataBorrar === 'si') {
            this.openDialogPeticiones('Petición', 'Amistad cancelada');
            this.actualizar();
          } else {
            this.openDialogPeticiones('Problemas', 'Problemas al borrar la amistad');
          }

        });

      }

    });

  }

  /**
   * metodo (evento) para aceptar la peticion recibida por un usuario
   * @param usuSolReciv usuario el cual recibimos la peticion
   */
  public aceptarPeticion(usuSolReciv: UsuarioModel) {

    this.amigoUsuActualizar = new AmigosUsuModel();

    this.amUsuServ.getAmigosUsuIds(usuSolReciv.idUsu, this.usuarioLogged.idUsu).subscribe(
      data => {

        if (data !== undefined) {
          this.amigoUsuActualizar = data;
          this.amigoUsuActualizar.solicitudAceptada = 1;

          this.amUsuServ.putAmigoUsu(this.amigoUsuActualizar).subscribe(
            dataPutAmUsu => {

              if (dataPutAmUsu !== undefined) {
                this.openDialogPeticiones('Petición', 'Petición aceptada');
                this.actualizar();

              } else {
                this.openDialogPeticiones('Problema', 'Problemas al aceptar la amistad');
              }

            });
        }

    });

  }

  /**
   * metodo (evento) para cancelar una peticion enviada
   * @param usuSolEnv usuario al que se la habiamos enviado
   */
  public cancelarPeticionEnviada(usuSolEnv: UsuarioModel) {

    const dialogRef = this.dialogPeticion.open(AppDialogSelectComponent, {
      data: {
        tituloDialog: 'Borrar',
        textoDialog: '¿Seguro que quieres cancelar la peticion?'
      }
    });

    dialogRef.afterClosed().subscribe(result => {

      this.resultDiagBorrarPeticion = result;

      if (this.resultDiagBorrarPeticion === 'true') {

        this.amUsuServ.deleteAmigoUsu( this.usuarioLogged.idUsu, usuSolEnv.idUsu).subscribe(
        data => {

        // tslint:disable-next-line:no-string-literal
        this.stringDataBorrar = data['respuesta'];

        if (this.stringDataBorrar === 'si') {
          this.openDialogPeticiones('Petición', 'Petición cancelada');
          this.actualizar();
        } else {
          this.openDialogPeticiones('Petición', 'Problemas al borrar la petición');
        }

        });

      }


    });

  }

  /**
   * metodo para abrir el dialogo de peticiones
   * @param titulo titulo del dialogo de peticiones
   * @param texto texto para el dialogo de peticiones
   */
  public openDialogPeticiones(titulo: string, texto: string) {

    const dialogRef = this.dialogPeticion.open(AppDialogComponent, {
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
