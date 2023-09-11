const cleanAllSearchedDataPhotos = (allPhotos : any) =>{
    const cleanedData : any = allPhotos.map(({id, created_at, urls: { full , small_s3 }, user: { username, profile_image: { large } }} : any)=>{
        return ({
            id,
            created_at,
            urls: {
                full_resolution: full,
                download: small_s3,
            },
            user_profile: {
                username,
                profile_image: large,
            }
        })
    })

    return [...cleanedData];
}

export default cleanAllSearchedDataPhotos;