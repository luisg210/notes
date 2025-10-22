import { NoteCreateDTO, NoteUpdateDTO } from "@/types"
import { createNoteThunk, updateNoteThunk } from "../noteThunks"
import { NoteFormData } from "../validation";
import { adaptFormToDTO } from "../adapters/adaptFormToDTO";
import { useAppDispatch } from "@/store";

type Props = {
    showSnackbar: (msg: string, sev: any) => void;
    handleSuccess?: () => void;
    reset?: () => void;
}

export const useNoteForm = ({ showSnackbar, handleSuccess, reset }: Props) => {
    const dispatch = useAppDispatch();

    const onSubmit = async (formData: NoteFormData, note: NoteUpdateDTO) => {
        const payload: NoteCreateDTO | NoteUpdateDTO = adaptFormToDTO(formData, note?._id);
        const thunk = note?._id ? updateNoteThunk(payload as NoteUpdateDTO) : createNoteThunk(payload);

        const result = await dispatch(thunk);

        if (result.type.includes('fulfilled')) {
            showSnackbar(result.payload?.message as string, 'success');
            handleSuccess?.();
            reset?.();

        } else {
            showSnackbar(result.payload as string, 'error');
        }
    }

    return {
        onSubmit
    }
}
