import Layout from "@/components/Layout";
import { Loading } from "@/components/Loading/loading";
import { cleanSearchedImages, searchPhoto } from "@/utils/redux/actions";
import { useAppDispatch, useAppSelector } from "@/utils/redux/hooks";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const SearchByName = () =>{
    const resultsFounded = useAppSelector((state)=> state.storageReducer.searchedPhotos)
    const dispatch = useAppDispatch();
    const router = useRouter();
    const {query} = router.query;
    
    const [visibleImageIndex, setVisibleImageIndex] = useState<number | null>(null);

    const handleMouseEnter = (index: number) => {
        setVisibleImageIndex(index);
      };
      const handleMouseLeave = () => {
          setVisibleImageIndex(null);
      };

    useEffect(()=>{
        dispatch(searchPhoto(query));
        return() => { 
            dispatch(cleanSearchedImages());
        }
    },[])

    return(
        <Layout title={`${query} | PicsArt Gallery`} description="Find your favorite image">
            <div className="mt-20 flex flex-col items-center">
                <div className='w-11/12 h-fit text-black flex rounded-lg'>
                    <select className='font-bold pl-2 m-2 bg-gray-200 border-2 border-gray-400 w-1/6 rounded-lg focus:outline-none focus:bg-gray-300'>
                        <option className='bg-white'>🖼️ Fotos</option>
                        {/* <option className='bg-white'>🎬 Videos</option> */}
                    </select>
                    <input 
                        className='mx-5 w-4/5 h-14 font-semibold text-xl focus:outline-none'
                        placeholder={`Búsqueda: ${query}`}
                    />
                    <button className='hover:bg-gray-100 hover:rounded-2xl'>
                    <Image
                        className='p-3 h-14 pointer-events-none'
                        src="/images/lupa.png"
                        alt="Search images"
                        width={60}
                        height={15}
                    />
                    </button>
                </div>
                <div className="mt-10 mb-10 w-11/12 flex flex-col justify-center items-center bg-gray-300 rounded-2xl shadow-2xl">
                    <h1 className="text-xl font-semibold my-5">Resultados encontrados de {`'${query}' (${resultsFounded?.length})`}</h1>

                    <div className="w-full h-full flex justify-center items-center flex-wrap">
                        {resultsFounded.length === 0 
                        ?<>
                            <Loading />
                        </>:<>
                            {resultsFounded.map((image : any, index: number)=>{
                                return(
                                    <div
                                        key={index}
                                        className="relative group m-1"
                                        onMouseEnter={() => handleMouseEnter(index)}
                                        onMouseLeave={handleMouseLeave}
                                    >
                                        <div
                                            onMouseEnter={() => handleMouseEnter(index)}
                                            onMouseLeave={handleMouseLeave}
                                            className={`${
                                                visibleImageIndex === index ? "" : "invisible"
                                            } w-full absolute flex text-white bg-gradient-to-r from-gray-900`}
                                        >
                                            <Image
                                                className="p-2 w-16 rounded-full pointer-events-none"                                               
                                                src={image.user_profile.profile_image} 
                                                alt="profilepic" 
                                                width={60}
                                                height={60}/>
                                            <div className="w-3/4 pl-5 pt-2">
                                                <Link href={`/users/${image.user_profile.username}`}>    
                                                    <h2 className="text-xl font-bold truncate hover:underline cursor-pointer">{image.user_profile.username}</h2>
                                                </Link>
                                                <p className="text-sm">Fecha de publicación: {image.created_at.slice(0,10)}</p>
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
                                            onMouseEnter={() => handleMouseEnter(index)}
                                            onMouseLeave={handleMouseLeave}
                                            >
                                            <Link href={`/view/${image.id}`}>
                                                <Image
                                                    key={index}
                                                    src={image.urls.full_resolution} 
                                                    alt="new photo" 
                                                    width={400} 
                                                    height={500}
                                                />
                                            </Link>
                                        </div>
                                    </div>
                                )
                            })

                            }
                        </>
                        }
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default SearchByName;