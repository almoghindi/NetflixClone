import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AuthState, AuthResponse, LoginCredentials, SignupCredentials } from '../../types/auth';
import { sendRequest } from '../../hooks/use-request'; // Adjust the path accordingly

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
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    setIsLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
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

export const { setUser, setError, setIsLoading, loginSuccess, logoutSuccess, signupSuccess } = authSlice.actions;

export const login = (credentials: LoginCredentials) => async (dispatch: any) => {
  try {
    dispatch(setIsLoading(true));
    const response = await sendRequest({
      url: 'api/auth/login',
      method: 'POST',
      body: credentials,
    });
    dispatch(loginSuccess(response));
    localStorage.setItem('accessToken', response.accessToken);
    localStorage.setItem('refreshToken', response.refreshToken);
  } catch (error) {
    dispatch(setError(error instanceof Error ? error.message : 'An error occurred'));
  } finally {
    dispatch(setIsLoading(false));
  }
};

export const signup = (credentials: SignupCredentials) => async (dispatch: any) => {
  try {
    dispatch(setIsLoading(true));
    const response = await sendRequest({
      url: '/api/auth/register',
      method: 'POST',
      body: credentials,
    });
    dispatch(signupSuccess(response));
    localStorage.setItem('accessToken', response.accessToken);
    localStorage.setItem('refreshToken', response.refreshToken);
  } catch (error) {
    dispatch(setError(error instanceof Error ? error.message : 'An error occurred'));
  } finally {
    dispatch(setIsLoading(false));
  }
};

export const logout = () => async (dispatch: any) => {
  try {
    await sendRequest({
      url: '/logout',
      method: 'POST',
    });
    dispatch(logoutSuccess());
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
  } catch (error) {
    dispatch(setError(error instanceof Error ? error.message : 'An error occurred'));
  }
};

export default authSlice.reducer;
