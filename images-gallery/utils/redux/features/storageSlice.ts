import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    loguedUser: {},
    allPhotos: [],
    searchedPhotos: [],
    allUsers: [],
    userDetails: {},
    imageDetails: {},
    userFromDBPhotos: []
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
        },
        saveDataSearched: (state,action) =>{
            state.searchedPhotos = action.payload;
        },
        cleanAllImagesToSearch: (state) => {
            state.searchedPhotos = [];
        },
        getAllUserPhotosFromDB: (state, action) =>{
            state.userFromDBPhotos = action.payload;
        },
        getInfoUser: (state, action) => {
            state.loguedUser = action.payload;
        }
    }
});

export const { getAllPhotos, getAllUsers, getUserDetails, cleanUserDetails, getImageByID, saveDataSearched, cleanAllImagesToSearch, getAllUserPhotosFromDB, getInfoUser} = storageSlice.actions;
export default storageSlice.reducer;
