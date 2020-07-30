import { UsuarioModel } from './UsuarioModel';

export class EntradasModel {
    idEntrada: number;
    usuarioEntradas: UsuarioModel;
    tituloEntrada: string;
    textoEntrada: string;
    fechaCreacionEnt: Date; // Datetime
}
