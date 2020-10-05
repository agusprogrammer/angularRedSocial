import { UsuarioModel } from './UsuarioModel';

export class PublicacionModel {
    idPublicacion: number;
    usuarioPubl: UsuarioModel;
    tituloPublicacion: string;
    textoPublicacion: string;
    fechaCreacionPub: Date;
    pubEsPrivada: number; // Boolean number
}
