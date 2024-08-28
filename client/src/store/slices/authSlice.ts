import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AuthState, AuthResponse} from '../../types/auth';


const initialState: AuthState = {
  user: localStorage.getItem('userId') ? { id: localStorage.getItem('userId') as string } : null,
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
    },
    signupSuccess: (state, action: PayloadAction<AuthResponse>) => {
      state.user = action.payload.user;
    },
  },
});

export const { setUser, loginSuccess, logoutSuccess, signupSuccess } = authSlice.actions;

export default authSlice.reducer;
