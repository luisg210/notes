import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod';
import { AuthFormData, authSchema } from '../validation';
import { useAppDispatch, useAppSelector } from '@/store';
import { loginThunk } from '../authThunks';

export const useLoginForm = () => {
    const dispatch = useAppDispatch();
    const { loading, error } = useAppSelector(state => state.auth)
    const { handleSubmit, register, formState: { errors, isSubmitting } } = useForm<AuthFormData>({
        resolver: zodResolver(authSchema),
    });

    const onSubmit = handleSubmit(async (data: AuthFormData) => {
        await dispatch(loginThunk(data));
    });

    return {
        register,
        onSubmit,
        errors,
        isSubmitting,

        loading,
        error
    };
};
