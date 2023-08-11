export interface errorInfo{
    message: string,
}
//------------------------------------------------------------------------
export interface SinglePhotoDataAPI{
    id: string, 
    uploaded_on: string,
    description: string,
    urls: UrlsPhotoInterface,
    links: string, 
    likes: number,
    user_profile: UserInterface,
    location: object,
    views: number,
    downloads: number
}

interface UrlsPhotoInterface{
    full_resolution: string,
    low_resolution: string,
    download: string,
}

interface UserInterface{
    id: string, 
    username: string,
    name: string, 
    links: object,
    profile_image: string,
    social: object
}