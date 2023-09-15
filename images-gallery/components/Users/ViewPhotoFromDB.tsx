import Image from "next/image";
import Link from "next/link";

const ViewPhotoFromDb = ({photoByID} : any) => {
    return (<>
        <div className="mt-24 w-full flex flex-col">
            <div className="flex bg-gray-900 mx-10 px-10 py-3 rounded-t-2xl text-white">
                <div className="w-1/2">
                    <div className="flex items-center">
                        <Image 
                            className="rounded-full" 
                            src={photoByID.user.profilepic} 
                            width={50} 
                            height={200} 
                            alt="user_profile_pic"
                        />
                        <Link href={`/users/${photoByID.user._id}`}>
                            <h1 className="hover:underline pl-5 font-bold text-xl">{`${photoByID.user.firstname} ${photoByID.user.lastname}`} {"("}@{photoByID.user.name}{")"} </h1>
                        </Link>
                    </div>
                </div>
                <div className="w-1/2 flex justify-end items-center">
                    <h1 className="pr-10">Uploaded on: {photoByID.uploaded_on.slice(0,10)}</h1>
                    <Link href={`${photoByID.image}`} target="_blank" rel="noopener noreferrer">
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
                <Image width={700} height={720} src={`${photoByID.image}`} alt="full_resolution_image"/>
                <div className="w-full mt-10 mb-10 flex justify-start">
                    <p className="font-bold">Description:&nbsp;&nbsp;</p><p>{photoByID.description}</p> 
                </div>      
                <div className="flex">
                    <p className="font-bold text-xl">Location:&nbsp;&nbsp;</p>
                    <p className="text-xl">{photoByID.location? photoByID.location : "Sin especificar."}</p>
                </div>                
            </div>
        </div>
    </>
    )
}

export default ViewPhotoFromDb;