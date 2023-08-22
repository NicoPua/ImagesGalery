import axios from "axios";
import { getAllPhotos, getAllUsers } from "./features/storageSlice";

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