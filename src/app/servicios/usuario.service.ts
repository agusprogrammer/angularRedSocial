import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';  // Importamos el HttpClient
import { UsuarioModel } from '../modelos/UsuarioModel';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  // variables
  registroPostResulString: string;  // Devuelve el estado de la operacion post al registrar el usuario

  constructor(private http: HttpClient) { }

  // tipos de direcciones:
  // Api C# http://localhost:50139/api/UsuarioApi/
  // Api Java http://localhost:9191/usuarios

  // obtener usuario por id
  getUserId(userId: number): Observable<any> {
    // return this.http.get('http://localhost:50139/api/UsuarioApi/' + userId);
    return this.http.get('http://localhost:9191/usuarios/' + userId);

  }

  // obtener usuario por login
  getUserLogin(emailEntrada: string, password: string): Observable<any> {
    // return this.http.get('http://localhost:50139/api/UsuarioApi/' + emailEntrada + '/' + password);
    return this.http.get('http://localhost:9191/loginUsuario/' + emailEntrada + '/' + password);
  }

  // registrar usuario
  postUser(userPost: UsuarioModel) {

    // this.registroPostResulString = '';

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
    // return this.http.post('http://localhost:50139/api/UsuarioApi/', usu);
    return this.http.post('http://localhost:9191/addUsuario', usu);

  }

  // modificar usuario
  putUser(userPut: UsuarioModel) {

    const usu = new UsuarioModel();
    usu.idUsu = userPut.idUsu;
    usu.nombreUsu = userPut.nombreUsu;
    usu.fechaAlta = userPut.fechaAlta;
    usu.pais = userPut.pais;
    usu.ciudad = userPut.ciudad;
    usu.region = userPut.region;
    usu.email = userPut.email;
    usu.nombre = userPut.nombre;
    usu.apellidos = userPut.apellidos;
    usu.fechaNacimiento = userPut.fechaNacimiento;
    usu.telefono = userPut.telefono;
    usu.emailEntrada = userPut.emailEntrada;
    usu.contrasenya = userPut.contrasenya;
    usu.perfilPrivado = userPut.perfilPrivado;
    usu.aceptaPolPriv = userPut.aceptaPolPriv;
    usu.esAdministrador = userPut.esAdministrador;
    usu.usuarioActivo = userPut.usuarioActivo;
    usu.usuarioBaneado = userPut.usuarioBaneado;
    usu.fechaFinBaneo = userPut.fechaFinBaneo;
    usu.estado = userPut.estado;
    usu.numVisitas = userPut.numVisitas;
    usu.fechaUltLogin = userPut.fechaUltLogin;
    usu.fotoPerfil = userPut.fotoPerfil;
    usu.fotoPortada = userPut.fotoPortada;

    /* para C# (Nota: el subcribe mejor en el componente)
    this.http.put('http://localhost:50139/api/UsuarioApi/' + userPut.idUsu, data).subscribe(
      resp => {
        console.log(resp);
        return resp;
      }
    );
      */

    // Para java spring boot
    return this.http.put('http://localhost:9191/updateUsuario', usu);
  }

  // borrar usuario
  deleteUser(id: number) {

    /* para C# (Nota: el subcribe mejor en el componente)
    this.http.delete('http://localhost:50139/api/UsuarioApi/' + userId).subscribe(
      resp => {
        console.log(resp);
        return resp;
      }
    );
    */

    // Para java spring boot
    return this.http.delete('http://localhost:9191/' + id);

  }

}
