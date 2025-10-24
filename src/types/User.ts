import { WithId } from "./WithId";

export interface UserResponseDTO {
    id: string;
    name: string;
    username: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface UserCreateDTO {
    name: string;
    user: string;
    password: string;
}

export interface UserUpdateDTO {
    id: string;
    _id: string;
    name: string;
    username: string;
    password: string;
};

export interface UserChangePasswordDTO {
    password: string;
}

export type UserState = {
    user: UserResponseDTO | null;
    loading: boolean;
    error: string | null;
}
