import axios from "axios"
import cleanUserDataFromAPI from "./cleanUserDataFromAPI";

export const getUserById = async (username: string) =>{
    const { UNSPLASH_ACCESS_KEY } = process.env;
    
    const userData = (await axios.get(`https://api.unsplash.com/users/${username}/?client_id=${UNSPLASH_ACCESS_KEY}`)).data;
    const userPhotos = (await axios.get(`https://api.unsplash.com/users/${username}/photos/?client_id=${UNSPLASH_ACCESS_KEY}`)).data;
    
    const cleanedUserInformation = cleanUserDataFromAPI(userData, userPhotos);
    return cleanedUserInformation;
}