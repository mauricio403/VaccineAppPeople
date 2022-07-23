import { AppDispatch } from '../store';
import { setUsers, startLoadingData, stopLoadingData } from './usersSlice';
import { authApi } from '../../api/authApi';
import { UsersResponse } from '../../interfaces/userInterface';


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