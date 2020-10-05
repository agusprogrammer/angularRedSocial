import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { VideosModel } from '../modelos/VideosModel';
import { FechaHoy } from '../objetos/FechaHoy';

@Injectable({
  providedIn: 'root'
})
export class VideosService {

  constructor(private http: HttpClient) { }

  // obtener fotos por id
  getVideoId(idVideo: number): Observable<any> {
    return this.http.get('http://localhost:9191/videos/' + idVideo);
  }

  // obtener fotos
  getVideos(): Observable<any> {
    return this.http.get('http://localhost:9191/videos');
  }

  // guardar video
  postVideo(videoPost: VideosModel) {
    const vid = new VideosModel();
    vid.idVideo = videoPost.idVideo;
    vid.fechaSubidaVid = videoPost.fechaSubidaVid;
    vid.usuarioVideos = videoPost.usuarioVideos;
    vid.videoBlob = videoPost.videoBlob;
    vid.videoString = videoPost.videoString;

    return this.http.post('http://localhost:9191/addVideo', vid);
  }

  // actualizar video
  putVideo(videoPut: VideosModel) {
    const vid = new VideosModel();
    vid.idVideo = videoPut.idVideo;
    vid.fechaSubidaVid = videoPut.fechaSubidaVid;
    vid.usuarioVideos = videoPut.usuarioVideos;
    vid.videoBlob = videoPut.videoBlob;
    vid.videoString = videoPut.videoString;

    return this.http.put('http://localhost:9191/updateVideos', vid);
  }

  // borrar video
  deleteVideo(id: number) {
    return this.http.delete('http://localhost:9191/deleteVideo/' + id);
  }

  // metodos para los archivos -----------------------------------


  postAddArchivoVid(idUsuVid: number, fichVid: File): Observable <any> {

    const endpoint = 'http://localhost:9191/addArchivoVid/' + idUsuVid;
    const formData: FormData = new FormData();
    formData.append('file', fichVid);

    return this.http.post(endpoint, formData);
  }

  getArchivosVideoUsuario(idUsu: number): Observable<any> {
    return this.http.get('http://localhost:9191/getArchivosVideoUsuario/' + idUsu);
  }

  getArchVidUsuario(idVideo: number, idUsu: number, vidString: string) {
    return this.http.get('http://localhost:9191/getArchVidUsuario/' + idVideo + '/' + idUsu + '/' + vidString);
  }

  deleteArchivosVid(idVid: number): Observable<any> {
    return this.http.delete('http://localhost:9191/deleteArchivosVid/' + idVid);
  }

  // metodos propios ---------------------------------------------

  getVideosUsuario(idVid: number): Observable<any> {
    return this.http.get('http://localhost:9191/getVideosUsuario/' + idVid);
  }
}
