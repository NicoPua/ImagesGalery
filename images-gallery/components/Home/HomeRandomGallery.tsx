"use client";
import Image from "next/image";
import { getPhotos } from "@/utils/redux/actions";
import { useAppDispatch, useAppSelector } from "@/utils/redux/hooks";
import { useEffect, useState } from "react";

const HomeRandomGallery = () =>{
    const allPhotos = useAppSelector((state)=> state.storageReducer.allPhotos)
    const dispatch = useAppDispatch();
    
    const [imageInfo, setImageInfo] = useState<any>({});
    
    const slicedPhotos = {
        firstpart: allPhotos.slice(0,3),
        secondpart: allPhotos.slice(3,7),
        thirdpart: allPhotos.slice(7,10)
    };

    useEffect(()=>{
        dispatch(getPhotos());
    },[])

    return(
        <div className="p-2">
            <div className="flex mb-10">
                <div className="pl-24 pt-20 w-1/2">
                    <h1 className="font-bold text-3xl">Fotos de stock gratuitas</h1>
                </div>
                <div className="focus:outline-none pr-24 pt-20 w-1/2 flex justify-end">
                    <select 
                        className="text-lg 
                            w-2/6 py-2 pl-4 
                            border border-gray-300 
                            hover:border-gray-700 hover:border-2
                            rounded-lg 
                            focus:outline-none focus:bg-gray-100
                            transition-all duration-300 ease-in-out
                        ">
                        <option className='bg-white' value="opcion1">Imágenes</option>
                        <option className='bg-white' value="opcion2">Videos</option>
                        <option className='bg-white' value="opcion3">Lo más nuevo</option>
                    </select>
                </div>
            </div>
            <div className="flex h-fit flex-auto justify-around ml-16 mr-16">
                <div className="w-fit h-fit">
                    {slicedPhotos.firstpart.map((image : any, index)=>{ 
                        return (<>                         
                            {imageInfo.id === image.id && (
                                <div  className="absolute bg-gradient-to-r from-gray-900 text-white"
                                    onMouseEnter={()=>setImageInfo({...image})}
                                    onMouseLeave={()=>setImageInfo({})}
                                    >
                                    <div className="flex">
                                        <Image
                                            className="ml-3 p-2 w-16 rounded-full"                                                 
                                            src={image.user_profile.profile_image.large} 
                                            alt="profilepic" 
                                            width={50}
                                            height={50}/>
                                        <div className="pl-5 pt-2">
                                            <h2 className="text-xl font-bold">Publicado por {image.user_profile.username}</h2>
                                            <p className="text-sm">Fecha de publicación: {image.uploaded_on.slice(0,10)}</p>
                                        </div>
                                    </div>
                                </div>
                            )}
                            <div className="w-fit h-fit mb-10 shadow"
                                onMouseEnter={()=>setImageInfo({...image})}
                                onMouseLeave={()=>setImageInfo({})}
                                >
                                <Image
                                    key={index}
                                    src={image.urls.full_resolution} 
                                    alt="new photo" 
                                    width={450} 
                                    height={500}
                                />
                            </div>                                            
                        </>)
                    })}
                </div>

                <div className="ml-5 mr-5">
                    {slicedPhotos.secondpart.map((image : any, index : number)=>{ 
                        return (<>
                            {imageInfo.id === image.id && (
                                <div  className="absolute bg-gradient-to-r from-gray-900 text-white"
                                    onMouseEnter={()=>setImageInfo({...image})}
                                    onMouseLeave={()=>setImageInfo({})}
                                    >
                                    <div className="flex">
                                        <Image
                                            className="ml-3 p-2 w-16 rounded-full"                                                 
                                            src={image.user_profile.profile_image.large} 
                                            alt="profilepic" 
                                            width={60}
                                            height={60}/>
                                        <div className="w-96 pl-5 pt-2">
                                            <h2 className="text-xl font-bold">Publicado por {image.user_profile.username}</h2>
                                            <p className="text-sm">Fecha de publicación: {image.uploaded_on.slice(0,10)}</p>
                                        </div>
                                    </div>
                                </div>
                            )}
                            <div className="w-fit h-fit mb-10 shadow"
                                onMouseEnter={()=>setImageInfo({...image})}
                                onMouseLeave={()=>setImageInfo({})}
                                >
                                <Image
                                    key={index}
                                    src={image.urls.full_resolution} 
                                    alt="new photo" 
                                    width={450} 
                                    height={500}
                                />
                            </div>
                        </>)
                    })}
                </div>
                <div>
                    {slicedPhotos.thirdpart.map((image: any, index: number)=>{ 
                        return (<>
                            {imageInfo.id === image.id && (
                                <div className="absolute bg-gradient-to-r from-gray-900 text-white"
                                    onMouseEnter={()=>setImageInfo({...image})}
                                    onMouseLeave={()=>setImageInfo({})}
                                    >
                                    <div className="flex">
                                        <Image
                                            className="ml-3 p-2 w-16 rounded-full"                                                 
                                            src={image.user_profile.profile_image.large} 
                                            alt="profilepic" 
                                            width={60}
                                            height={60}/>
                                        <div className="w-96 pl-5 pt-2">
                                            <h2 className="text-xl font-bold">Publicado por {image.user_profile.username}</h2>
                                            <p className="text-sm">Fecha de publicación: {image.uploaded_on.slice(0,10)}</p>
                                        </div>
                                    </div>
                                </div>
                            )}
                            <div className="w-fit h-fit mb-10 shadow transition-all duration-300 ease-in-out"
                                onMouseEnter={()=>setImageInfo({...image})}
                                onMouseLeave={()=>setImageInfo({})}
                                >
                                <Image
                                    key={index}
                                    src={image.urls.full_resolution} 
                                    alt="new photo" 
                                    width={450} 
                                    height={500}
                                />
                            </div>
                        </>)
                    })}
                </div>
            </div>
        </div>
    )
}

export default HomeRandomGallery;