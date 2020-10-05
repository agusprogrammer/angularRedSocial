import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FotosModel } from '../modelos/FotosModel';
import { FechaHoy } from '../objetos/FechaHoy';
import { UsuarioModel } from '../modelos/UsuarioModel';

@Injectable({
  providedIn: 'root'
})
export class FotosService {

  constructor(private http: HttpClient) { }

  // Nota: estos metodos solo actuan sobre los registros de la base de datos
  // obtener fotos por id
  getFotoId(idFoto: number): Observable<any> {
    return this.http.get('http://localhost:9191/fotos/' + idFoto);
  }

  // obtener fotos
  getFotos(): Observable<any> {
    return this.http.get('http://localhost:9191/fotos');
  }

  // guardar foto
  postFoto(fotoPost: FotosModel) {
    const fot = new FotosModel();
    fot.idFoto = fotoPost.idFoto;
    fot.fechaSubidaFoto = fotoPost.fechaSubidaFoto;
    fot.fotoBlob = fotoPost.fotoBlob;
    fot.fotoString = fotoPost.fotoString;
    fot.usuarioFotos = fotoPost.usuarioFotos;

    return this.http.post('http://localhost:9191/addFoto', fot);
  }

  // actualizar foto
  putFoto(fotoPut: FotosModel) {
    const fot = new FotosModel();
    fot.idFoto = fotoPut.idFoto;
    fot.fechaSubidaFoto = fotoPut.fechaSubidaFoto;
    fot.fotoBlob = fotoPut.fotoBlob;
    fot.fotoString = fotoPut.fotoString;
    fot.usuarioFotos = fotoPut.usuarioFotos;

    return this.http.put('http://localhost:9191/updateFoto', fot);
  }

  // borrar foto
  deleteFoto(id: number) {
    return this.http.delete('http://localhost:9191/deleteFoto/' + id);
  }

  // metodo para subir archivos fotos -------------------------------------

  // averiguar como pasarle el id de usuario tambien

  postSubirArchivoFoto(idUsuFot: number, fichFoto: File): Observable<any> {

    console.log(fichFoto.name);

    /*
    const fot = new FotosModel();
    fot.fechaSubidaFoto = fechaHoy.fechaHoraActual();
    fot.usuarioFotos = usuLog; // recibir de un input
    */

    const endpoint = 'http://localhost:9191/addArchivoFoto/' + idUsuFot;
    const formData: FormData = new FormData();
    formData.append('file', fichFoto); // fichFoto.name);
    // formData.append('fileKey', fichFoto, fichFoto.name);

    return this.http.post(endpoint, formData);

    // lo de antes
    // return this.http.post('http://localhost:9191/addArchivoFoto', fichFoto);

  }

  // obtener fotos y archivos foto de todos los usuarios
  getArchivosFotoAll(): Observable<any> {
    return this.http.get('http://localhost:9191/getArchivosFotoAll');
  }

  // obtener fotos y archivos foto de un usuario
  getArchivosFotoIdUsu(idUsu: number): Observable<any> {
    return this.http.get('http://localhost:9191/getArchivosFotoUsuario/' + idUsu);
  }

  // borrar fotos y archivos foto
  deleteArchivosFoto(idFoto: number) {
    return this.http.delete('http://localhost:9191/deleteArchivosFoto/' + idFoto);
  }

  // metodos propios --------------------------------------------------------------

  // solo registros, no archivos
  // obtener las fotos del usuario
  getFotosUsuario(idFoto: number): Observable<any> {
    return this.http.get('http://localhost:9191/getFotosUsuario/' + idFoto);
  }



}
