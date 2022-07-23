import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Usuario } from '../../interfaces/authInterfaces';

export interface authState {
    status: 'checking' | 'authenticated' | 'no-authenticated';
    user: Usuario;
    token: string;
    msg?: string;
}

const initialState: authState = {
    status: 'checking',
    user: {
        rol: '',
        estado: false,
        google: false,
        nombre: '',
        correo: '',
        uid: '',
        cedula: 0,
        apellido: '',
        estadoVacunas: '',
    },
    token: '',
    msg: '',
}

export const authSilce = createSlice({
    name: 'auth',
    initialState: initialState,
    reducers: {
        checkingCredentials: (state) => {
            state.status = 'checking';
            state.msg='';
        },
        onLogin: (state, action: PayloadAction<authState>) => {
            state.status = action.payload.status;
            state.user = action.payload.user;
            state.token = action.payload.token;
            state.msg='';
        },
        onLogout: (state, action: PayloadAction<string > ) => {
            state.status = 'no-authenticated';
            state.user = {
                rol: '',
                estado: false,
                google: false,
                nombre: '',
                correo: '',
                uid: '',
                cedula: 0,
                apellido: '',
                estadoVacunas: '',

            };
            state.token = '';
            state.msg = action.payload ;
        },
        clearErrorMessage: (state) => {
            state.msg = '';
        }
    },
})

// Action creators are generated for each case reducer function
export const { checkingCredentials, onLogin, onLogout, clearErrorMessage } = authSilce.actions
