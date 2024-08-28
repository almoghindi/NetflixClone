export interface LoginCredentials {
    email: string;
    password: string;
}

export interface SignupCredentials extends LoginCredentials {}

export interface AuthResponse {
    accessToken: string;
    refreshToken: string;
    user:{
        id: string;
    };
}

export interface AuthState {
    user: AuthResponse['user'] | null;
}