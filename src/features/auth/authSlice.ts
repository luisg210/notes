import { createSlice } from "@reduxjs/toolkit";
import { AuthState } from "@/types";
import { loginThunk, renewTokenThunk } from "./authThunks";

const initialState: AuthState = {
    user: null,
    loading: false,
    error: null,
    sessionChecked: false,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logOut(state) {
            state.user = null;
            localStorage.removeItem('x-token');
            localStorage.removeItem('user-id');
        },
        clearState(state) {
            state.user = null;
            state.loading = false;
            state.sessionChecked = false;
            state.error = null;
        }
    },
    extraReducers: builder => {
        builder
            .addCase(loginThunk.pending, state => {
                state.loading = true;
                state.error = null;
            })
            .addCase(loginThunk.fulfilled, (state, action) => {
                state.user = action.payload.data;
                state.loading = false;
                state.error = null;
            })
            .addCase(loginThunk.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            .addCase(renewTokenThunk.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(renewTokenThunk.fulfilled, (state, action) => {
                state.user = action.payload?.data ?? null;
                state.loading = false;
                state.sessionChecked = true;
            })
            .addCase(renewTokenThunk.rejected, (state, action) => {
                state.user = null;
                state.loading = false;
                state.sessionChecked = true;
                state.error = action.payload as string;
                localStorage.removeItem('token');
            });
    },
});

export const { logOut, clearState } = authSlice.actions;
export default authSlice.reducer;
