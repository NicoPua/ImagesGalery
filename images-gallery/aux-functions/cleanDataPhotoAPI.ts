import { SinglePhotoDataAPI } from "@/aux-interfaces/auxLittleInterfaces";

const cleanDataPhotoAPI = (
    { 
        id, 
        created_at, 
        description, 
        urls: { full, small, small_s3}, 
        links: { download }, 
        user, 
        likes,
        location, 
        views, 
        downloads
    } : any ) => {
        
    const { 
        username, 
        name, 
        links: { self, portfolio, photos }, 
        profile_image, 
        social
    } = user;

    const cleanedData : SinglePhotoDataAPI = {
        id,
        uploaded_on: created_at,
        description,
        urls:{
            full_resolution: full, 
            low_resolution: small,
            download: small_s3
        },
        links: download,
        likes,
        user_profile: {
            id: user.id,
            username,
            name,
            links: { self, portfolio, photos },
            profile_image,
            social
        },
        location,
        views,
        downloads
    }
    return cleanedData;
}

export default cleanDataPhotoAPI;