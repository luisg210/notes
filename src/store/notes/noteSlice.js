import { createSlice } from "@reduxjs/toolkit";

export const noteSlice = createSlice({
    name: 'note',
    initialState: {
        notes: [],
        errorMsg: '',
        successMsg: '',
        note: {}
    },
    reducers: {
        //indica que recibe un array
        onGetAll: ( state, { payload = [] } ) => {
            state.notes = payload; 

            state.successMsg = '';
            state.errorMsg = '';
        }, 
        onErrorMsg: ( state, { payload } ) => {
            state.errorMsg = payload;
        },
        onDelete: ( state, { payload } ) => { 
            //Corregir esto cuando se mande el ok desde el back
            !payload.data.ok 
                ? state.successMsg = payload.data.msg 
                : state.errorMsg = payload.data.msg;  
        }, 
        onSave: ( state, { payload } ) => {
            payload.data.ok 
                ? state.successMsg = payload.data.msg 
                : state.errorMsg = payload.data.msg;
                console.log(payload);
        },
        onGetById: ( state, { payload } ) => {
            
            state.note = payload.note;
        }
    }
});

export const { onGetAll, onErrorMsg, onDelete, onSave, onGetById } = noteSlice.actions;