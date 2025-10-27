import { createSlice } from "@reduxjs/toolkit";
import { UserState } from "@/types";
import { changeUserPasswordThunk, createUserThunk, deleteUserThunk, fetchFindUserById, updateUserThunk } from "./userThunks";

const initialState: UserState = {
    user: null,
    error: null,
    loading: false
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        clearState(state) {
            state.user = null;
            state.loading = false;
            state.error = null;
        }
    },
    extraReducers: builder => {
        builder
            //FindById
            .addCase(fetchFindUserById.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchFindUserById.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload;
            })
            .addCase(fetchFindUserById.rejected, (state, action) => {
                state.error = action.error as string;
                state.loading = false;
            })
            //Create
            .addCase(createUserThunk.pending, (state) => {
                state.loading = true;
            })
            .addCase(createUserThunk.fulfilled, (state) => {
                state.loading = false;
            })
            .addCase(createUserThunk.rejected, (state, action) => {
                state.error = action.payload as string;
                state.loading = false;
            })
            //Update
            .addCase(updateUserThunk.pending, (state) => {
                state.loading = true;
            })
            .addCase(updateUserThunk.fulfilled, (state) => {
                state.loading = true;
            })
            .addCase(updateUserThunk.rejected, (state, action) => {
                state.error = action.payload as string;
                state.loading = false;
            })
            //ChangePassword
            .addCase(changeUserPasswordThunk.pending, (state) => {
                state.loading = true;
            })
            .addCase(changeUserPasswordThunk.fulfilled, (state) => {
                state.loading = true;
            })
            .addCase(changeUserPasswordThunk.rejected, (state, action) => {
                state.error = action.payload as string;
                state.loading = false;
            })
            //Delete
            .addCase(deleteUserThunk.pending, (state) => {
                state.loading = true;
            })
            .addCase(deleteUserThunk.fulfilled, (state) => {
                state.loading = true;
            })
            .addCase(deleteUserThunk.rejected, (state, action) => {
                state.error = action.payload as string;
                state.loading = false;
            })
    },
});

export const { clearState } = userSlice.actions;
export default userSlice.reducer;
