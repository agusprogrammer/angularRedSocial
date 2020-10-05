
export class UsuarioModel {
    idUsu: number;
    nombreUsu: string;  // nombre de usuario
    fechaAlta: Date;    // dateTime
    pais: string;
    ciudad: string;
    region: string;
    email: string;
    nombre: string;
    apellidos: string;
    fechaNacimiento: Date;  // Date
    telefono: string;       // +74 (60) 897456
    emailEntrada: string;   // email para entrar
    contrasenya: string;    // contrasenya para entrar
    perfilPrivado: number;    // opciones bool (tinyint) 0 o 1
    aceptaPolPriv: number;  // Acepta la politica de privacidad
    esAdministrador: number;
    usuarioActivo: number;
    usuarioBaneado: number; // castigo para el usuario
    fechaFinBaneo: Date; // castigo para el usuario
    estado: string;        // Cosas de la cuenta
    numVisitas: number;
    fechaUltLogin: Date;   // dateTime

    // fotoPerfil: Blob;
    fotoPerfil: string;     // foto perfil
    // fotoPerfilFile: File;

    // fotoPortada: Blob;
    fotoPortada: string;    // foto portada
    // fotoPortadaFile: File;

    // fotoPerfil: Blob;    // ver si eso mas adelante el file upload y la imagenes
    // fotoPortada: Blob;
}

// Nota: como no hay dateTime en angular se usa Date
// pero se le puede poner las horas

