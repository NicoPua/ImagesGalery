import Link from "next/link";
import { useState } from "react";
import Image from "next/image";

const UserInformationFromAPI = ({userData} : any) =>{
    const [isClicked, setIsClicked] = useState("Fotos");

    const [visibleImageIndex, setVisibleImageIndex] = useState<number | null>(null);

    const handleMouseEnter = (index: number) => {
      setVisibleImageIndex(index);
    };
    const handleMouseLeave = () => {
        setVisibleImageIndex(null);
    };
    
    return(<>
        <h1 className="mt-16" onClick={()=> console.log(userData)}>adasffdsdfsaa</h1>
        <div className="w-full p-10">
            <div className="gap-5 flex p-10 mb-10 bg-gray-900 text-white shadow-2xl rounded-2xl justify-around">
                <div className="flex">
                    <Image 
                        className="h-fit rounded shadow-2xl"
                        width={150}
                        height={1080}
                        alt="user_banner"
                        src={userData.profile_image.large}
                    />
                </div>
                <div className="flex flex-col justify-around w-1/2">
                    <Link target="_blank" rel="noopener noreferrer" className="w-fit hover:underline" href={`${userData.link}`}>
                        <h1 className="text-2xl">@{userData.username}</h1>
                    </Link>
                    <h1 className="my-1">{userData.name}</h1>
                    <h1 className="my-1">Ubicación: {userData.location}</h1>
                    <h1>Bio: {userData.bio}</h1>
                </div>
                <div className="flex flex-col justify-around">
                    <h1>Photos: {userData.total_photos}</h1>
                    <h1>Total Likes: {userData.total_likes}</h1>
                    <h1>Downloads: {userData.downloads}</h1>
                    <h1>Latest update: {userData.updated_at?.slice(0,10)}</h1>
                </div>
                <div className="bg-white p-2 flex flex-col justify-around items-center rounded shadow-2xl">
                    <Link href={`${userData.link}`}
                        target="_blank" rel="noopener noreferrer">
                        <Image 
                            className="transition-all ease-out duration-300 transform hover:scale-125"
                            width={30} 
                            height={40} 
                            src="/images/file.png" 
                            alt="personal page"
                        />
                    </Link>

                    <Link href={`${userData.social.portfolio_url}`}
                        target="_blank" rel="noopener noreferrer">
                        <Image
                            className="transition-all ease-out duration-300 transform hover:scale-125"
                            width={30} 
                            height={40} 
                            src="/images/portfolio.png" 
                            alt="porfolio" 
                        />
                    </Link>

                    <Link href={`https://www.instagram.com/${userData.social.instagram_username}/`}
                        target="_blank" rel="noopener noreferrer">
                        <Image 
                            className="transition-all ease-out duration-300 transform hover:scale-125"
                            width={30} 
                            height={40} 
                            src="/images/instagram.png" 
                            alt="instagram"
                        />
                    </Link>

                    <Link href={`https://twitter.com/${userData.social.twitter_username}`}
                        target="_blank" rel="noopener noreferrer">
                        <Image 
                            className="transition-all ease-out duration-300 transform hover:scale-125"
                            width={30} 
                            height={40} 
                            src="/images/twitter.png" 
                            alt="twitter"
                        />
                    </Link>
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
                        {userData.photos.map((image : any, index: number)=>{
                            return (<>
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
                                        src={userData.profile_image.large} 
                                        alt="profilepic" 
                                        width={60}
                                        height={60}/>
                                    <div className="w-3/4 pl-5 pt-2">
                                        <h2 className="text-xl font-bold truncate hover:underline">{userData.username}</h2>
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
                                <div
                                    onMouseEnter={() => handleMouseEnter(index)}
                                    onMouseLeave={handleMouseLeave}
                                >
                                    <Image width={450} height={500} src={image.urls.full_resolution} alt="photo"/>
                                </div>
                            </div>
                            </>)
                        })}
                    </>):(<>
                        <h1>Faltan agregar videos</h1>
                    </>)}
                </div>
            </div>
        </div>  
    </>)
}

export default UserInformationFromAPI;