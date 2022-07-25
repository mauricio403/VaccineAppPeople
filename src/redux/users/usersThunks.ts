import { AppDispatch } from '../store';
import { deleteUser, setMessage, setNewUser, setPacthUser, setUpdateUser, setUsers, startDeleteing, startLoadingData, startSaving, stopDeleteing, stopLoadingData, stopSaving } from './usersSlice';
import { authApi } from '../../api/authApi';
import { UsersResponse, Usuario, CreateUserResponse, DeleteUserResponse, UpdateUserResponse, PatchUserResponse } from '../../interfaces/userInterface';
import { clearErrorMessage } from '../auth/authSlices';


export const LoadUsers = () => {
    return async (dispatch: AppDispatch) => {
        dispatch(startLoadingData());
        try {
            const resp = await authApi.get<UsersResponse>('/usuarios');
            dispatch(setUsers(resp.data.usuarios));
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

            dispatch(stopSaving());
        } catch (error: any) {
            const msg = error.response.data.errors.map(error => error.msg).join(', ');
            dispatch(setMessage(msg));
            setTimeout(() => {
                dispatch(clearErrorMessage());
            }, 3000);

            dispatch(stopSaving());
        }
    }
}

export const UpdateUser = (nombre: string, apellido: string, cedula: number, correo: string, rol: string, id: string) => {
    return async (dispatch: AppDispatch) => {
        dispatch(startSaving());
        try {
            const resp = await authApi.put<UpdateUserResponse>(`/usuarios/${id}`, { nombre, apellido, cedula, correo, rol });
            dispatch(setUpdateUser(resp.data as Usuario));
            dispatch(stopSaving());
        } catch (error: any) {
            const msg = error.response.data.errors.map(error => error.msg).join(', ');
            dispatch(setMessage(msg));
            setTimeout(() => {
                dispatch(clearErrorMessage());
            }, 3000);

            dispatch(stopSaving());
        }
    }
}

export const PatchUser = (fechaNacimiento:string, estadoVacunas:string, tipoDeVacuna:string, numeroDosis:number, telefono: number, direccion:string, fechaDeVacunacion: string, id:string,) => {

    return async (dispatch: AppDispatch) => {
        dispatch(startSaving());
        try {
            const resp = await authApi.patch<PatchUserResponse>(`/usuarios/${id}`, { fechaNacimiento, estadoVacunas, tipoDeVacuna, numeroDosis, telefono, direccion, fechaDeVacunacion });
            dispatch(setPacthUser(resp.data.usuario as Usuario ));
            console.log(resp.data);
            dispatch(stopSaving());
        } catch (error: any) {
            const msg = error.response.data.errors.map(error => error.msg).join(', ');
            dispatch(setMessage(msg));
            setTimeout(() => {
                dispatch(clearErrorMessage());
            }, 3000);

            dispatch(stopSaving());
        }
    }

}

export const DeleteUser = (uid: string) => {
    return async (dispatch: AppDispatch) => {
        dispatch(startDeleteing());
        try {
            const resp = await authApi.delete<DeleteUserResponse>(`/usuarios/${uid}`, {
                headers: {
                    'x-token': localStorage.getItem('token')
                }
            })
            dispatch(deleteUser(resp.data as Usuario));
            dispatch(LoadUsers());  
            dispatch(stopDeleteing());
        } catch (error: any) {
            dispatch(stopDeleteing());
        }
    }
}

