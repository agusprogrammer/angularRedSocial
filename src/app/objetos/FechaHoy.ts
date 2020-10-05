export class FechaHoy {
    // objeto que sirve para poner la fecha actual

    private fechaAnyo: number;
    private fechaDia: number;
    private fechaMes: number;
    private fechaHora: number;
    private fechaMin: number;
    private fechaSec: number;
    private fechaCompleta: Date;

    // para obtener solo la fecha
    public fechaActual(): Date {

        this.fechaAnyo = Number(new Date().getFullYear().toString()); // anyo de hoy
        this.fechaDia = Number(new Date().getDate().toString());      // dia (Nota: day es num dia de semana)
        this.fechaMes = Number(new Date().getMonth().toString());     // mes

        return this.fechaCompleta = new Date(this.fechaAnyo, this.fechaMes, this.fechaDia);

    }

    // para obtener fecha y hora
    public fechaHoraActual(): Date {

        this.fechaAnyo = Number(new Date().getFullYear().toString()); // anyo de hoy
        this.fechaDia = Number(new Date().getDate().toString());      // dia (Nota: day es num dia de semana)
        this.fechaMes = Number(new Date().getMonth().toString());     // mes

        this.fechaHora = Number(new Date().getHours().toString());
        this.fechaMin = Number(new Date().getMinutes().toString());
        this.fechaSec = Number(new Date().getSeconds().toString());

        return this.fechaCompleta = new Date(this.fechaAnyo, this.fechaMes, this.fechaDia, this.fechaHora, this.fechaMin, this.fechaSec);

    }
}


