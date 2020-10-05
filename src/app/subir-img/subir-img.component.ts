import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material';
import { AppDialogComponent } from '../app-dialog/app-dialog.component';
import { DialogServService } from '../servicios-gen/dialog-serv.service';
import { DomSanitizer } from '@angular/platform-browser';
import { PasarImgObj } from '../objetos/PasarImgObj';
import { FotosService } from '../servicios/fotos.service';
import { FotosModel } from '../modelos/FotosModel';
import { UsuarioModel } from '../modelos/UsuarioModel';

/**
 * interfaz para el input de archivos
 */
interface HtmlInputEvent extends Event {
  target: HTMLInputElement & EventTarget;
}

@Component({
  selector: 'app-subir-img',
  templateUrl: './subir-img.component.html',
  styleUrls: ['./subir-img.component.css']
})
export class SubirImgComponent implements OnInit {
  ficheroSeleccionado = null;

  formularioImgs: FormGroup;  // formulario subir imagen (Nota: la imagen no se extrae del FCN)
  imagenFile: File; // Fichero de imagen que importamos
  // imgBlob: Blob;
  imgView: ArrayBuffer | string; // para mostrar la imagen en el html
  objFoto: FotosModel;

  private respStringJavaSubir: string; // respuesta de cuando se sube

  @Input()
  public usuarioLoggedSubImg: UsuarioModel; // usuario logueado para subir las fotos

  @Output() eventEmitirImg = new EventEmitter(); // Evento para la emision
  public pasarImg: PasarImgObj; // objeto para recoger los datos de emision
  public datosImg: PasarImgObj; // objeto para enviar la emision


  // public dialogoImg: AppDialogComponent;
  /**
   * Constructor de subir img
   * @param dialog dialogo de fotos
   * @param fotoServ servicio de fotos
   */
  constructor(public dialog: MatDialog, private fotoServ: FotosService) { }

  /**
   * Inicio para subir-img
   */
  ngOnInit() {

    // this.dialogoImg = new AppDialogComponent();

    this.imagenFile = null;
    this.datosImg = null;

    this.objFoto = new FotosModel();

    this.pasarImg = new PasarImgObj();
    this.datosImg = new PasarImgObj();

    this.respStringJavaSubir = '';

    // inicializar formulario (despues se puede poner en otro lado)
    this.formularioImgs = new FormGroup({
      fotoFCN: new FormControl('')
    });

  }

  /**
   * evento para subir y emitir la imagen
   * @param formValue datos que vienen del formulario de subir imagenes
   * @param event evento
   */
  public onUploadFotos(formValue: any, event: HtmlInputEvent) {

    if (event.target.files && event.target.files[0]) {
      this.imagenFile = event.target.files[0] as File;
      // this.pasarImg.imagenBlob = event.target.files[0] as Blob;
      // this.pasarImg.imagenBlob = new Blob([event.target.files[0] as Blob], {type: 'application/octet-binary'});

      // leer archivo, poner en el html
      const reader = new FileReader();
      reader.onload = e => this.imgView = reader.result;
      reader.readAsDataURL(this.imagenFile);

      // guardar en objeto para pasar la imagen en varios formatos
      this.pasarImg.imagenFile = this.imagenFile;
      // this.pasarImg.imagenBlob = this.imagenFile as Blob;
      // this.pasarImg.imagenBlob = event.target.files[0].__proto__.__proto__ as Blob;

      // console.log(event);
      // console.log(this.imagenFile);
      // console.log(this.pasarImg.imagenBlob);

      // this.pasarImg.imagenBlob = this.imagenFile.slice(); // nota: evitar los blob en java
      this.pasarImg.imagenHtml = this.imgView;

      // emitir el objeto imagen (se puede recoger si queremos)
      this.eventEmitirImg.emit({datosImg: this.pasarImg});

      this.fotoServ.postSubirArchivoFoto(this.usuarioLoggedSubImg.idUsu, this.imagenFile).subscribe(
        resp => {
          // tslint:disable-next-line:no-string-literal
          this.respStringJavaSubir = resp['respuesta'];
          console.log(this.respStringJavaSubir);
        }
      );


    } else {
      this.openDialog();
    }

    this.imagenFile = null;

  }

  /**
   * dialogo de los problemas al subir la imagen
   */
  public openDialog() {

    // this.dialogData.ponerDatosDialog('Problema', 'No se ha podido subir la imagen');

    // const dialogRef = this.dialog.open(this.dialogoImg);
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



