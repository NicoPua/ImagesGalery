import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    photosAPI: [],
    allUsers: []
}

export const storageSlice = createSlice({
    name: 'storage',
    initialState,
    reducers: {
        getAllUsers: (state, action) => { 
            state.allUsers = action.payload;
        }
    }
});

export const { getAllUsers } = storageSlice.actions;
export default storageSlice.reducer;
