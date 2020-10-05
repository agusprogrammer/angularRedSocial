import { Component, OnInit, Inject, Output, EventEmitter } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';
import { Observable, Subject } from 'rxjs';

@Component({
  selector: 'app-app-dialog-select',
  templateUrl: './app-dialog-select.component.html',
  styleUrls: ['./app-dialog-select.component.css']
})
export class AppDialogSelectComponent implements OnInit {

  // Nota: al crear un componente dialogo, ponerlo siempre en el entryComponents del modulo
  // Nota: para devolver valores con el mat dialog se usa mat-dialog-close="" en el componente que se quiera usar

  public titulo: string;  // titulo del dialogo
  public texto: string;   // texto del dialogo

  /**
   * constructor del dialogo de seleccion
   * @param data inyeccion de la cual se recoge los datos del dialogo
   */
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) { }

  /**
   * Inicio del componente del dialogo de seleccion
   */
  ngOnInit() {
    this.titulo = '';
    this.texto = '';
    this.ponerDatosDialog();
  }

  /**
   * Metodo para poner los datos al dialogo de seleccion
   */
  ponerDatosDialog() {

    // tslint:disable-next-line:no-string-literal
    this.titulo = this.data['tituloDialog'];
    // tslint:disable-next-line:no-string-literal
    this.texto = this.data['textoDialog'];
  }

}
