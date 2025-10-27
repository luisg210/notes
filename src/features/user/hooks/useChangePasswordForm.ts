import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAppDispatch } from "@/store"
import { UserChangePasswordFormData, userChangePasswordSchema } from "../validation";
import { changeUserPasswordThunk } from "../userThunks";
import { UserChangePasswordDTO } from "@/types";

type Props = {
    showSnackbar: (msg: string, sev: any) => void;
    handleSuccess?: () => void;
    reset?: () => void;
}

export const useUserChangePasswordForm = ({ showSnackbar, handleSuccess, reset }: Props) => {
    const dispatch = useAppDispatch();
    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<UserChangePasswordFormData>({
        resolver: zodResolver(userChangePasswordSchema)
    });

    const onSubmit = async (data: UserChangePasswordFormData) => {
        const result = await dispatch(changeUserPasswordThunk(data as UserChangePasswordDTO));

        if (result.type.includes('fulfilled')) {
            showSnackbar(result.payload?.message, 'success');
            handleSuccess?.();
            reset?.();
        }
    }


    return {
        handleSubmit,
        onSubmit,
        isSubmitting,
        register,
        errors,
    }
}
