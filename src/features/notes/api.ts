import { axiosInstance } from "@/service";
import { ApiResponse, NoteCreateDTO, NoteResponseDTO, NoteUpdateDTO } from "@/types";

const ENDPOINT = '/notes';

export const findAllNotes = async (): Promise<ApiResponse<NoteResponseDTO[]>> => {
    return (await axiosInstance.get(`${ENDPOINT}/`)).data;
}

export const createNote = async (note: NoteCreateDTO): Promise<ApiResponse<NoteResponseDTO>> => {
    return (await axiosInstance.post(`${ENDPOINT}/`, note)).data;
}

export const updateNote = async (note: NoteUpdateDTO): Promise<ApiResponse<NoteResponseDTO>> => {
    return (await axiosInstance.put(`${ENDPOINT}/${note.id}`, note)).data;
}

export const deleteNote = async (id: string): Promise<ApiResponse<void>> => {
    return (await axiosInstance.delete(`${ENDPOINT}/${id}`)).data;
} 
