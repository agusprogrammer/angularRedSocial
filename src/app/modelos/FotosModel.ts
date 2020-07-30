import { UsuarioModel } from './UsuarioModel';

export class FotosModel {
    idFoto: number;
    usuarioFotos: UsuarioModel;
    fotoString: string;
    fechaSubidaFoto: Date; // Date time
    fotoBlob: Blob;
}
