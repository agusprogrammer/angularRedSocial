import { Component, OnInit, Input } from '@angular/core';
import { UsuarioModel } from '../modelos/UsuarioModel';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {

  // recibir datos del inicio
  @Input()
  public usuarioPerfil: UsuarioModel;

  // Variables upload
  private imagenPerfil: File;
  private imagenPortada: File;

  private formularioImgsPerfil: FormGroup;  // formulario imagen perfil

  constructor() { }

  ngOnInit() {
    this.imagenPerfil = null;
    this.imagenPortada = null;

    // inicializar formulario (despues se puede poner en otro lado)
    this.formularioImgsPerfil = new FormGroup({
      fotoPerfilFCNperfil: new FormControl('')
    });
  }

  onUploadFotos(formValue: any, event) {
    this.imagenPerfil = formValue.fotoPerfilFCNperfil;
    this.imagenPortada = formValue.fotoPortadaFCNperfil;
  }

  /*
  onUploadFPerfil(formValue: any, event) {
    console.log('perfil', event.target.files[0]);
    this.imagenPerfil = event.target.files[0];
  }

  onUploadFPortada(event) {
    console.log('portada', event.target.files[0]);
    this.imagenPortada = event.target.files[0];
  }
  */


}
