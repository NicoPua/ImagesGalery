"use client";
import Image from "next/image";
import { getPhotos } from "@/utils/redux/actions";
import { useAppDispatch, useAppSelector } from "@/utils/redux/hooks";
import { useEffect } from "react";

const HomeRandomGallery = () =>{
    const allPhotos = useAppSelector((state)=> state.storageReducer.allPhotos)
    const dispatch = useAppDispatch();

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
            <div className="flex flex-wrap flex-auto pl-20 pr-24">
                {allPhotos.map((photo : any)=> {
                    return (<>
                        <div className="w-fit h-fit m-3 bg-red-900">
                            {photo.urls?<>
                                <Image src={photo.urls.full_resolution} alt="newphoto" width={460} height={500} /> 
                            </>:<></>
                            }
                                                       
                        </div>
                    </>)
                })}
            </div>
        </div>
    )
}

export default HomeRandomGallery;