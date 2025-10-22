import { useAppSelector } from "@/store";


export const useAuthStore = () => {
    const { user, sessionChecked, loading, error } = useAppSelector(state => state.auth);

    const isAuthenticated = !!user;

    return {
        user,
        isAuthenticated,
        sessionChecked,
        loading,
        error,
    };
};