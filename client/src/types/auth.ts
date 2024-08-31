export interface LoginCredentials {
    email: string;
    password: string;
}

export interface SignupCredentials extends LoginCredentials {}

export interface AuthResponse {

    user:{
        user: any;
        userId:string;
        email:string;
        password:string;
        token:string;
        __v:number;
        subscription:string;
        accessToken: string | null;
        refreshToken: string | null;
    }

}

export interface AuthState {
    user: AuthResponse['user'] | null;
}