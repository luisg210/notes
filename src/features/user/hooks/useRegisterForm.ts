import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAppDispatch, useAppSelector } from "@/store"
import { RegisterFormData, registerSchema } from "../validation";
import { createUserThunk } from "../userThunks";
import { UserCreateDTO } from "@/types";
import { loginThunk } from "@/features/auth";

export const useRegisterForm = () => {
    const dispatch = useAppDispatch();
    const { loading, error } = useAppSelector(state => state.user);
    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<RegisterFormData>({
        resolver: zodResolver(registerSchema)
    });

    const onSubmit = handleSubmit(async (data: RegisterFormData) => {
        const result = await dispatch(createUserThunk(data as UserCreateDTO));

        if (result.type.includes('fulfilled')) {
            const payload = {
                user: data.user,
                password: data.password
            }
            await dispatch(loginThunk(payload));
        }
    })


    return {
        loading,
        error,
        onSubmit,
        isSubmitting,
        register,
        errors,
    }
}
