import { Component, OnInit, Input, ViewChild, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { UsuarioModel } from '../modelos/UsuarioModel';
import { EntradaServService } from '../servicios/entrada-serv.service';
import { EntradasModel } from '../modelos/EntradasModel';
import { MatPaginator, MatTableDataSource, MatDialog } from '@angular/material';
import { Observable } from 'rxjs';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { FechaHoy } from '../objetos/FechaHoy';
import { AppDialogComponent } from '../app-dialog/app-dialog.component';
import { AppDialogSelectComponent } from '../app-dialog-select/app-dialog-select.component';

/**
 * definicion del card usado con paginacion del componente de entradas
 */
export interface Card {
  idEntr: number;
  titulo: string;
  texto: string;
  fecha: Date;
}


@Component({
  selector: 'app-perfil-ent',
  templateUrl: './perfil-ent.component.html',
  styleUrls: ['./perfil-ent.component.css']
})

export class PerfilEntComponent implements OnInit, OnDestroy {

  @Input()
  public usuarioEntra: UsuarioModel; // usuario loggeado

  @Input()
  public usuarioVisitado: UsuarioModel; // usuario al que se le visitan las entradas

  // comprobacion de usuario
  public propioUsu: boolean;

  // Activa o descariva la modificacion de las entradas
  public boolEsAdmin: boolean;

  // recoger lista de entradas
  public listaEntrAny: any[] = [];
  public listaEntr: EntradasModel[] = [];
  // public entr: EntradasModel;
  public numEntr: number;
  // public listEntrAMostrar: EntradasModel[] = [];

  // Variables formulario
  formularioEnt: FormGroup;  // formulario
  fecha: FechaHoy;

  // Paginacion
  @ViewChild(MatPaginator) paginator: MatPaginator;
  obsEntr: Observable<any>;
  dataSource: MatTableDataSource<Card> = new MatTableDataSource<Card>();
  public dataCard: Card[] = [];

  // variables para borrar entradas
  private resultDiagBorrarEntr: string;

  /**
   * constructor para el componente perfil-ent
   * @param dialog dialog para las entradas
   * @param entrServ servicio de entradas
   * @param changeDetectorRef changeDetectorRef  para detectar los cambios del paginator
   */
  constructor(public dialog: MatDialog, private entrServ: EntradaServService, private changeDetectorRef: ChangeDetectorRef) { }

  /**
   * inicio para perfil-ent
   */
  ngOnInit() {

    this.fecha = new FechaHoy();

    this.propioUsu = false;
    this.boolEsAdmin = false;

    this.numEntr = 0;

    this.resultDiagBorrarEntr = '';

    this.formularioEnt = new FormGroup({
      tituloFCNEntrada: new FormControl('', [Validators.maxLength(200)]),
      textoFCNEntrada: new FormControl('', [Validators.maxLength(500)])
    });

    this.comprobarUsu();
    this.recogerEntradas();

  }

  /**
   * en el onDestroy desconectar paginador
   */
  ngOnDestroy() {
    if (this.dataSource) {
      this.dataSource.disconnect();
    }
  }

  /**
   * metodo para comprobar el tipo de usuario que entra
   */
  private comprobarUsu() {

    // es el que entra admin? si = puede modificar, no = no puede modificar
    if (this.usuarioEntra.esAdministrador > 0) {
      this.boolEsAdmin = true;
    } else {
      this.boolEsAdmin = false;
    }

    // El que entra es para ver sus entradas? si = puede modificar, no = no puede modificar
    if (this.usuarioEntra.idUsu === this.usuarioVisitado.idUsu) {
      this.propioUsu = true;
    }
  }

  /**
   * metodo para recoger entradas y mostrarlas
   */
  private recogerEntradas() {

    // cogemos entradas del servicio
    this.entrServ.getEntradasUsuario(this.usuarioVisitado.idUsu).subscribe(
      data => {
        this.listaEntrAny = data;
        this.listaEntr = this.listaEntrAny;

        // obtener numero de entradas
        this.numEntr = this.listaEntr.length;

        // sino hay entradas
        if (this.numEntr === 0) {
          this.numEntr = 1;

          // mostrar que no hay entradas
          this.dataCard.push(
          {idEntr: 0,
          titulo: 'No se han escrito entradas todavia',
          texto: '',
          fecha: null});

        } else {

          // si hay, mostrarlas
          for (const entr of this.listaEntr) {

            this.dataCard.push(
              {idEntr: entr.idEntrada,
              titulo: entr.tituloEntrada,
              texto: entr.textoEntrada,
              fecha: entr.fechaCreacionEnt});

          }

        }

        // paginator, paginamos las entradas
        this.changeDetectorRef.detectChanges(); // detectamos los cambios

        this.dataSource = new MatTableDataSource<Card>(this.dataCard); // Agregamos el array de entradas
        this.dataSource.paginator = this.paginator;
        this.obsEntr = this.dataSource.connect(); // Conectamos el paginador

      });
  }


  // botones para la gestion de las entradas
  /**
   * evento del formulario para introducir entradas
   * @param formValue datos del formulario que vienen del formulario
   * @param event evento
   */
  onSubmmit(formValue: any, event) {
    const entr = new EntradasModel();
    entr.usuarioEntradas = this.usuarioEntra;
    entr.fechaCreacionEnt = this.fecha.fechaHoraActual();
    entr.tituloEntrada = formValue.tituloFCNEntrada;
    entr.textoEntrada = formValue.textoFCNEntrada;

    if (entr.tituloEntrada === '') {

      this.openDialogAdvert('Problema', 'No puedes dejar vacio el titulo de la entrada');

    } else {
      this.entrServ.postEntrada(entr).subscribe(
        data => {
          console.log(data);
          this.actualizarEntr();
        });
    }
  }

  /**
   * metodo para actualizar las entradas
   */
  private actualizarEntr() {

    if (this.dataSource) {
      this.dataSource.disconnect();
    }

    this.dataCard = [];
    this.recogerEntradas();
  }

  /**
   * dialogo del mensaje de entradas
   * @param tituloDialog titulo dialogo
   * @param textoDialog texto dialogo
   */
  public openDialogAdvert(tituloDialog: string, textoDialog: string) {

    const dialogRef = this.dialog.open(AppDialogComponent, {
      data: {
        // tslint:disable-next-line:object-literal-shorthand
        tituloDialog: tituloDialog,
        // tslint:disable-next-line:object-literal-shorthand
        textoDialog: textoDialog
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }


  /**
   * evento para borrar entradas
   * @param idEntr id de entrada a borrar
   */
  public borrarEntr(idEntr: number) {

    console.log(idEntr);

    // enviar informacion al dialogo
    const dialogRef = this.dialog.open(AppDialogSelectComponent, {
      data: {
        tituloDialog: 'Borrar',
        textoDialog: '¿Seguro que quieres borrar la entrada?'
      }
    });

    dialogRef.afterClosed().subscribe(result => {

      this.resultDiagBorrarEntr = result;

      if (this.resultDiagBorrarEntr === 'true') {
        console.log('Borrar');

        this.entrServ.deleteEntrada(idEntr).subscribe(
          data => {
            console.log(data);

            // tslint:disable-next-line:no-string-literal
            if (data['respuesta'] === 'si') {

              this.openDialogAdvert('Entrada', 'borrada');

            } else {
              this.openDialogAdvert('Entrada', 'problemas para borrar');
            }

            this.actualizarEntr();
          });

      }


  });


  }



}
