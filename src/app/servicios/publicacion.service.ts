import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PublicacionModel } from '../modelos/PublicacionModel';

@Injectable({
  providedIn: 'root'
})
export class PublicacionService {

  private publString: string;

  constructor(private http: HttpClient) { }

  // Obtener publicaciones por id
  getPublicacionesId(idPubl: number): Observable<any> {
    return this.http.get('http://localhost:9191/publicacionId/' + idPubl);
  }

  // obtener publicaciones
  getPublicaciones(): Observable<any> {
    return this.http.get('http://localhost:9191/publicaciones');
  }

  // guardar publicacion
  postPublicacion(publPost: PublicacionModel) {
    const publ = new PublicacionModel();
    publ.idPublicacion = publPost.idPublicacion;
    publ.fechaCreacionPub = publPost.fechaCreacionPub;
    publ.pubEsPrivada = publPost.pubEsPrivada;
    publ.textoPublicacion = publPost.textoPublicacion;
    publ.tituloPublicacion = publPost.tituloPublicacion;
    publ.usuarioPubl = publPost.usuarioPubl;

    return this.http.post('http://localhost:9191/addPublicacion', publ);
  }

  // actualizar publicacion
  putPublicacion(publPut: PublicacionModel) {
    const publ = new PublicacionModel();
    publ.idPublicacion = publPut.idPublicacion;
    publ.fechaCreacionPub = publPut.fechaCreacionPub;
    publ.pubEsPrivada = publPut.pubEsPrivada;
    publ.textoPublicacion = publPut.textoPublicacion;
    publ.tituloPublicacion = publPut.tituloPublicacion;
    publ.usuarioPubl = publPut.usuarioPubl;

    return this.http.put('http://localhost:9191/updatePublicacion', publ);
  }

  // borrar publicacion
  deletePublicacion(id: number) {
    return this.http.delete('http://localhost:9191/deletePublicacion/' + id);
  }

  // metodos propios --------------------------

  getPubliInicioUsuario(idUsu: number): Observable<any> {
    return this.http.get('http://localhost:9191/getPubliInicioUsuario/' + idUsu);
  }

  getPublicacionesUsuario(idUsu: number): Observable<any> {
    return this.http.get('http://localhost:9191/getPublicacionesUsuario/' + idUsu);
  }

  getPubliPubl(): Observable<any> {
    return this.http.get('http://localhost:9191/getPubliPubl');
  }

  // permite hacer un get con distintas urls
  getVariasUrlPubl(urlGet: string, idUsu: number): Observable<any> {

    this.publString = '';

    // tslint:disable-next-line:triple-equals
    // if (idUsu == 0 || idUsu === undefined || idUsu === null) {
    if (urlGet === 'http://localhost:9191/getPubliPubl') {
      this.publString = urlGet;

    } else {
      this.publString = urlGet + '/' + idUsu;
      // return this.http.get(urlGet + '/' + idUsu);
    }

    return this.http.get(this.publString);

  }
}
