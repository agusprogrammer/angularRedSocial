import { UsuarioModel } from './UsuarioModel';
import { PublicacionModel } from './PublicacionModel';

export class ComentarioModel {
    idComentario: number;
    usuarioComent: UsuarioModel;
    publComent: PublicacionModel;
    textoComentario: string;
    fechaCreacionCom: Date;     // dateTime
}

