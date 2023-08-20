"use client";
import { useAppDispatch, useAppSelector } from "@/utils/redux/hooks";
import { getPhotos } from "@/utils/redux/actions";
import { useEffect } from "react";

const HomeRandomGallery = () =>{
    const count = useAppSelector((state)=> state.storageReducer.allPhotos)
    const dispatch = useAppDispatch();

    useEffect(()=>{
        dispatch(getPhotos());
    },[])

    const mostrar = () =>{
        dispatch(getPhotos());
        console.log(count)
    }
    return(
        <div className="p-2">
            <div className="flex">
                <div className="pl-32 pt-20 w-1/2">
                    <h1 className="font-bold text-3xl">Fotos de stock gratuitas</h1>
                </div>
                <div className="focus:outline-none pr-32 pt-20 w-1/2 flex justify-end">
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
            <div>
                <button onClick={mostrar}>asdasd</button>
                {count.length}
            </div>
        </div>
    )
}

export default HomeRandomGallery;