import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    allPhotos: [],
    allUsers: [],
    userDetails: {},
    imageDetails: {}
}

export const storageSlice = createSlice({
    name: 'storage',
    initialState,
    reducers: {
        getAllPhotos: (state, action) => { 
            state.allPhotos = action.payload;
        },
        getImageByID: (state,action) => {
            state.imageDetails = { ...action.payload };
        },
        getAllUsers: (state, action) => {
            state.allUsers = action.payload;
        },
        getUserDetails: (state,action) => {
            state.userDetails = { ...action.payload };
        },
        cleanUserDetails: (state) => {
            state.userDetails = {};
        }
    }
});

export const { getAllPhotos, getAllUsers, getUserDetails, cleanUserDetails, getImageByID} = storageSlice.actions;
export default storageSlice.reducer;
