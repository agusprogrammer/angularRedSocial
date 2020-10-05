import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AmigosUsuModel } from '../modelos/AmigosUsuModel';

@Injectable({
  providedIn: 'root'
})
export class AmigosUsuService {

  constructor(private http: HttpClient) { }

  // obtener amigos usuario por ids de cada usuario
  getAmigosUsuIds(usuIdSol: number, usuIdRecept: number): Observable<any> {
    return this.http.get('http://localhost:9191/getAmigosUsuPorIds/' + usuIdSol + '/' + usuIdRecept);
  }

  // obtener amigos usu
  getAmigosUsu(): Observable<any> {
    return this.http.get('http://localhost:9191/amigosUsu');
  }

  // guardar amigos de usuario
  postAmigoUsu(amUsuPost: AmigosUsuModel) {
    const amUsu = new AmigosUsuModel();
    amUsu.idUsuAm = amUsuPost.idUsuAm;
    amUsu.fechaEnviada = amUsuPost.fechaEnviada;
    amUsu.solicitudAceptada = amUsuPost.solicitudAceptada;
    amUsu.usuAmIdReceptor = amUsuPost.usuAmIdReceptor;
    amUsu.usuAmIdSolicitante = amUsuPost.usuAmIdSolicitante;

    return this.http.post('http://localhost:9191/addAmigosUsu', amUsu);
  }

  // Actualizar amigos ususario
  putAmigoUsu(amUsuPut: AmigosUsuModel) {
    const amUsu = new AmigosUsuModel();
    amUsu.idUsuAm = amUsuPut.idUsuAm;
    amUsu.fechaEnviada = amUsuPut.fechaEnviada;
    amUsu.solicitudAceptada = amUsuPut.solicitudAceptada;
    amUsu.usuAmIdReceptor = amUsuPut.usuAmIdReceptor;
    amUsu.usuAmIdSolicitante = amUsuPut.usuAmIdSolicitante;

    return this.http.put('http://localhost:9191/updateAmigoUsuario', amUsu);
  }

  // borrar amigos usuario
  deleteAmigoUsu(idSol: number, idRecp: number) {
    return this.http.delete('http://localhost:9191/deleteAmigoUsuario/' + idSol + '/' + idRecp);
  }

  // metodos propios -----------------------------------
  // amigos de un usuario
  getAmigosUsuario(idUsu: number): Observable<any> {
    return this.http.get('http://localhost:9191/getAmigosUsu/' + idUsu);
  }

  // peticiones de amistad
  // peticiones generales del usuario (tanto recibidas como enviadas)
  getPeticionesGenerales(idUsu: number): Observable<any>  {
    return this.http.get('http://localhost:9191/getPeticionesGenUsu/' + idUsu);
  }

  // peticiones realizadas por el usuario
  getPeticionesRealizadas(idUsu: number): Observable<any>  {
    return this.http.get('http://localhost:9191/getPeticionesRealizadasUsuario/' + idUsu);
  }

  // peticiones recibidas por el usuario
  getPeticionesRecibidas(idUsu: number): Observable<any>  {
    return this.http.get('http://localhost:9191/getPeticionesRecibidasUsuario/' + idUsu);
  }

  // get amigos usu por ids
  /*
  getAmigosUsuIds(idSol: number, usuIdRecept: number): Observable<any> {
    return this.http.get('http://localhost:9191/getNoAmigosUsuIds/' + idSol + '/' + usuIdRecept);
  }
  */

  // metodo general get ---------------------------------------------------------
  getAmigosUsuVariasUrl(url: string): Observable<any> {
    return this.http.get(url);
  }




}
