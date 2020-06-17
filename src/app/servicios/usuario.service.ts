import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';  // Importamos el HttpClient
import { UsuarioModel } from '../modelos/UsuarioModel';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  // variables
  registroPostResulString: string;  // Devuelve el estado de la operacion post al registrar el usuario

  constructor(private http: HttpClient) { }

  // obtener usuario por id
  getUserId(userId: number) {
    // return
    this.http.get('http://localhost:50139/api/UsuarioApi/' + userId).subscribe(
      resp => {
        console.log(resp);
      }
    );
  }

  // obtener usuario por login
  // Se ha anyadido el Observable<any>
  getUserLogin(emailEntrada: string, password: string): Observable<any> {
    return this.http.get('http://localhost:50139/api/UsuarioApi/' + emailEntrada + '/' + password);

    /*
    this.http.get('http://localhost:50139/api/UsuarioApi/' + emailEntrada + '/' + password).subscribe(
      resp => {

        console.log(resp);
      }
    );
    */


  }

  // registrar usuario
  postUser(userPost: UsuarioModel) {

    // tslint:disable-next-line:ban-types
    // const respuesta: Object = new Object();
    this.registroPostResulString = '';

    const usu = new UsuarioModel();
    usu.idUsu = userPost.idUsu;
    usu.nombreUsu = userPost.nombreUsu;
    usu.fechaAlta = userPost.fechaAlta;
    usu.pais = userPost.pais;
    usu.ciudad = userPost.ciudad;
    usu.region = userPost.region;
    usu.email = userPost.email;
    usu.nombre = userPost.nombre;
    usu.apellidos = userPost.apellidos;
    usu.fechaNacimiento = userPost.fechaNacimiento;
    usu.telefono = userPost.telefono;
    usu.emailEntrada = userPost.emailEntrada;
    usu.contrasenya = userPost.contrasenya;
    usu.perfilPrivado = userPost.perfilPrivado;
    usu.aceptaPolPriv = userPost.aceptaPolPriv;
    usu.esAdministrador = userPost.esAdministrador;
    usu.usuarioActivo = userPost.usuarioActivo;
    usu.usuarioBaneado = userPost.usuarioBaneado;
    usu.fechaFinBaneo = userPost.fechaFinBaneo;
    usu.estado = userPost.estado;
    usu.numVisitas = userPost.numVisitas;
    usu.fechaUltLogin = userPost.fechaUltLogin;
    usu.fotoPerfil = userPost.fotoPerfil;
    usu.fotoPortada = userPost.fotoPortada;

    // obtener respuesta
    return this.http.post('http://localhost:50139/api/UsuarioApi/', usu);
    /*
    .subscribe(
      resp => {
        console.log(resp);
        // return resp;
        this.registroPostResulString = resp.toString();
      }
    );
    */

    // console.log(this.registroPostResulString);

    // return this.registroPostResulString;

  }

  // modificar usuario
  putUser(userPut: UsuarioModel) {

    const data = new UsuarioModel();
    data.idUsu = userPut.idUsu;
    data.nombreUsu = userPut.nombreUsu;
    data.fechaAlta = userPut.fechaAlta;
    data.pais = userPut.pais;
    data.ciudad = userPut.ciudad;
    data.region = userPut.region;
    data.email = userPut.email;
    data.nombre = userPut.nombre;
    data.apellidos = userPut.apellidos;
    data.fechaNacimiento = userPut.fechaNacimiento;
    data.telefono = userPut.telefono;
    data.emailEntrada = userPut.emailEntrada;
    data.contrasenya = userPut.contrasenya;
    data.perfilPrivado = userPut.perfilPrivado;
    data.aceptaPolPriv = userPut.aceptaPolPriv;
    data.esAdministrador = userPut.esAdministrador;
    data.usuarioActivo = userPut.usuarioActivo;
    data.usuarioBaneado = userPut.usuarioBaneado;
    data.fechaFinBaneo = userPut.fechaFinBaneo;
    data.estado = userPut.estado;
    data.numVisitas = userPut.numVisitas;
    data.fechaUltLogin = userPut.fechaUltLogin;
    data.fotoPerfil = userPut.fotoPerfil;
    data.fotoPortada = userPut.fotoPortada;

    this.http.put('http://localhost:50139/api/UsuarioApi/' + userPut.idUsu, data).subscribe(
      resp => {
        console.log(resp);
        return resp;
      }
    );
  }

  // borrar usuario
  deleteUser(userId: number) {

    this.http.delete('http://localhost:50139/api/UsuarioApi/' + userId).subscribe(
      resp => {
        console.log(resp);
        return resp;
      }
    );
  }

}
