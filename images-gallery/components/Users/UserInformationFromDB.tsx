import { getUserPhotosOnlyFromDB } from "@/utils/redux/actions";
import { useAppDispatch, useAppSelector } from "@/utils/redux/hooks";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";

const UserInformationFromDB = ({userData} : any) => {
    const router = useRouter()
    const {id} : any = router.query;

    const userPhotos = useAppSelector((state)=> state.storageReducer.userFromDBPhotos);
    const dispatch = useAppDispatch();

    const [isClicked, setIsClicked] = useState("Fotos");
    const [visibleImageIndex, setVisibleImageIndex] = useState<number | null>(null);

    const handleMouseEnter = (index: number) => {
      setVisibleImageIndex(index);
    };
    const handleMouseLeave = () => {
        setVisibleImageIndex(null);
    };
    useEffect(()=> {
        if(userPhotos.length === 0 || !id){
            dispatch(getUserPhotosOnlyFromDB(id))
        }
    },[id])
    
    return (<>
        <div className="mt-20 w-full p-10">
            <div className="gap-5 flex p-10 mb-10 bg-gray-900 text-white shadow-2xl rounded-2xl justify-around">
                <div className="flex">
                    <Image 
                        className="h-fit rounded shadow-2xl"
                        width={150}
                        height={1080}
                        alt="user_banner"
                        src={userData.profilepic}
                    />
                </div>
                <div className="flex flex-col justify-around w-1/2">
                    <h1 className="text-3xl font-bold hover:underline">@{userData.name}</h1>
                    <h1 className="my-1 text-xl">{userData.name}</h1>
                    <h1 className="my-1">Ubicación: {userData.location? userData.location : "Sin especificar."}</h1>
                    <h1>Bio: {userData.bio? userData.bio : "Sin descripción."}</h1>
                </div>
                <div className="flex flex-col justify-around">
                    <h1>Photos: 0</h1>
                    <h1>Latest update: Sin especificar.</h1>
                </div>

            </div>
            <div className="pl-10 w-1/4 h-12 flex justify-around items-center">
                <option 
                    value="Fotos" 
                    onClick={() => setIsClicked("Fotos")} 
                    className={`${
                        isClicked === "Fotos"? "bg-gray-300" : "bg-gray-400"
                        } w-1/2 h-full flex justify-center items-center rounded-t-2xl font-bold text-xl`}>
                        Fotos
                </option>
                <option 
                    value="Videos" 
                    onClick={() => setIsClicked("Videos")} 
                    className={`${
                        isClicked === "Videos"? "bg-gray-300" : "bg-gray-400"
                        } w-1/2 h-full flex justify-center items-center rounded-t-2xl font-bold text-xl`}>
                        Videos
                </option>
            </div>
            <div className="mb-10 bg-gray-300 flex rounded-2xl shadow-2xl">
                <div className="flex flex-wrap justify-center">
                    {(isClicked === "Fotos")? (<>
                        {userPhotos.length? userPhotos.map((photo : any, index: number)=>{
                            return(
                                <div
                                    key={index}
                                    className="m-10 relative group"
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
                                            src={userData.profilepic} 
                                            alt="profilepic" 
                                            width={60}
                                            height={60}/>
                                        <div className="w-3/4 pl-5 pt-2">
                                            <h2 className="text-xl font-bold truncate hover:underline">{userData.name}</h2>
                                            <p className="text-sm">Fecha de publicación: {photo.uploaded_on.slice(0,10)}</p>
                                        </div>
                                        <div className="w-1/6 flex justify-center flex items-center select-none">
                                            <Image
                                                className="bg-gray-300 hover:bg-gray-400 p-2 rounded-xl"                                                 
                                                src="/images/descargar.png" 
                                                alt="download3" 
                                                width={40}
                                                height={40}/>
                                        </div>
                                    </div>
                                    <div
                                        onMouseEnter={() => handleMouseEnter(index)}
                                        onMouseLeave={handleMouseLeave}
                                    >
                                        <Link href={`/view/${photo._id}`}>
                                            <Image width={450} height={500} src={photo.image} alt="photo"/>
                                        </Link>
                                    </div>
                                </div>
                            )
                        }) :
                            <h1 className="p-10">No posees imágenes. ¡Sube tu primera imagen!</h1>
                        }
                    </>):(<>
                        <h1 className="p-10">Videos no disponibles.</h1>
                    </>)}
                </div>
            </div>
        </div>  
    </>    
    )
}

export default UserInformationFromDB;