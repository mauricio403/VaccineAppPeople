



export interface UsersResponse {
    total:    number;
    usuarios: Usuario[];
}

export interface Usuario {
    estadoVacunas:     string;
    tipoDeVacuna:      string;
    fechaDeVacunacion: string;
    numeroDosis:       number;
    rol:               string;
    estado:            boolean;
    google:            boolean;
    nombre:            string;
    apellido:          string;
    cedula:            number;
    correo:            string;
    uid:               string;
    direccion?:        string;
    fechaNacimiento?:  string;
    telefono?:         number;
}




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




export interface PatchUserResponse {
    msg:     string;
    usuario: Usuario;
}

export interface Usuario {
    estadoVacunas:     string;
    tipoDeVacuna:      string;
    fechaDeVacunacion: string;
    numeroDosis:       number;
    rol:               string;
    estado:            boolean;
    google:            boolean;
    nombre:            string;
    apellido:          string;
    cedula:            number;
    correo:            string;
    direccion?:         string;
    fechaNacimiento?:   string;
    telefono?:          number;
    uid:               string;
}



export interface UserByIDResponse {
    estadoVacunas:     string;
    tipoDeVacuna:      string;
    fechaDeVacunacion: string;
    numeroDosis:       number;
    rol:               string;
    estado:            boolean;
    google:            boolean;
    nombre:            string;
    apellido:          string;
    cedula:            number;
    correo:            string;
    uid:               string;
}
