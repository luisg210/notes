import { useState } from "react";
import { useAuthStore } from "@/hooks";
import { UserResponseDTO } from "@/types";
import { useAppDispatch, useAppSelector } from "@/store";
import { fetchFindUserById } from "../userThunks";

export const useUser = () => {
    const dispatch = useAppDispatch();
    const { loading } = useAppSelector(state => state.user);
    const { user } = useAuthStore();
    const [currentUser, setCurrentUser] = useState<UserResponseDTO>({} as UserResponseDTO);

    const findById = async () => {
        const response = await dispatch(fetchFindUserById(user?.id as string));
        setCurrentUser(response.payload as UserResponseDTO);
    }

    return {
        currentUser,
        findById,
        loading,
    };
}
