import { PhotoData } from "../aux-interfaces/apiInterface";


const cleanAPIData = async (allPhotos: any) => {
    const filteredData = await allPhotos.map((obj : PhotoData)=>{
        return ({
            id: obj.id ,
            uploaded_on: obj.created_at ,
            description: obj.description ,
            urls: {
                full_resolution: obj.urls.full,
                low_resolution: obj.urls.small,
                download: obj.urls.small_s3
            },
            links: {
                fullscreen: obj.links.download
            },
            likes: obj.likes,
            user_profile: {
                id: obj.user.id,
                username: obj.user.username, 
                name: obj.user.name,
                links: {
                    self: obj.user.links.self,
                    portfolio: obj.user.links.portfolio,
                    photos: obj.user.links.photos
                },
                profile_image: obj.user.profile_image,
                social: obj.user.social
            },
        });
    })
    return filteredData;
}

export default cleanAPIData;