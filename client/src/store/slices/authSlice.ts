import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AuthState, AuthResponse} from '../../types/auth';
import { decryptObject } from '../../utils/encription';


const initialState: AuthState = {
  user: decryptObject(localStorage.getItem('user')!) || null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<AuthResponse['user']>) => {
      state.user = action.payload;
    },
    logoutSuccess: (state) => {
      state.user = null;
    },
    
    signupSuccess: (state, action: PayloadAction<AuthResponse>) => {
      state.user = action.payload.user;
    },

  },
});

export const { setUser, logoutSuccess, signupSuccess } = authSlice.actions;

export default authSlice.reducer;
