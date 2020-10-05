import { AmigosUsuIdModel } from './AmigosUsuIdModel';
import { UsuarioModel } from './UsuarioModel';

export class AmigosUsuModel {
    idUsuAm: AmigosUsuIdModel;
    usuAmIdSolicitante: UsuarioModel;
    usuAmIdReceptor: UsuarioModel;
    fechaEnviada: Date; // fecha que se envio la peticion
    solicitudAceptada: number;
    // si es true son amigos, si es false, pendiente, si se elimina es que se rechazo
}
