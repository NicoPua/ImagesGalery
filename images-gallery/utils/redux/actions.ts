import axios from "axios";
import { cleanUserDetails, getAllPhotos, getAllUsers, getUserDetails } from "./features/storageSlice";

//ACTION CREATORS

export const getPhotos = () => {
  return async function(dispatch:any){
    try {
      const { data } = await axios.get(`http://localhost:3000/api/photos`);
      return dispatch(getAllPhotos(data));
    } catch (error:any) {
      console.log(error)
    }
  };
};

export const getUsers = () =>{
  return async function(dispatch : any){
    try {
      const { data } = await axios.get(`http://localhost:3000/api/users`);
      return dispatch(getAllUsers(data));
    } catch (error) {
      console.log(error);
    }
  }
}

export const getUserData = (userNameOrUserID : string) =>{
  return async function(dispatch: any) {
    try {
      const { data } = await axios.get(`http://localhost:3000/api/users/${userNameOrUserID}`)
      return dispatch(getUserDetails(data));
    } catch (error) {
      console.log(error);
    }
  }
}

export const cleanUserData = () =>{
  return async function (dispatch : any) {
    try {
      return dispatch(cleanUserDetails());
    } catch (error) {
      console.log(error);
    }
  }
}