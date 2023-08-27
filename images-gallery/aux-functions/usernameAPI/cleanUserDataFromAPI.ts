interface UserDataInterface{
    id: string,
    updated_at: string, 
    username: string, 
    name: string, 
    bio: string, 
    location: string, 
    link: StringInterface, 
    profile_image: StringInterface,
    total_likes: number, 
    total_photos: number, 
    social: StringInterface, 
    photos: PhotosInterface[], 
    downloads: number
}

interface StringInterface{
    [key : string]: string | null
}

interface PhotosInterface{
    [key : string]: string
}

const cleanUserDataFromAPI = ({ 
    id, 
    updated_at, 
    username, 
    name, 
    bio, 
    location, 
    links: { html }, 
    profile_image, 
    total_likes, 
    total_photos, 
    social, 
    photos, 
    downloads
} : any, userPhotos : any) =>{

    const filteredPhotosByUser = photos.map(({ id, created_at, updated_at, urls: { full , small_s3}}: any)=>{
        return {
            id,
            created_at,
            updated_at,
            urls: {
                full_resolution: full,
                download: small_s3
            }
        }
    })

    const allPhotosByUser = userPhotos.map(({
        id,
        created_at,
        updated_at,
        description,
        urls: {
            full,
            small_s3
        },
        links: {
            html,
            download
        }
    }: any) => {

        return {
            id,
            created_at,
            updated_at,
            description,
            urls: {
                full_resolution: full,
                download: small_s3
            },
            links: {
                page: html,
                download
            }
        }
    })

    const newUserData : UserDataInterface = { 
        id, 
        updated_at, 
        username, 
        name, 
        bio, 
        location, 
        link: html, 
        profile_image,
        total_likes, 
        total_photos, 
        social, 
        photos: [...filteredPhotosByUser, ...allPhotosByUser], 
        downloads
    };
    
    
    return newUserData;
}

export default cleanUserDataFromAPI;