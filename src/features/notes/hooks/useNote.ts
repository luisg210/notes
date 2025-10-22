import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/store"
import { deleteNoteThunk, fetchFindAll } from "../noteThunks";
import { useDeleteWithConfirm } from "@/hooks";

type Props = {
    showSnackbar: (msg: string, sev: any) => void;
}

export const useNote = ({ showSnackbar }: Props) => {
    const successDeleteNote = () => {
        getNotes();
    };

    const dispatch = useAppDispatch();
    const { notes, loading, error } = useAppSelector(state => state.note);
    const { requestDelete, ConfirmDialog } = useDeleteWithConfirm({
        entityName: 'Nota',
        deleteThunk: deleteNoteThunk,
        onDeleted: successDeleteNote,
        showSnackbar,
    });

    const getNotes = async () => {
        await dispatch(fetchFindAll());
    }

    useEffect(() => {
        getNotes();
    }, []);


    return {
        //From state
        notes,
        loading,
        error,

        //Methods
        getNotes,
        requestDelete,

        //UseDelete
        ConfirmDialog,
    }
} 