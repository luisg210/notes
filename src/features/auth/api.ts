import { ApiResponse, AuthResponseDTO, LoginRequestDTO, RenewTokenDTO } from "@/types";
import { axiosInstance } from "@/service";

const ENPOINT = "/auth";

export const login = async (data: LoginRequestDTO): Promise<ApiResponse<AuthResponseDTO>> => {
    return (await axiosInstance.post(`${ENPOINT}/login`, data)).data;
}

export const renewToken = async (data: RenewTokenDTO): Promise<ApiResponse<AuthResponseDTO>> => {
    return (await axiosInstance.post(`${ENPOINT}/renew`, data)).data;
}

