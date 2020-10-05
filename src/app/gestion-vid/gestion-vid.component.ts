import { Component, OnInit, Input } from '@angular/core';
import { UsuarioModel } from '../modelos/UsuarioModel';
import { VideosService } from '../servicios/videos.service';
import { MatDialog, throwMatDialogContentAlreadyAttachedError } from '@angular/material';
import { PasarVidObj } from '../objetos/PasarVidObj';

@Component({
  selector: 'app-gestion-vid',
  templateUrl: './gestion-vid.component.html',
  styleUrls: ['./gestion-vid.component.css']
})
export class GestionVidComponent implements OnInit {

  // Input / output ----------
  @Input()
  public usuarioLogged: UsuarioModel; // Usuario que se ha logueado

  @Input()
  public usuarioVisitaVids: UsuarioModel; // Usuario al cual le visitamos los videos

  // variables ------------------

  public usuLogAdmin: boolean; // Comprobacion de usuario administrador (si es administrador, puede quitar videos)
  public usuAccedeSusVid: boolean; // comprobacion de que el usuario propio accede a sus videos
  public actGestionVid: boolean; // Activamos o desactivamos la gestion de los videos

  private idUsuVisitarVid: number; // id de usuario para obtener los videos que se visitan

  public noVideosEnLista: boolean; // Para mostrar la imagen en caso de que no haya videos en la lista
  public listVidsAny: any[] = [];  // lista de videos que recogemos del servicio
  private objAnyVid: any; // Objeto obtenido de la lista de listVidsAny: any[] para guardarlo en un objeto objVid: PasarVidObj;
  public listObjPasarVid: PasarVidObj[] = []; // Lista para mostrar los videos en caso de que hayan videos de este usuario
  private objPasarVid: PasarVidObj; // Objeto de video obtenido cuando recorremos el array listVidsAny: any[]
                               // y pasarlo a la lista PasarVidObj[]

  constructor(public dialog: MatDialog, private videoServ: VideosService) { }

  ngOnInit() {

    this.usuLogAdmin = false;
    this.usuAccedeSusVid = false;
    this.actGestionVid = false;

    this.noVideosEnLista = true;
    this.objPasarVid = new PasarVidObj();

    this.comprobarUsu();
    this.recogerListaVids();
  }

  // comprobamos si es administrador
  comprobarUsu() {

    // si es true, puede cambiar cosas de otros usuarios
    if (this.usuarioLogged.esAdministrador > 0) {
      this.usuLogAdmin = true;

    } else {
      this.usuLogAdmin = false;

    }

    // si el usuario que accede al componente de las fotos es el mismo usuario
    // puede cambiar cosas
    if (this.usuarioLogged.idUsu === this.usuarioVisitaVids.idUsu) {
      this.usuAccedeSusVid = true;

      // obtener el id para mostrar las fotos del propio usuario
      this.idUsuVisitarVid = this.usuarioLogged.idUsu;

    } else {
      // obtener el id para mostrar las fotos del usuario al que vamos a visitar sus fotos
      this.idUsuVisitarVid = this.usuarioVisitaVids.idUsu;
    }


  }

  // activar o descativar la gestion de videos
  gestionarVids(event) {

    if (this.actGestionVid === false) {
      this.actGestionVid = true;

    } else {
      this.actGestionVid = false;
    }

    console.log(this.actGestionVid);
  }

  // recoger la lista de videos para mostrarla
  recogerListaVids() {

    this.videoServ.getArchivosVideoUsuario(this.idUsuVisitarVid).subscribe(
      data => {
        this.listVidsAny = data;

        console.log(this.listVidsAny);

        if (this.listVidsAny.length === 0) {
          this.noVideosEnLista = true;

        } else {
          this.noVideosEnLista = false;

          for (this.objAnyVid of this.listVidsAny) {

            // creamos el objeto para ponerlo en la lista (hay que hacer un new, porque si no, no va)
            this.objPasarVid = new PasarVidObj();

            // tslint:disable-next-line:no-string-literal
            this.objPasarVid.objVideo = this.objAnyVid['obj'];

            // tslint:disable-next-line:no-string-literal
            this.objPasarVid.fichero = this.objAnyVid['fichero'];

            // tslint:disable-next-line:no-string-literal
            this.objPasarVid.videoCompleto = this.objAnyVid['ficheroCompletoString'];

            // tslint:disable-next-line:no-string-literal
            this.objPasarVid.tipoArchString = this.objPasarVid['tipoArch'];

            // tslint:disable-next-line:no-string-literal
            this.objPasarVid.rutaVideo = this.objPasarVid['rutaArch'];

            this.listObjPasarVid.push(this.objPasarVid);

          }

        }
      }
    );

  }

  // descargar video (usar un metodo del servicio especifico para este archivo)
  descargarVideo(objPasarVidDownload: PasarVidObj, event) {
    // const blob = new Blob([objPasarVidDownload.fichero], { type: objPasarVidDownload.tipoArchString });
    /*
    const blob = new Blob([objPasarVidDownload.videoCompleto], { type: objPasarVidDownload.tipoArchString });
    const url = window.URL.createObjectURL(blob);
    window.open(url);
    */

    this.videoServ.getArchVidUsuario(objPasarVidDownload.objVideo.idVideo,
      objPasarVidDownload.objVideo.usuarioVideos.idUsu,
      objPasarVidDownload.objVideo.videoString).subscribe( data => {
        console.log(data);
      }
    );

  }

  // evento para borrar videos
  borrarVid(idVideo: number, event) {
    console.log(idVideo);
  }



}
