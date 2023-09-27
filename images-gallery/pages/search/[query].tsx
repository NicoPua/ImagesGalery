import Paginado from "@/components/Home/Paginado";
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
    const [newSearchQuery, setNewSearchQuery] = useState("");
    const [notFounded, setNotFounded] = useState(false);

    //Paginado
    const [currentPage , setCurrentPage] = useState(1);
    const [imgsXPag] = useState(15);    
    const lastGameIndex = currentPage * imgsXPag;
    const firstGameIndex = lastGameIndex - imgsXPag;
    const currentGames = resultsFounded.length !== 0? resultsFounded.slice(firstGameIndex,lastGameIndex) : []

    //------------------
    
    
    useEffect(()=>{
        dispatch(searchPhoto(query, setNotFounded));
        return() => { 
            dispatch(cleanSearchedImages());
        }
    //eslint-disable-next-line
    },[query])

    const handleMouseEnter = (index: number) => {
        setVisibleImageIndex(index);
    };

    const handleMouseLeave = () => {
        setVisibleImageIndex(null);
    };

    const handleChange = async (event : any) =>{
        if(newSearchQuery.length !== 0){
            const pressEnter = event.key;
    
            if(pressEnter === 'Enter'){
                setNotFounded(false);
                await dispatch(cleanSearchedImages());
                router.push(`/search/${newSearchQuery}`)
            }
        }
    }

    const handleClick = async () => {
        if(newSearchQuery.length !== 0){
            setNotFounded(false);
            await dispatch(cleanSearchedImages());
            router.push(`/search/${newSearchQuery}`)
        }
      }

    return(
        <Layout title={`${query} | PicsArt Gallery`} description="Find your favorite image">
            <div className="mt-20 flex flex-col items-center">
                <div className='w-11/12 h-fit text-black flex rounded-lg'>
                    <select className='font-bold pl-2 m-2 bg-gray-200 border-2 border-gray-400 w-1/6 rounded-lg focus:outline-none focus:bg-gray-300'>
                        <option className='bg-white'>🖼️ Fotos</option>
                        {/* <option className='bg-white'>🎬 Videos</option> */}
                    </select>
                    <input 
                        onChange={(e) => setNewSearchQuery(e.target.value)}
                        onKeyDown={handleChange}
                        className='mx-5 w-4/5 h-14 font-semibold text-xl focus:outline-none'
                        placeholder={`Búsqueda: ${query}`}
                    />
                    <button onClick={handleClick} className='hover:bg-gray-100 hover:rounded-2xl'>
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
                    <Paginado currentPage={currentPage} setCurrentPage={setCurrentPage} imgsXPag={imgsXPag} totalCantImgs={resultsFounded.length} />
                    <div className="w-full h-full flex justify-center items-center flex-wrap">
                        {(notFounded)
                        ?<>
                            <h1 className="font-bold mb-10">- No se han encontrado resultados. -</h1>
                        </> : (resultsFounded.length === 0)
                        ?<>
                            <Loading />
                        </> : <>
                            {currentGames.map((image : any, index: number)=>{
                                return(
                                (image._id)?<>
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
                                                src={image.user.profilepic} 
                                                alt="profilepic" 
                                                width={60}
                                                height={60}/>
                                            <div className="w-3/4 pl-5 pt-2">
                                                <Link href={`/users/${image.user._id}`}>    
                                                    <h2 className="text-xl font-bold truncate hover:underline cursor-pointer">{image.user.name}</h2>
                                                </Link>
                                                <p className="text-sm">Fecha de publicación: {image.uploaded_on.slice(0,10)}</p>
                                            </div>
                                            <div className="w-1/6 flex justify-center flex items-center select-none">
                                                <Link href={image.image}>
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
                                            <Link href={`/view/${image._id}`}>
                                                <Image
                                                    key={index}
                                                    src={image.image} 
                                                    alt="new photo" 
                                                    width={400} 
                                                    height={500}
                                                />
                                            </Link>
                                        </div>
                                    </div>
                                </>:<>
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
                                </>)
                            })}
                        </>
                        }
                        <Paginado currentPage={currentPage} setCurrentPage={setCurrentPage} imgsXPag={imgsXPag} totalCantImgs={resultsFounded.length} />
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default SearchByName;