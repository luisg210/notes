import { NoteCreateDTO, NoteUpdateDTO } from "@/types";
import { NoteFormData } from "../validation";

export const adaptFormToDTO = (formData: NoteFormData, id?: string): NoteCreateDTO | NoteUpdateDTO => (
    {
        ...(id ? { id } : {}),
        title: formData.title,
        content: formData.content
    }
)
