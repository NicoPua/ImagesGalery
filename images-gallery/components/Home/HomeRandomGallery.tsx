"use client";
import Image from "next/image";
import Link from "next/link";
import { getPhotos } from "@/utils/redux/actions";
import { useAppDispatch, useAppSelector } from "@/utils/redux/hooks";
import { useEffect, useState } from "react";
import { Loading } from "../Loading/loading";

const HomeRandomGallery = () =>{
    const allPhotos = useAppSelector((state)=> state.storageReducer.allPhotos)
    const dispatch = useAppDispatch();
    
    const slicedPhotos = {
        firstpart: allPhotos.slice(0,3),
        secondpart: allPhotos.slice(3,6),
        thirdpart: allPhotos.slice(6,9),
        lastpic: allPhotos.slice(9,10)
    };

    const [visibleImgFirstCol, setVisibleImgFirstCol] = useState<number | null>(null);
    const [visibleImgSecondCol, setVisibleImgSecondCol] = useState<number | null>(null);
    const [visibleImgThirdCol, setVisibleImgThirdCol] = useState<number | null>(null);
    const [lastpicImg, setLastpicImg] = useState<number | null>(null);

    const handleMouseLeave = () => {
        setVisibleImgFirstCol(null);
        setVisibleImgSecondCol(null);
        setVisibleImgThirdCol(null);
        setLastpicImg(null);
    };

    useEffect(()=>{
        dispatch(getPhotos());
    },[])

    return(
        <div className="p-2">
            {(allPhotos.length === 0)?<>
                <Loading/>
            </>:<>
            <div className="flex mb-10">
                <div className="pl-16 pt-20 w-1/2">
                    <h1 className="font-bold text-3xl">Fotos de stock gratuitas</h1>
                </div>
                <div className="focus:outline-none pr-16 pt-20 w-1/2 flex justify-end">
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
                
                {/* COLUMNA 1 */}
                <div className="w-fit h-fit">
                    {slicedPhotos.firstpart.map((image : any, index)=>{ 
                        return (<>
                            <div
                                key={index}
                                className="relative group"
                                onMouseEnter={() => setVisibleImgFirstCol(index)}
                                onMouseLeave={handleMouseLeave}
                            >
                                <div
                                    onMouseEnter={() => setVisibleImgFirstCol(index)}
                                    onMouseLeave={handleMouseLeave}
                                    className={`${
                                        visibleImgFirstCol === index ? "" : "invisible"
                                    } w-full absolute flex text-white bg-gradient-to-r from-gray-900`}
                                >
                                    <Image
                                        className="p-2 w-16 rounded-full pointer-events-none"                                               
                                        src={image.user_profile.profile_image.large} 
                                        alt="profilepic" 
                                        width={60}
                                        height={60}/>
                                    <div className="w-3/4 pl-5 pt-2">
                                        <Link href={`/users/${image.user_profile.username}`}>    
                                            <h2 className="text-xl font-bold truncate hover:underline cursor-pointer">{image.user_profile.username}</h2>
                                        </Link>
                                        <p className="text-sm">Fecha de publicación: {image.uploaded_on.slice(0,10)}</p>
                                    </div>
                                    <div className="w-1/6 flex justify-center flex items-center select-none">
                                        <Link href={image.urls.download}>
                                            <Image
                                                className="bg-gray-300 hover:bg-gray-400 p-2 rounded-xl"                                                 
                                                src="/images/descargar.png" 
                                                alt="download3" 
                                                width={40}
                                                height={40}/>
                                        </Link>
                                    </div>
                                </div>
                                <div className="w-fit h-fit mb-10 shadow-2xl"
                                    onMouseEnter={() => setVisibleImgFirstCol(index)}
                                    onMouseLeave={handleMouseLeave}
                                    >
                                    <Link href={`/view/${image.id}`}>
                                        <Image
                                            key={index}
                                            src={image.urls.full_resolution} 
                                            alt="new photo" 
                                            width={450} 
                                            height={500}
                                        />
                                    </Link>
                                </div>
                            </div>
                        </>)
                    })}
                </div>
                
                {/* COLUMNA 2 */}
                <div className="ml-3 mr-3">
                    {slicedPhotos.secondpart.map((image : any, index : number)=>{ 
                        return (<>
                            <div
                                key={index}
                                className="relative group"
                                onMouseEnter={() => setVisibleImgSecondCol(index)}
                                onMouseLeave={handleMouseLeave}
                            >
                                <div
                                    onMouseEnter={() => setVisibleImgSecondCol(index)}
                                    onMouseLeave={handleMouseLeave}
                                    className={`${
                                        visibleImgSecondCol === index ? "" : "invisible"
                                    } w-full absolute flex text-white bg-gradient-to-r from-gray-900`}
                                >
                                    <Image
                                        className="p-2 w-16 rounded-full pointer-events-none"                                               
                                        src={image.user_profile.profile_image.large} 
                                        alt="profilepic" 
                                        width={60}
                                        height={60}/>
                                    <div className="w-3/4 pl-5 pt-2">
                                        <Link href={`/users/${image.user_profile.username}`}>    
                                            <h2 className="text-xl font-bold truncate hover:underline cursor-pointer">{image.user_profile.username}</h2>
                                        </Link>
                                        <p className="text-sm">Fecha de publicación: {image.uploaded_on.slice(0,10)}</p>
                                    </div>
                                    <div className="w-1/6 flex justify-center flex items-center select-none">
                                        <Link href={image.urls.download}>
                                            <Image
                                                className="bg-gray-300 hover:bg-gray-400 p-2 rounded-xl"                                                 
                                                src="/images/descargar.png" 
                                                alt="download3" 
                                                width={40}
                                                height={40}/>
                                        </Link>
                                    </div>
                                </div>
                                <div className="w-fit h-fit mb-10 shadow-2xl"
                                    onMouseEnter={() => setVisibleImgSecondCol(index)}
                                    onMouseLeave={handleMouseLeave}
                                    >
                                    <Link href={`/view/${image.id}`}>
                                        <Image
                                            key={index}
                                            src={image.urls.full_resolution} 
                                            alt="new photo" 
                                            width={450} 
                                            height={500}
                                        />
                                    </Link>
                                </div>
                            </div>
                        </>)
                    })}
                </div>

                {/* COLUMNA 3 */}
                <div>
                    {slicedPhotos.thirdpart.map((image: any, index: number)=>{ 
                        return (<>
                            <div
                                key={index}
                                className="relative group"
                                onMouseEnter={() => setVisibleImgThirdCol(index)}
                                onMouseLeave={handleMouseLeave}
                            >
                                <div
                                    onMouseEnter={() => setVisibleImgThirdCol(index)}
                                    onMouseLeave={handleMouseLeave}
                                    className={`${
                                        visibleImgThirdCol === index ? "" : "invisible"
                                    } w-full absolute flex text-white bg-gradient-to-r from-gray-900`}
                                >
                                    <Image
                                        className="p-2 w-16 rounded-full pointer-events-none"                                               
                                        src={image.user_profile.profile_image.large} 
                                        alt="profilepic" 
                                        width={60}
                                        height={60}/>
                                    <div className="w-3/4 pl-5 pt-2">
                                        <Link href={`/users/${image.user_profile.username}`}>    
                                            <h2 className="text-xl font-bold truncate hover:underline cursor-pointer">{image.user_profile.username}</h2>
                                        </Link>
                                        <p className="text-sm">Fecha de publicación: {image.uploaded_on.slice(0,10)}</p>
                                    </div>
                                    <div className="w-1/6 flex justify-center flex items-center select-none">
                                        <Link href={image.urls.download}>
                                            <Image
                                                className="bg-gray-300 hover:bg-gray-400 p-2 rounded-xl"                                                 
                                                src="/images/descargar.png" 
                                                alt="download3" 
                                                width={40}
                                                height={40}/>
                                        </Link>
                                    </div>
                                </div>
                                <div className="w-fit h-fit mb-10 shadow-2xl"
                                    onMouseEnter={() => setVisibleImgThirdCol(index)}
                                    onMouseLeave={handleMouseLeave}
                                    >
                                    <Link href={`/view/${image.id}`}>
                                        <Image
                                            key={index}
                                            src={image.urls.full_resolution} 
                                            alt="new photo" 
                                            width={450} 
                                            height={500}
                                        />
                                    </Link>
                                </div>
                            </div>
                        </>)
                    })}
                </div>
            </div>
            <div className="m-10 mr-16 ml-16 flex justify-around bg-gradient-to-b from-gray-400 rounded-2xl">
                <div className="m-10 w-1/2">
                    <div className="flex h-16 items-center select-none">
                        <Image className="pointer-events-none select-none" width={100} height={100} src="/images/onlylogo.png" alt="logopng"/>
                        <p className="pl-5 text-3xl font-bold">PicsArt Gallery</p>
                    </div>
                    <p className="text-xl mt-10 font-semibold">PicsArt Gallery es una aplicación web destinada a almacenar, descargar imágenes y videos libres de uso. 
                        <br/><br/>¡Puedes registrarte o iniciar sesión para subir, descargar y gestionar 
                        tu material visual tanto de imagen como de video!
                    </p>
                </div>
                <div className="mt-10">
                {slicedPhotos.lastpic.map((image : any, index: number)=>{
                    return(<>
                        <div
                                key={index}
                                className="relative group"
                                onMouseEnter={() => setLastpicImg(index)}
                                onMouseLeave={handleMouseLeave}
                            >
                                <div
                                    onMouseEnter={() => setLastpicImg(index)}
                                    onMouseLeave={handleMouseLeave}
                                    className={`${
                                        lastpicImg === index ? "" : "invisible"
                                    } w-full absolute flex text-white bg-gradient-to-r from-gray-900`}
                                >
                                    <Image
                                        className="p-2 w-16 rounded-full pointer-events-none"                                               
                                        src={image.user_profile.profile_image.large} 
                                        alt="profilepic" 
                                        width={60}
                                        height={60}/>
                                    <div className="w-3/4 pl-5 pt-2">
                                        <Link href={`/users/${image.user_profile.username}`}>    
                                            <h2 className="text-xl font-bold truncate hover:underline cursor-pointer">{image.user_profile.username}</h2>
                                        </Link>
                                        <p className="text-sm">Fecha de publicación: {image.uploaded_on.slice(0,10)}</p>
                                    </div>
                                    <div className="w-1/6 flex justify-center flex items-center select-none">
                                        <Link href={image.urls.download}>
                                            <Image
                                                className="bg-gray-300 hover:bg-gray-400 p-2 rounded-xl"                                                 
                                                src="/images/descargar.png" 
                                                alt="download3" 
                                                width={40}
                                                height={40}/>
                                        </Link>
                                    </div>
                                </div>
                                <div className="w-fit h-fit mb-10 shadow-2xl"
                                    onMouseEnter={() => setLastpicImg(index)}
                                    onMouseLeave={handleMouseLeave}
                                    >
                                    <Link href={`/view/${image.id}`}>
                                        <Image
                                            key={index}
                                            src={image.urls.full_resolution} 
                                            alt="new photo" 
                                            width={450} 
                                            height={500}
                                        />
                                    </Link>
                                </div>
                            </div>
                    </>)
                })}  
                </div>
            </div>
            </>}
        </div>
    )
}

export default HomeRandomGallery;