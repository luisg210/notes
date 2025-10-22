import { WithId } from "./WithId";

export interface NoteResponseDTO {
    _id: string;
    id: string;
    title: string;
    content: string;
    date: Date;
    createdAt?: Date;
    updatedAt?: Date;
    user?: string;
}

export interface NoteCreateDTO {
    title: string;
    content: string;
    user: string;
}

export type NoteUpdateDTO = WithId<NoteCreateDTO>;

export type NoteState = {
    notes: NoteResponseDTO[] | null;
    loading: boolean;
    error: string | null;
}