import { configureStore } from '@reduxjs/toolkit';
import { authSlice } from './';
import { noteSlice } from './notes/noteSlice';

export const store = configureStore({
    reducer: {
        auth: authSlice.reducer,
        notes: noteSlice.reducer
    },
    middleware: ( getDefaultMiddleware ) => getDefaultMiddleware({
        serializableCheck: false
    })
});