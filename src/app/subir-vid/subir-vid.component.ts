import { Component, OnInit, Output, EventEmitter, Input} from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import {MatDialogModule, MatDialog} from '@angular/material/dialog';
import { AppDialogComponent } from '../app-dialog/app-dialog.component';
import { UsuarioModel } from '../modelos/UsuarioModel';
import { VideosService } from '../servicios/videos.service';

@Component({
  selector: 'app-subir-vid',
  templateUrl: './subir-vid.component.html',
  styleUrls: ['./subir-vid.component.css']
})
export class SubirVidComponent implements OnInit {

  formularioVids: FormGroup;
  public videoFich: File;  // fichero de video que importamos

  @Input()
  public usuarioLoggedSubVid: UsuarioModel; // usuario que sube el video
  private idUsuVid: number;

  @Output() eventEmitirVid = new EventEmitter(); // Evento para la emision

  public datosVid: File;
  videoView: ArrayBuffer | string; // para mostrar la imagen en el html

  public videoCargado: boolean; // Indica si el video se ha cargado
  private respStringJavaSubir: string;

  constructor(public dialog: MatDialog, private videoServ: VideosService) { }

  ngOnInit() {
    this.videoFich = null;
    this.datosVid = null;

    this.videoCargado = false;
    this.respStringJavaSubir = '';

    this.formularioVids = new FormGroup({
      VideoFCN: new FormControl('')
    });
  }

  onUploadVideos(formValue: any, event) {
    // this.video = formValue.VideoFCN;

    if (event.target.files && event.target.files[0]) {
      this.videoFich = event.target.files[0] as File;

      console.log(this.videoFich);

      // videoView
      const reader = new FileReader();
      reader.onload = e => this.videoView = reader.result;

      this.videoCargado = true;

      this.idUsuVid = this.usuarioLoggedSubVid.idUsu;
      this.videoServ.postAddArchivoVid(this.idUsuVid, this.videoFich).subscribe(
        resp => {
          // tslint:disable-next-line:no-string-literal
          this.respStringJavaSubir = resp['respuesta'];
          console.log(this.respStringJavaSubir);
        }
      );
    }

    /*
    if (this.video != null) {
      // this.eventEmitirVid.emit({datosVid: this.video});
      this.eventEmitirVid.emit({datosVid: this.video});

      this.videoCargado = true;

    } else {
      // mostrar mensaje de video no subido
      this.openDialog();
    }
    */

  }

  openDialog() {
    const dialogRef = this.dialog.open(AppDialogComponent, {
      data: {
        tituloDialog: 'Problema',
        textoDialog: 'El video no se puede seleccionar o no se ha seleccionado archivo'
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

}


