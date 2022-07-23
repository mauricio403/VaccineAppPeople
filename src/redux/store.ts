import { configureStore } from '@reduxjs/toolkit'
import { authSilce } from './auth/authSlices';
import { usersSlice } from './users/usersSlice';

export const store = configureStore({
    reducer: {
        auth: authSilce.reducer,
        users: usersSlice.reducer,
    },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch