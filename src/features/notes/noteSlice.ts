import { createSlice } from "@reduxjs/toolkit";
import { NoteResponseDTO, NoteState } from "@/types";
import { createNoteThunk, deleteNoteThunk, fetchFindAll, updateNoteThunk } from "./noteThunks";

const initialState: NoteState = {
    notes: [] as NoteResponseDTO[],
    error: null,
    loading: false
};

export const noteSlice = createSlice({
    name: 'note',
    initialState,
    reducers: {
        clearState: (state) => {
            state.notes = [];
        }
    },
    extraReducers(builder) {
        builder
            //List
            .addCase(fetchFindAll.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchFindAll.fulfilled, (state, action) => {
                state.loading = false;
                state.notes = action.payload.data;
            })
            .addCase(fetchFindAll.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error as string;
            })
            //Create
            .addCase(createNoteThunk.pending, (state) => {
                state.error = null;
            })
            .addCase(createNoteThunk.fulfilled, (state) => {
                state.loading = false;
            })
            .addCase(createNoteThunk.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error as string;
            })
            //Update
            .addCase(updateNoteThunk.pending, (state) => {
                state.error = null;
            })
            .addCase(updateNoteThunk.fulfilled, (state) => {
                state.loading = false;
            })
            .addCase(updateNoteThunk.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error as string;
            })
            //delete
            .addCase(deleteNoteThunk.pending, (state) => {
                state.error = null;
            })
            .addCase(deleteNoteThunk.fulfilled, (state) => {
                state.loading = false;
            })
            .addCase(deleteNoteThunk.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error as string;
            })
    },
});

export const { clearState } = noteSlice.actions;
export default noteSlice.reducer;
