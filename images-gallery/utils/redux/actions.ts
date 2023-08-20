import axios from "axios";
import { getAllUsers } from "./features/storageSlice";

const { LOCAL_URL } = process.env; 

export const getUsers = () => {
  return async function(dispatch:any){
    try {
        const response = await axios.get(`${LOCAL_URL}/api/users`);
        return dispatch(getAllUsers(response.data));
    } catch (error:any) {
        console.log(error)
    }
  };
};