
export interface LoginResponse {
    usuario: Usuario;
    token:   string;
}

export interface Usuario {
    telefono?: number;
    estadoVacunas?:     string;
    tipoDeVacuna?:      string;
    fechaDeVacunacion?: string;
    numeroDosis?:       number;
    rol:               string;
    estado:            boolean;
    google:            boolean;
    nombre:            string;
    apellido:          string;
    cedula:            number;
    correo:            string;
    uid:               string;
}
