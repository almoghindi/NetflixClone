import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AuthState, AuthResponse, LoginCredentials, SignupCredentials } from '../../types/auth';
import { sendRequest } from '../../hooks/use-request'; 


const initialState: AuthState = {
  user: null,
  isLoading: false,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<AuthResponse['user']>) => {
      state.user = action.payload;
    },
    loginSuccess: (state, action: PayloadAction<AuthResponse>) => {
      state.user = action.payload.user;
    },
    logoutSuccess: (state) => {
      state.user = null;
      state.error = null;
    },
    signupSuccess: (state, action: PayloadAction<AuthResponse>) => {
      state.user = action.payload.user;
    },
  },
});

export const { setUser, loginSuccess, logoutSuccess, signupSuccess } = authSlice.actions;

export default authSlice.reducer;
