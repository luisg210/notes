import { createAsyncThunk } from "@reduxjs/toolkit";
import { changeUserPassword, createUser, deleteUser, findUserById, updateUser } from "./api";
import { UserChangePasswordDTO, UserCreateDTO, UserDeleteDTO, UserUpdateDTO } from "@/types";
import { RootState } from "@/store";

export const fetchFindUserById = createAsyncThunk(
    'user/findById',
    async (id: string, thunkAPI) => {
        try {
            const response = await findUserById(id);
            return response.data;

        } catch (error: any) {
            const fallbackMessage = error.response?.data?.message || 'Error inesperado';
            return thunkAPI.rejectWithValue(fallbackMessage);
        }
    }
)

export const createUserThunk = createAsyncThunk(
    'user/createUser',
    async (formData: UserCreateDTO, thunkAPI) => {
        try {
            const response = await createUser(formData);

            if (!response.success) {
                console.log(response.message)
                thunkAPI.rejectWithValue(response.message);
            }

            return response;

        } catch (error: any) {
            const fallbackMessage = error.response?.data.message || 'Error inesperado';
            return thunkAPI.rejectWithValue(fallbackMessage);
        }
    }
)

export const updateUserThunk = createAsyncThunk(
    'user/updateUser',
    async (formData: UserUpdateDTO, { getState, rejectWithValue }) => {
        try {
            const payload = {
                ...formData,
                id: (getState() as RootState).user.user?.id || ''
            }
            const response = await updateUser(payload);

            return response;

        } catch (error: any) {
            const fallbackMessage = error.response?.data?.message || 'Error inesperado';
            return rejectWithValue(fallbackMessage);
        }
    }
)

export const changeUserPasswordThunk = createAsyncThunk(
    'user/changeUserPassword',
    async (formData: UserChangePasswordDTO, { getState, rejectWithValue }) => {
        try {
            const payload = {
                ...formData,
                user: (getState() as RootState).user.user?.id || ''
            }
            const response = await changeUserPassword(payload);

            return response;

        } catch (error: any) {
            const fallbackMessage = error.response?.data?.message || 'Error inesperado';
            return rejectWithValue(fallbackMessage);
        }
    }
)

export const deleteUserThunk = createAsyncThunk(
    'user/deleteUser',
    async (formData: UserDeleteDTO, { getState, rejectWithValue }) => {
        try {
            const payload: UserDeleteDTO = {
                ...formData,
                user: (getState() as RootState).user.user?.id || ''
            }
            const response = await deleteUser(payload);

            return response.message;

        } catch (error: any) {
            const fallbackMessage = error.response?.data?.message || 'Error inesperado';
            return rejectWithValue(fallbackMessage);
        }
    }
) 
