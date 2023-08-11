export interface PhotoData{
    id: string,
    created_at: string,
    description: string,
    urls: PhotoUrls,
    links: PhotoUrls,
    likes: number,
    user: UserInformation,

    location?: LocationPhoto,
    views?: number,
    downloads?: number
}

interface PhotoUrls{
    download?: string
    full?: string,
    small?: string,
    small_s3?: string,

    fullscreen?: string
}

interface LocationPhoto{
    name: string,
    city: string,
    country: string
}

interface UserInformation{
    id: string,
    username: string,
    name: string,
    links: UserLinks,
    profile_image: object,
    social: object
}

interface UserLinks{
    [key: string]: string
}
