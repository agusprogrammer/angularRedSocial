import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ComentarioModel } from '../modelos/ComentarioModel';

@Injectable({
  providedIn: 'root'
})
export class ComentarioService {

  constructor(private http: HttpClient) { }

  // obtener comentario por id
  getComentarioId(idComment: number): Observable<any> {
    return this.http.get('http://localhost:9191/comentarios/' + idComment);
  }

  // obtener comentarios
  getComentarios(): Observable<any> {
    return this.http.get('http://localhost:9191/comentarios');
  }

  // guardar comentario
  postComentario(postComment: ComentarioModel) {
    const com = new ComentarioModel();
    com.idComentario = postComment.idComentario;
    com.fechaCreacionCom = postComment.fechaCreacionCom;
    com.publComent = postComment.publComent;
    com.textoComentario = postComment.textoComentario;
    com.usuarioComent = postComment.usuarioComent;

    return this.http.post('http://localhost:9191/addComentario', com);
  }

  // actualizar comentario
  putComentario(putComment: ComentarioModel) {
    const com = new ComentarioModel();
    com.idComentario = putComment.idComentario;
    com.fechaCreacionCom = putComment.fechaCreacionCom;
    com.publComent = putComment.publComent;
    com.textoComentario = putComment.textoComentario;
    com.usuarioComent = putComment.usuarioComent;

    return this.http.post('http://localhost:9191/updateComentario', com);
  }

  // borrar comentario
  deleteComentario(id: number) {
    return this.http.delete('http://localhost:9191/deleteComentario/' + id);
  }

  // metodos propios -------------------------------------

  // obtener comentarios de una publicacion
  getComentariosPublicacion(idPublicacion: number): Observable<any> {
    return this.http.get('http://localhost:9191/getComentariosPublicacion/' + idPublicacion);
  }

}
