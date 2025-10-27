import { useAppDispatch, useAppSelector } from "@/store"
import { UpdateUserFormData } from "../validation";
import { updateUserThunk } from "../userThunks";
import { UserUpdateDTO } from "@/types";

type Props = {
    showSnackbar: (msg: string, sev: any) => void;
    handleSuccess?: () => void;
    reset?: () => void;
}

export const useUserForm = ({ showSnackbar, handleSuccess, reset }: Props) => {
    const dispatch = useAppDispatch();
    const { loading, error } = useAppSelector(state => state.user);

    const onSubmit = async (data: UpdateUserFormData) => {
        const result = await dispatch(updateUserThunk(data as UserUpdateDTO));

        if (result.type.includes('fulfilled')) {
            showSnackbar(result.payload?.message, 'success');
            handleSuccess?.();
            reset?.();
        }
    }


    return {
        loading,
        error,
        onSubmit,
    }
}
