import axios from "axios";
import { cleanAllImagesToSearch, cleanImageDetail, cleanUserDetails, getAllPhotos, getAllUserPhotosFromDB, getAllUsers, getImageByID, getInfoUser, getUserDetails, saveDataSearched } from "./features/storageSlice";

//ACTION CREATORS

export const getPhotos = () => {
  return async function(dispatch:any){
    try {
      const { data } = await axios.get(`http://localhost:3000/api/photos`);
      return await dispatch(getAllPhotos(data));
    } catch (error:any) {
      console.log(error)
    }
  };
};

export const getPhotoByID = (id: string) => {
  return async function (dispatch : any) {
    try {
      const { data } = await axios.get(`http://localhost:3000/api/photos/${id}`)
      return await dispatch(getImageByID(data))
    } catch (error) {
      console.log(error);
    }
  }
}

export const clearImageDetails = () =>{
  return async function (dispatch: any) {
    try {
      return await dispatch(cleanImageDetail())
    } catch (error : any) {
      console.log(error.message);
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

export const getLoguedUserInfo = (user : any) => {
  return async function (dispatch : any) {
    try {
      const { data } = await axios.get(`http://localhost:3000/api/users?email=${user.email}`)
      if(data.googleEmail){
        const today = new Date;
        const cleanedDate = today.toString().split(' ');

        const googleNameArray = user.name.split(' ');
        const defaultUserData = { 
          name: user.name.trim(), 
          firstname: googleNameArray[0]? googleNameArray[0] : "Undefined", 
          lastname: googleNameArray[1]? googleNameArray[1] : "Undefined", 
          password: user.name.trim(), 
          email: user.email, 
          birthdate: `${cleanedDate[1]}-${cleanedDate[2]}-${cleanedDate[3]}`,
          profilepic: user.image,
          googleLogin: true
        }
        const userPosted = await dispatch(postNewUser(defaultUserData));
        return await dispatch(getInfoUser(userPosted))
      }else{
        return await dispatch(getInfoUser(data))
      }
    } catch (error : any) {
      console.log(error.message);
    }
  }
}

export const getUsers = () =>{
  return async function(dispatch : any){
    try {
      const { data } = await axios.get(`http://localhost:3000/api/users`);
      return await dispatch(getAllUsers(data));
    } catch (error:any) {
      console.log(error.message);
    }
  }
}

export const getUserPhotosOnlyFromDB = (idUser : string) =>{
  return async function (dispatch: any) {
    try {
      const { data } = await axios.get(`http://localhost:3000/api/photos?idUser=${idUser}`)
      const filterData = await data.filter((photo : any)=> photo.hidden === false );
      return await dispatch(getAllUserPhotosFromDB(filterData))
    } catch (error:any) {
      console.log(error.message);
    }
  }
}

export const getUserData = (userNameOrUserID : string) =>{
  return async function(dispatch: any) {
    try {
      const { data } = await axios.get(`http://localhost:3000/api/users/${userNameOrUserID}`)
      return await dispatch(getUserDetails(data));
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

export const putUserProfile = (id: string, formData : any) => {
  return async function () {
    try {
      const { data } = await axios.put(`http://localhost:3000/api/users/${id}`,formData)
      return data;
    } catch (error : any) {
      console.log(error.message);
    }
  }
}

export const cleanUserData = () =>{
  return async function (dispatch : any) {
    try {
      return await dispatch(cleanUserDetails());
    } catch (error) {
      console.log(error);
    }
  }
}

export const searchPhoto = (textToSearch: any) => {
  return async function (dispatch : any) {
    try {
      const { data } = await axios.get(`http://localhost:3000/api/search?data=${textToSearch}`)
      return await dispatch(saveDataSearched(data))
    } catch (error) {
      console.log(error);
    }
  }
}

export const cleanSearchedImages = () =>{
  return async function (dispatch : any) {
    return await dispatch(cleanAllImagesToSearch());
  }
}