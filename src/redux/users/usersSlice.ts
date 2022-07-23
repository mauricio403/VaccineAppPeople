import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { Usuario } from '../../interfaces/userInterface';

export interface productState {
    isSaving: boolean
    messageSaved: string
    users: Usuario[]
    active: Usuario
    isLoading: boolean
    isDeleting: boolean
    msg?: string
}

const initialState: productState = {
    isSaving: false,
    messageSaved: "",
    users: [],
    active: {} as Usuario,
    isLoading: false,
    isDeleting: false,
}

export const usersSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        startLoadingData: (state) => {
            state.isLoading = true
        },
        stopLoadingData: (state) => {
            state.isLoading = false
        },
        setUsers: (state, action: PayloadAction<Usuario[]>) => {
            state.users = action.payload
        },
        startSaving: (state) => {
            state.isSaving = true
        },
        stopSaving: (state) => {
            state.isSaving = false
        },
        setNewUser: (state, action: PayloadAction<Usuario>) => {
            state.users.push(action.payload)
            state.msg = action.payload.nombre + " fue agregado correctamente"
        },
        startDeleteing: (state) => {
            state.isDeleting = true
        },
        stopDeleteing: (state) => {
            state.isDeleting = false
        },
        clearErrorMessage: (state) => {
            state.msg = '';
        }

    },
})

// Action creators are generated for each case reducer function
export const { setUsers, startLoadingData, stopLoadingData, startSaving, stopSaving, setNewUser, startDeleteing, stopDeleteing, clearErrorMessage } = usersSlice.actions
