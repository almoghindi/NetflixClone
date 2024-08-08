import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AuthState, AuthResponse } from '../../types/auth';

const initialState: AuthState ={
    user: null,
    isLoading: false,
    error: null
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setUser: (state, action: PayloadAction<AuthResponse['user']>) => {
            state.user = action.payload;
        },
        login: (state, action: PayloadAction<AuthResponse['user']>) => {
            state.user = action.payload;
        },
        logout: (state) => {
            state.user = null;
            state.error = null;
        },
        setError: (state, action: PayloadAction<string | null> ) => {
            state.error = action.payload;
        },
        setLoading: (state, action: PayloadAction<boolean>) => {
            state.isLoading = action.payload;
        },
    },
})

export const { setUser, logout } = authSlice.actions;
export default authSlice.reducer;