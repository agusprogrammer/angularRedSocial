import { UsuarioModel } from './UsuarioModel';

export class VideosModel {
    idVideo: number;
    usuarioVideos: UsuarioModel;
    videoString: string;
    fechaSubidaVid: Date; // Datetime
    videoBlob: Blob;
}
