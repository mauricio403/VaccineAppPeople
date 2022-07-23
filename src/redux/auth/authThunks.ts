import { AppDispatch } from '../store';
import { authApi } from '../../api/authApi';
import { LoginResponse } from '../../interfaces/authInterfaces';
import { checkingCredentials, clearErrorMessage, onLogin, onLogout } from './authSlices';


export const startLogin = (correo: string, password: string) => {
    return async (dispatch: AppDispatch) => {

        dispatch(checkingCredentials());

        try {
            const resp = await authApi.post<LoginResponse>(`/auth/login`, { correo, password });

            localStorage.setItem('token', resp.data.token);
            localStorage.setItem('user', JSON.stringify(resp.data.usuario));
            localStorage.setItem('token-init-date', new Date().getTime().toString());

            dispatch(onLogin({
                user: resp.data.usuario,
                token: resp.data.token,
                status: 'authenticated'
            }));
            console.log(resp.data);

        } catch (error: any) {
            dispatch(onLogout(error.response.data?.msg || '--'));
            console.log(error.response.data?.msg);
            setTimeout(() => {
                dispatch(clearErrorMessage());
            }, 1000);

        }

    }
}

export const startCreateUser = (nombre: string, correo: string, password: string) => {
    return async (dispatch: AppDispatch) => {

        dispatch(checkingCredentials());

        try {

            const resp = await authApi.post<LoginResponse>(`/usuarios`, { nombre, correo, password });

            localStorage.setItem('token', resp.data.token);
            localStorage.setItem('user', JSON.stringify(resp.data.usuario));
            localStorage.setItem('token-init-date', new Date().getTime().toString());


            dispatch(onLogin({
                user: resp.data.usuario,
                token: resp.data.token,
                status: 'authenticated'
            }));
            console.log(resp.data);

        } catch (error: any) {
            dispatch(onLogout(error.response.data.errors[0].msg));
            setTimeout(() => {
                dispatch(clearErrorMessage());
            }, 1000);

        }
    }
}


export const checkAuthToken = () => {

    return async (dispatch: AppDispatch) => {

        dispatch(checkingCredentials());

        const token = localStorage.getItem('token');
        if (!token) {
            dispatch(onLogout(''));
            return;
        };

        try {
            const resp = await authApi.get<LoginResponse>(`/auth`, {
                headers: { 'x-token': token }
            })

            localStorage.setItem('token', resp.data.token);
            localStorage.setItem('token-init-date', new Date().getTime().toString());

            dispatch(onLogin({
                user: resp.data.usuario,
                token: resp.data.token,
                status: 'authenticated'
            }));
        } catch (error) {
            localStorage.clear();
            dispatch(onLogout(''));
            
        }
    }
}


export const startLogout = () => {
    return async (dispatch: AppDispatch) => {
        localStorage.clear();
        dispatch(onLogout(''));
    }
}