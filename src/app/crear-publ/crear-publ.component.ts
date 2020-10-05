import { Component, OnInit, Input } from '@angular/core';
import { UsuarioModel } from '../modelos/UsuarioModel';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { PublicacionModel } from '../modelos/PublicacionModel';
import { FechaHoy } from '../objetos/FechaHoy';
import { AppDialogComponent } from '../app-dialog/app-dialog.component';
import { MatDialog } from '@angular/material';
import { PublicacionService } from '../servicios/publicacion.service';

@Component({
  selector: 'app-crear-publ',
  templateUrl: './crear-publ.component.html',
  styleUrls: ['./crear-publ.component.css']
})
export class CrearPublComponent implements OnInit {

  @Input()
  public usuarioEntra: UsuarioModel; // usuario loggeado

  @Input()
  public usuarioVisitado: UsuarioModel; // usuario al que se le visitan las entradas

  // ver ediciones mas adelante
  // @Input()
  // public publEdit: PublicacionModel;

  // variables de la edicion
  private tituloPublicacionEdit: string;
  private textoPublicacionEdit: string;
  private publPrivaEdit: string;

  // comprobacion de usuario
  public usuModifica: boolean;

  // variables formulario
  formulario: FormGroup;  // formulario
  fecha: FechaHoy;
  publPriva: number; // indica si la publicacion es privada

  // respuesta al crear la publicacion
  respuesta: string;

  /**
   * constructor para el componente de crear publicaciones
   * @param dialog dialog para crear publicaciones
   * @param publServ servicio de publicaciones
   */
  constructor(public dialog: MatDialog, private publServ: PublicacionService) { }

  /**
   * Inicio del componente de crear publicaciones
   */
  ngOnInit() {

    this.fecha = new FechaHoy();
    this.publPriva = 0;

    this.respuesta = '';

    // variables edicion
    this.tituloPublicacionEdit = '';
    this.textoPublicacionEdit = '';
    this.publPrivaEdit = '';

    // comprobar edicion (ver mas adelante)
    /*
    if (this.publEdit !== null || this.publEdit !== undefined) {
      this.tituloPublicacionEdit = this.publEdit.tituloPublicacion;
      this.textoPublicacionEdit = this.publEdit.textoPublicacion;
      this.publPrivaEdit = this.publEdit.pubEsPrivada.toString();
    }
    */

    // formulario (Nota: Se han puesto variables en el caso de que el futuro sea asi)
    this.formulario = new FormGroup({
      tituloFCNCrearPubl: new FormControl(this.tituloPublicacionEdit, [Validators.maxLength(200)]),
      textoFCNCrearPubl: new FormControl(this.textoPublicacionEdit, [Validators.maxLength(500)]),
      publPrivadaFCNPubl: new FormControl(this.publPrivaEdit)
    });

    this.usuModifica = false;
    this.comprobarUsu();
  }

  /**
   * metodo para comprobar el usuario
   */
  private comprobarUsu() {
      // El que entra es para ver sus entradas? si = puede modificar, no = no puede modificar
      if (this.usuarioEntra.idUsu === this.usuarioVisitado.idUsu) {
        this.usuModifica = true;
      } else {
        this.usuModifica = false;
      }
  }

  /**
   * evento que selecciona si la publicacion a crear es privada o publica
   */
  public publicacionPrivada() {

    if (this.publPriva === 0) {
      this.publPriva = 1;
    } else {
      this.publPriva = 0;
    }
  }

  /**
   * evento on submmit de crear publicacion
   * @param formValue datos del formulario
   * @param event evento forormulario
   */
  onSubmmit(formValue: any, event) {

    const publicacion = new PublicacionModel();
    publicacion.usuarioPubl = this.usuarioEntra;
    publicacion.tituloPublicacion = formValue.tituloFCNCrearPubl;
    publicacion.textoPublicacion = formValue.textoFCNCrearPubl;
    publicacion.fechaCreacionPub = this.fecha.fechaHoraActual();
    publicacion.pubEsPrivada = this.publPriva;

    if (publicacion.tituloPublicacion === '') {
      // llamar a dialogo
      this.openDialogCrearPubl('Problema', 'No puedes dejar vacio el titulo de la publicacion');

    } else {
      // guardar
      this.publServ.postPublicacion(publicacion).subscribe(
        data => {
          console.log(data);

          // tslint:disable-next-line:no-string-literal
          this.respuesta = data['respuesta'];

          if (this.respuesta === 'Publicacion insertada') {
            this.openDialogCrearPubl('Publicación', 'Publicación insertada');
          }

          if (this.respuesta === 'Problemas, publicacion no insertada') {
            this.openDialogCrearPubl('Problema', 'Problemas al insertar la publicación');
          }

          if (this.respuesta === 'Publicacion vacia') {
            this.openDialogCrearPubl('Problema', 'No puedes dejar la publicación vacia');
          }

        });
    }

  }

  /**
   * Dialogo de crear publicacion
   * @param titulo titulo de crear publicacion
   * @param texto texto de crear publicacion
   */
  public openDialogCrearPubl(titulo: string, texto: string) {
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
