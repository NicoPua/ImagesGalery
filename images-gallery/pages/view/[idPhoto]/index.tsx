import Layout from "@/components/Layout";
import Image from "next/image";
import { Loading } from "@/components/Loading/loading";
import { getPhotoByID } from "@/utils/redux/actions";
import { useAppDispatch, useAppSelector } from "@/utils/redux/hooks";
import { useRouter } from "next/router";
import { useEffect } from "react";
import Link from "next/link";

const ViewImage = () =>{
    const photoByID = useAppSelector((state)=> state.storageReducer.imageDetails);
    const dispatch = useAppDispatch();
    const router = useRouter();
    const { idPhoto } : { idPhoto?: string } = router.query;

    useEffect(()=>{
        dispatch(getPhotoByID(idPhoto!))
    },[])
    return(
        <Layout title="Full Image | PicsArt Gallery" description="Full resolution image and all description about that.">
            {('_id' in photoByID)? 
                (<>
                    <h1 className="mt-16" onClick={()=> console.log(photoByID)}>Soy un botón para imagenes de la DB.</h1>
                </>)
            : ('id' in photoByID)?(<>  
                <div className="mt-24 w-full flex flex-col">
                    <div className="flex bg-gray-900 mx-10 px-10 py-3 rounded-t-2xl text-white">
                        <div className="w-1/2">
                            <div className="flex items-center">
                                <Image 
                                    className="rounded-full" 
                                    src={photoByID.user_profile.profile_image.large} 
                                    width={50} 
                                    height={200} 
                                    alt="user_profile_pic"
                                />
                                <Link href={`/users/${photoByID.user_profile.username}`}>
                                    <h1 className="hover:underline pl-5 font-bold text-xl">{photoByID.user_profile.name} {"("}@{photoByID.user_profile.username}{")"} </h1>
                                </Link>
                            </div>
                        </div>
                        <div className="w-1/2 flex justify-end items-center">
                            <h1 className="pr-10">Uploaded on: {photoByID.uploaded_on.slice(0,10)}</h1>
                            <Link href={photoByID.urls.download}>
                                <Image 
                                    className="bg-gray-600 p-3 rounded-xl hover:bg-white transition-all ease-in-out" 
                                    src="/images/descargar.png" 
                                    width={50} 
                                    height={200} 
                                    alt="download button"
                                />
                            </Link>
                        </div>
                    </div>     
                    <div className="bg-gray-300 mb-10 mr-10 ml-10 p-10 flex flex-col items-center shadow-2xl">                 
                        <Image width={700} height={720} src={photoByID.urls.full_resolution} alt="full_resolution_image"/>
                        <div className="w-full mt-10 flex justify-start">
                            <p className="font-bold">Description:&nbsp;&nbsp;</p><p>{photoByID.description}</p> 
                        </div>     
                        <div className="my-10 w-full flex justify-around bg-gray-200">
                            <div className="flex flex-col">
                                <h1 className="font-bold">Views</h1>
                                <p>{photoByID.views}</p>
                            </div>
                            <div className="flex flex-col">
                                <h1 className="font-bold">Likes</h1>
                                <p>{photoByID.likes}</p>
                            </div>
                            <div className="flex flex-col">
                                <h1 className="font-bold">Downloads</h1>
                                <p>{photoByID.views}</p>
                            </div>
                        </div>  
                        <div className="flex">
                            <p className="font-bold text-xl">Location:&nbsp;&nbsp;</p>
                            <p className="text-xl">{photoByID.location.name? photoByID.location.name : "Sin especificar."}</p>
                        </div>                
                    </div>
                </div>
            </>):(
                <Loading />
            )}
        </Layout>
    )
}

export default ViewImage;