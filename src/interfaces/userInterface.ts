// Generated by https://quicktype.io

export interface UsersResponse {
    total:    number;
    usuarios: Usuario[];
}

export interface Usuario {
    estadoVacunas: string;
    rol:           string;
    estado:        boolean;
    google:        boolean;
    nombre:        string;
    apellido:      string;
    cedula:        number;
    correo:        string;
    uid:           string;
}

// Generated by https://quicktype.io

export interface CreateUserResponse {
    usuario: Usuario;
    token:   string;
}

export interface Usuario {
    estadoVacunas: string;
    rol:           string;
    estado:        boolean;
    google:        boolean;
    nombre:        string;
    apellido:      string;
    cedula:        number;
    correo:        string;
    uid:           string;
}



// Generated by https://quicktype.io

export interface DeleteUserResponse {
    estadoVacunas: string;
    rol:           string;
    estado:        boolean;
    google:        boolean;
    nombre:        string;
    apellido:      string;
    cedula:        number;
    correo:        string;
    uid:           string;
}
// Generated by https://quicktype.io

export interface UpdateUserResponse {
    estadoVacunas: string;
    rol:           string;
    estado:        boolean;
    google:        boolean;
    nombre:        string;
    apellido:      string;
    cedula:        number;
    correo:        string;
    uid:           string;
}
