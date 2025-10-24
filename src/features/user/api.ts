import { axiosInstance } from "@/service";
import { ApiResponse, UserChangePasswordDTO, UserCreateDTO, UserResponseDTO, UserUpdateDTO } from "@/types";

const ENDPOINT = '/users';

export const findUserById = async (id: string): Promise<ApiResponse<UserResponseDTO>> => {
    return (await axiosInstance.get(`${ENDPOINT}/${id}`)).data;
}

export const createUser = async (data: UserCreateDTO): Promise<ApiResponse<UserResponseDTO>> => {
    return (await axiosInstance.post(`${ENDPOINT}/register`, data)).data;
}

export const updateUser = async (data: UserUpdateDTO): Promise<ApiResponse<UserResponseDTO>> => {
    return (await axiosInstance.put(`${ENDPOINT}/${data._id}`, data)).data;
}

export const changeUserPassword = async (data: UserChangePasswordDTO): Promise<ApiResponse<UserResponseDTO>> => {
    return (await axiosInstance.patch(`${ENDPOINT}/change-password`, data)).data;
}

export const deleteUser = async (id: string): Promise<ApiResponse<UserResponseDTO>> => {
    return (await axiosInstance.delete(`${ENDPOINT}/${id}`)).data;
}
