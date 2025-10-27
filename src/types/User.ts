export interface UserResponseDTO {
    id: string;
    name: string;
    username: string;
    user?: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface UserCreateDTO {
    name: string;
    user: string;
    password: string;
}

export interface UserUpdateDTO {
    id?: string;
    _id?: string;
    name: string;
    user: string;
};

export interface UserChangePasswordDTO {
    currentPassword: string;
    newPassword: string;
    user?: string;
}

export interface UserDeleteDTO {
    user: string;
    password: string;
}

export type UserState = {
    user: UserResponseDTO | null;
    loading: boolean;
    error: string | null;
}
