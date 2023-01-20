import { configureStore } from '@reduxjs/toolkit';
import { authSlice } from './auth/authSlice';
import { noteSlice } from './notes/noteSlice';
import { uiSlice } from './uiSlice';

export const store = configureStore({
    reducer: {
        auth: authSlice.reducer,
        notes: noteSlice.reducer,
        ui: uiSlice.reducer
    },
    middleware: ( getDefaultMiddleware ) => getDefaultMiddleware({
        serializableCheck: false
    })
});