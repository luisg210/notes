import { NoteUpdateDTO } from "@/types";
import { NoteFormData } from "../validation";

export const adaptDTOToForm = (note: NoteUpdateDTO): NoteFormData => {

    return {
        title: note.title,
        content: note.content,
    }
}
