import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    allPhotos: [],
    allUsers: []
}

export const storageSlice = createSlice({
    name: 'storage',
    initialState,
    reducers: {
        getAllPhotos: (state, action) => { 
            state.allPhotos = action.payload;
        },
        getAllUsers: (state, action) =>{
            state.allUsers = action.payload;
        }
    }
});

export const { getAllPhotos, getAllUsers } = storageSlice.actions;
export default storageSlice.reducer;