import axios from "axios";
import { cleanUserDetails, getAllPhotos, getAllUsers, getImageByID, getUserDetails } from "./features/storageSlice";

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

export const getPhotoByID = (id: string) => {
  return async function (dispatch : any) {
    try {
      const { data } = await axios.get(`http://localhost:3000/api/photos/${id}`)
      return dispatch(getImageByID(data))
    } catch (error) {
      console.log(error);
    }
  }
}

export const postNewPhotoOnDB = (formState : any) => {
  return async function () {
    try {
      const { data } = await axios.post("http://localhost:3000/api/photos",formState)
      return data;
    } catch (error : any) {
      console.log(error.response.data.error)
    }
  }
}

export const postPhotoOnCloudinary = (formData : any) => {
  return async function () {
    try {
      const data = await fetch(`https://api.cloudinary.com/v1_1/djngnnxvp/image/upload`,{
        method: 'POST',
        body: formData
      }).then((res)=> res.json());
      return data;
    } catch (error : any) {
      console.log(error);
    }
  }
}

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

export const postNewUser = (formData : any) => {
  return async function () {
    try {
      const { data } = await axios.post(`http://localhost:3000/api/users`, formData)
      return data;
    } catch (error : any) {
      console.log(error.response.data.error);
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