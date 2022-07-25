import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { Usuario } from '../../interfaces/userInterface';

export interface productState {
    isSaving: boolean
    users: Usuario[]
    active: Usuario
    isLoading: boolean
    isDeleting: boolean
    msg?: string
}

const initialState: productState = {
    isSaving: false,
    users: [],
    active: {} as Usuario,
    isLoading: false,
    isDeleting: false,
    msg: ''
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
        },
        setUpdateUser: (state, action: PayloadAction<Usuario>) => {
            const index = state.users.findIndex(user => user.uid === action.payload.uid)
            state.users[index] = action.payload
        },
        setMessage: (state, action: PayloadAction<string>) => {
            state.msg = action.payload
        },
        startDeleteing: (state) => {
            state.isDeleting = true
        },
        stopDeleteing: (state) => {
            state.isDeleting = false
        },
        deleteUser: (state, action: PayloadAction<Usuario>) => {
            state.users = state.users.filter(user => user.uid !== action.payload.uid)
        },
        clearErrorMessage: (state) => {
            state.msg = '';
        },
        setPacthUser: (state, action: PayloadAction<Usuario>) => {
            const index = state.users.findIndex(user => user.uid === action.payload.uid)
            state.users[index] = action.payload
        },
        setUserById: (state, action: PayloadAction<Usuario>) => {
            state.active = action.payload
        }
    },
})

// Action creators are generated for each case reducer function
export const {
    setUsers,
    startLoadingData,
    stopLoadingData,
    startSaving,
    stopSaving,
    setNewUser,
    startDeleteing,
    stopDeleteing,
    clearErrorMessage,
    deleteUser,
    setMessage,
    setUpdateUser,
    setPacthUser,
    setUserById
} = usersSlice.actions
