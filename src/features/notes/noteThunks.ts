import { createAsyncThunk } from "@reduxjs/toolkit";
import { createNote, findAllNotes, updateNote, deleteNote } from "./api";
import { NoteCreateDTO, NoteUpdateDTO } from "@/types";
import { RootState } from "@/store";

export const fetchFindAll = createAsyncThunk(
    'notes/fetchFindAll',
    async (_, thunkAPI) => {
        try {
            const response = await findAllNotes();

            return response;

        } catch (error: any) {
            const fallbackMessage = error.response?.data?.message || 'Error inesperado';
            return thunkAPI.rejectWithValue(fallbackMessage);
        }
    }
);

export const createNoteThunk = createAsyncThunk(
    'notes/createNote',
    async (formData: NoteCreateDTO, { getState, rejectWithValue }) => {
        try {
            const { user } = (getState() as RootState).auth;

            const payload = {
                ...formData,
                user: user?.id as string
            }
            const response = await createNote(payload);

            return response;

        } catch (error: any) {
            const fallbackMessage = error.response?.data?.message || 'Error inesperado';
            return rejectWithValue(fallbackMessage);
        }
    }
);

export const updateNoteThunk = createAsyncThunk(
    'notes/updateNote',
    async (formData: NoteUpdateDTO, { getState, rejectWithValue }) => {
        try {
            const { user } = (getState() as RootState).auth;

            const payload = {
                ...formData,
                user: user?.id as string
            }

            const response = await updateNote(payload);

            return response;

        } catch (error: any) {
            const fallbackMessage = error.response?.data?.message || 'Error inesperado';
            return rejectWithValue(fallbackMessage);
        }
    }
);

export const deleteNoteThunk = createAsyncThunk(
    'notes/deleteNote',
    async (id: string, thunkAPI) => {
        try {
            const response = await deleteNote(id);

            return response;

        } catch (error: any) {
            const fallbackMessage = error.response?.data?.message || 'Error inesperado';
            return thunkAPI.rejectWithValue(fallbackMessage);
        }
    }
);
