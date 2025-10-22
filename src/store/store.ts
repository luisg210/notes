import { configureStore } from '@reduxjs/toolkit';
import authSlice from '@/features/auth/authSlice';
import noteSlice from '@/features/notes/noteSlice';

export const store = configureStore({
    reducer: {
        auth: authSlice,
        note: noteSlice,
        //user: userSlice,
        //ui: uiSlice
    }, devTools: import.meta.env.DEV,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
