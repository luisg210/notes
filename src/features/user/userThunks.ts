import { createAsyncThunk } from "@reduxjs/toolkit";
import { changeUserPassword, createUser, deleteUser, findUserById, updateUser } from "./api";
import { UserChangePasswordDTO, UserCreateDTO, UserUpdateDTO } from "@/types";

export const fetchFindUserById = createAsyncThunk(
    'user/findById',
    async (id: string, thunkAPI) => {
        try {
            const response = await findUserById(id);

            return response;

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
    async (formData: UserUpdateDTO, thunkAPI) => {
        try {
            const response = await updateUser(formData);

            return response;

        } catch (error: any) {
            const fallbackMessage = error.response?.data?.message || 'Error inesperado';
            return thunkAPI.rejectWithValue(fallbackMessage);
        }
    }
)

export const changeUserPasswordThunk = createAsyncThunk(
    'user/changeUserPassword',
    async (formData: UserChangePasswordDTO, thunkAPI) => {
        try {
            const response = await changeUserPassword(formData);

            return response;

        } catch (error: any) {
            const fallbackMessage = error.response?.data?.message || 'Error inesperado';
            return thunkAPI.rejectWithValue(fallbackMessage);
        }
    }
)

export const deleteUserThunk = createAsyncThunk(
    'user/deleteUser',
    async (id: string, thunkAPI) => {
        try {
            const response = await deleteUser(id);

            return response;

        } catch (error: any) {
            const fallbackMessage = error.response?.data?.message || 'Error inesperado';
            return thunkAPI.rejectWithValue(fallbackMessage);
        }
    }
) 
