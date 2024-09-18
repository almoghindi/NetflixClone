export interface LoginCredentials {
  email: string;
  password: string;
}

export interface SignupCredentials extends LoginCredentials {}

export interface AuthResponse {
  user: {
    userId: string;
    email: string;
    password: string;
    token: string;
    __v: number;
    subscription: string;
    accessToken: string | null;
    refreshToken: string | null;
    profileId?: string | null;
    avatar?: string | null;
  };
}

export interface AuthState {
  user: AuthResponse["user"] | null;
}
