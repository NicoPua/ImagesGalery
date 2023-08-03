interface photoData{
    id: string,
    created_at: string,
    description: string,
    urls: object,
    links: object,
    likes: number,
    user: object
}

const cleanAPIData = async (allPhotos: any) => {
    const filteredData = await allPhotos.map((obj : photoData)=>{
        return ({
            id: obj.id ,
            created_at: obj.created_at ,
            description: obj.description ,
            urls: obj.urls,
            links: obj.links,
            likes: obj.likes,
            user: obj.user,
        });
    })
    return filteredData;
}

export default cleanAPIData;