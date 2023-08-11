import { PhotoData } from "@/aux-interfaces/apiInterface";

const cleanedDataRandomPic = (
    { 
        id, 
        created_at, 
        description, 
        urls: { 
            full, 
            small, 
            small_s3
        }, 
        links: { 
            download 
        }, 
        likes, 
        user, 
        location, 
        views, 
        downloads 
    } : PhotoData ) =>{

    const filteredData : PhotoData = {
        id, 
        created_at,
        description,
        urls: { full, small, small_s3 },
        links: { fullscreen: download },
        likes,
        user: {
            id: user.id,
            username: user.username, 
            name: user.name,
            links: {
                self: user.links.self,
                portfolio: user.links.portfolio,
                photos: user.links.photos
            },
            profile_image: user.profile_image,
            social: user.social
        },
        location,
        views,
        downloads
    }

    return filteredData;
}

export default cleanedDataRandomPic;