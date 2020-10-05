import { Component, OnInit, Inject} from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material';
import { DialogServService } from '../servicios-gen/dialog-serv.service';

// Nota: al crear un componente dialogo, ponerlo siempre en el entryComponents del modulo
@Component({
  selector: 'app-app-dialog',
  templateUrl: './app-dialog.component.html',
  styleUrls: ['./app-dialog.component.css']
})
export class AppDialogComponent implements OnInit {

  // Nota: al crear un componente dialogo, ponerlo siempre en el entryComponents del modulo
  // nota: para que funcionen los dialogos hay que poner en el modulo
  // este componente en el apartado entryComponents:[]

  public titulo: string;  // Titulo del dialogo
  public texto: string;   // Texto del dialogo

  /**
   * constructor del dialogo
   * @param data inyeccion de la cual se recoge los datos del dialogo
   */
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) { }

  /**
   * Inicio del componente del dialogo
   */
  ngOnInit() {
    this.titulo = '';
    this.texto = '';

    this.ponerDatosDialog();
  }

  /**
   * Metodo para poner los datos al dialogo
   */
  private ponerDatosDialog() {

    // tslint:disable-next-line:no-string-literal
    this.titulo = this.data['tituloDialog'];
    // tslint:disable-next-line:no-string-literal
    this.texto = this.data['textoDialog'];
  }



}
