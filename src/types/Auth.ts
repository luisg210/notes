export interface AuthResponseDTO {
    id: string;
    user: string;
    token: string;
    createdAt?: Date;
    updatedAt?: Date;
}

export interface LoginRequestDTO {
    user: string;
    password: string
}

export interface RenewTokenDTO {
    id?: string;
    user?: string;
}

export type AuthState = {
    user: AuthResponseDTO | null;
    loading: boolean;
    error: string | null;
    sessionChecked: boolean;
}