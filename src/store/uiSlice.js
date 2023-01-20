import { createSlice } from "@reduxjs/toolkit";


export const uiSlice = createSlice({
    name: 'ui',
    initialState: {
        isModalOpen: false,
        isUpdate: false
    },
    reducers: {
        onOpenModal: ( state ) => {
            state.isModalOpen = true;
        },
        onCloseModal: ( state ) => {
            state.isModalOpen = false;
        },
        onIsUpdate: ( state, { payload } ) => {
            state.isUpdate = payload;
        }
    }
})

export const { onOpenModal, onCloseModal, onIsUpdate } = uiSlice.actions;