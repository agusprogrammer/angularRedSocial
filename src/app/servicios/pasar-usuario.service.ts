import { Injectable } from '@angular/core';
import { UsuarioModel } from '../modelos/UsuarioModel';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PasarUsuarioService {

  // este servicio permite la comunicacion usandolo mediante ruta
  // servicio creado para pasar objetos de usuario entre las partes de la aplicacion
  usu: UsuarioModel;
  private enviarUsuSubject = new Subject<UsuarioModel>();
  enviarUsuObservable = this.enviarUsuSubject.asObservable();

  constructor() { }

  enviarUsuario(usuEviar: UsuarioModel) {
    this.usu = usuEviar;
    this.enviarUsuSubject.next(usuEviar);
  }

  // recogemos el usuario del servicio
  recogerUsuarioServruta(): UsuarioModel {
    return this.usu;
  }

  enviarUsuarioServRuta(guardarUsu: UsuarioModel) {
    this.usu = guardarUsu;
  }

}
