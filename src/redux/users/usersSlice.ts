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
        setNewProduct: (state, action: PayloadAction<Usuario>) => {
            state.users.push(action.payload)
        },
        startDeleteing: (state) => {
            state.isDeleting = true
        },
        stopDeleteing: (state) => {
            state.isDeleting = false
        }

    },
})

// Action creators are generated for each case reducer function
export const { setUsers, startLoadingData, stopLoadingData, startSaving, stopSaving, setNewProduct, startDeleteing, stopDeleteing } = usersSlice.actions
