import axios from "axios";
import { getAllPhotos } from "./features/storageSlice";

export const getPhotos = () => {
  return async function(dispatch:any){
    try {
        const response = await axios.get(`http://localhost:3000/api/photos`);
        return dispatch(getAllPhotos(response.data));
    } catch (error:any) {
        console.log(error)
    }
  };
};