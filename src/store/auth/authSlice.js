import { createSlice } from '@reduxjs/toolkit';

export const authSlice = createSlice({
    name: 'auth', 
    initialState: {
        //status: 'not-authenticated',
        status: 'checking',
        user: {},
        errorMsg: undefined
    },
    reducers: {
        onChecking: ( state ) => {
            state.status = 'checking';
            state.user = {};
            state.errorMsg = undefined;
        },
        onLogin: ( state, {payload} ) => {
            state.status = 'authenticated';
            state.user = payload;
            state.errorMsg = undefined;
        },
        onLogout: ( state, { payload } ) => {
            state.status = 'not-authenticated';
            state.user = {};
            state.errorMsg = payload;
        }
    }
});

export const { onChecking, onLogin, onLogout } = authSlice.actions;