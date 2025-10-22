import { WithId } from "./WithId";

export interface UserResponseDTO {

}

export interface UserCreateDTO {

}

export type UserUpdateDTO = WithId<UserCreateDTO>;

export type UserDefaultState = {

}
