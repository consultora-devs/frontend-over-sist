export interface TableData {
    empresa: string;
    ruc: string;
    fServicio: string;
    certificadora: string;
    tipo: string;
    producto: string;
    placa: string;
    fFacturacion: string;
    area: string;
    nFacturacion: string;
    diasTransc: number;
    sinIGV: number;
    conIGV: number;
    igvPagar: number;
    detraccion: number;
    sefacturo: boolean;
    yaPago: boolean;
    pagoDetraccion: boolean;
    enDolares: boolean;
    socio: string;
    [key: string]: string | number | boolean;  // Firma de índice para propiedades dinámicas
  }