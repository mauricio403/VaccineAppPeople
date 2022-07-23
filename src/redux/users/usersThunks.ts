import { AppDispatch } from '../store';
import { setNewUser, setUsers, startLoadingData, startSaving, stopLoadingData, stopSaving } from './usersSlice';
import { authApi } from '../../api/authApi';
import { UsersResponse, Usuario, CreateUserResponse } from '../../interfaces/userInterface';


export const LoadUsers = () => {
    return async (dispatch: AppDispatch) => {
        dispatch(startLoadingData());
        try {
            const resp = await authApi.get<UsersResponse>('/usuarios');
            dispatch(setUsers(resp.data.usuarios));
            console.log(resp.data.usuarios);
            dispatch(stopLoadingData());
        } catch (error) {
            console.log(error);
            dispatch(stopLoadingData());
        }
    }
}

export const CreateUser = (nombre: string, apellido: string, cedula: number, correo: string, rol: string, password: string) => {
    return async (dispatch: AppDispatch) => {
        dispatch(startSaving());
        try {
            const resp = await authApi.post<CreateUserResponse>('/usuarios', { nombre, apellido, cedula, correo, rol, password });
            dispatch(setNewUser(resp.data.usuario));
            console.log(resp.data.usuario);
            dispatch(stopSaving());
        } catch (error) {
            console.log(error);
            dispatch(stopSaving());
        }
    }
}