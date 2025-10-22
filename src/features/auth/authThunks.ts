import { createAsyncThunk } from "@reduxjs/toolkit";
import { login, renewToken } from "./api";
import { LoginRequestDTO, RenewTokenDTO } from "@/types";

export const loginThunk = createAsyncThunk(
    'auth/login',
    async (formData: LoginRequestDTO, thunkAPI) => {
        try {
            const response = await login(formData);

            if (response.success) {
                localStorage.setItem('x-token', response.data?.token as string);
                localStorage.setItem('user-id', response.data?.id as string);
                localStorage.setItem('username', response.data?.user as string);
            }

            if (!response.success) {
                return thunkAPI.rejectWithValue(response.message);
            }

            return response;

        } catch (error: any) {
            const fallbackMessage = error.response?.data?.message || 'Error inesperado';
            return thunkAPI.rejectWithValue(fallbackMessage);
        }
    }
)

export const renewTokenThunk = createAsyncThunk(
    'auth/renewToken',
    async (_, thunkAPI) => {
        const token = localStorage.getItem('x-token');
        if (!token) return;

        const id = localStorage.getItem('user-id') ?? "";
        const username = localStorage.getItem('username') ?? "";

        const dataReq: RenewTokenDTO = {
            id: id,
            user: username,
        }

        try {
            const response = await renewToken(dataReq);
            return response;

        } catch (error: any) {
            const fallbackMessage = error.response?.data?.message || 'Error inesperado';
            return thunkAPI.rejectWithValue(fallbackMessage);
        }
    }
);
