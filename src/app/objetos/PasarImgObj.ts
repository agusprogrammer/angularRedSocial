import { FotosModel } from '../modelos/FotosModel';

export class PasarImgObj {
    // Clase que sirve para pasar imagenes desde el componente de subida de imagenes
    imagenFile: File;
    imagenBlob: Blob;
    imagenHtml: ArrayBuffer | string;
    objetoFoto: FotosModel;
    imagenCompleta: any; // imagen completa para mostrar
}
