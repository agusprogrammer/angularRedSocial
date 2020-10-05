import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DialogServService {

  /* borrar este servicio sino se utiliza */

  // servicio para pasar los strings del dialogo
  tituloDialog: string;
  textoDialog: string;

  constructor() { }

  ponerDatosDialog(titDiag: string, textDiag: string) {
    this.tituloDialog = titDiag;
    this.textoDialog = textDiag;
  }

  obtenerTituloDialog(): string {
    return this.tituloDialog;
  }

  obtenerTextoDialog(): string {
    return this.textoDialog;
  }

}
