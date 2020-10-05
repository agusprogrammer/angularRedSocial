import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { EntradasModel } from '../modelos/EntradasModel';

@Injectable({
  providedIn: 'root'
})
export class EntradaServService {

  constructor(private http: HttpClient) { }

  getEntradasById(id: number): Observable<any> {
    return this.http.get('http://localhost:9191/entradas/' + id);
  }

  getAllEntradas(): Observable<any> {
    return this.http.get('http://localhost:9191/entradas');
  }

  postEntrada(postEntrada: EntradasModel) {
    const ent = new EntradasModel();
    ent.idEntrada = postEntrada.idEntrada;
    ent.tituloEntrada = postEntrada.tituloEntrada;
    ent.textoEntrada = postEntrada.textoEntrada;
    ent.fechaCreacionEnt = postEntrada.fechaCreacionEnt;
    ent.usuarioEntradas = postEntrada.usuarioEntradas;

    return this.http.post('http://localhost:9191/addEntrada', ent);
  }

  // Update entrada
  putEntrada(putEntrada: EntradasModel) {

    const ent = new EntradasModel();
    ent.idEntrada = putEntrada.idEntrada;
    ent.tituloEntrada = putEntrada.tituloEntrada;
    ent.textoEntrada = putEntrada.textoEntrada;
    ent.fechaCreacionEnt = putEntrada.fechaCreacionEnt;
    ent.usuarioEntradas = putEntrada.usuarioEntradas;

    return this.http.put('http://localhost:9191/updateEntrada', ent);
  }

  // borrar entrada
  deleteEntrada(id: number) {

    // return this.http.delete('http://localhost:9191/deleteEntrada/' + id);

    const url = 'http://localhost:9191/deleteEntrada/' + id;
    // let httpParams = new HttpParams().set('id', id);

    return this.http.delete(url);
  }


  // Metodos propios --------------------------------------------------
  getEntradasUsuario(id: number): Observable<any> {
    return this.http.get('http://localhost:9191/getEntradasUsu/' + id);
  }

}
