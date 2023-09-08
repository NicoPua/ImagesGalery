import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { Box } from "@chakra-ui/react";
import { useState } from "react";

const NavBar = () =>{
    const { data } = useSession();
    const user = data?.user;
    
    const [isClicked, setIsClicked] = useState(false);

    const showOptions = () =>{
        setIsClicked(prevIsClicked => !prevIsClicked)
        console.log(isClicked);
        
    }

    return (
        <nav className="inset-0 z-10 w-full h-14 flex flex-row justify-around items-center shadow-xl bg-gray-900 text-gray-100">
            <div className="select-none pl-5 w-1/3 flex items-center"> 
                <Link href="/">
                    <Image 
                        className="select-none"
                        src="/images/onlylogo.png"
                        alt="onlylogo"
                        width={60}
                        height={50}    
                    />
                </Link>
                <Link href="/">
                    <Image
                        className="pl-5 select-none"
                        src="/images/onlytitle.png"
                        alt="onlytitle"
                        width={200}
                        height={10}
                    />
                </Link>
            </div>
            <div className="w-1/3 h-full flex text-lg">
                <Link 
                    className="hover:bg-white hover:text-black w-1/3 h-full flex justify-center items-center
                    transition-all ease-in-out duration-200" 
                    href="/">
                    <p className="font-semibold">Home</p>
                </Link>
                <Link 
                    className="hover:bg-white hover:text-black w-1/3 h-full flex justify-center items-center
                    transition-all ease-in-out duration-200"
                    href="/uploadphoto">
                    <p className="font-semibold">Upload Image</p>
                </Link>
                <Link
                    className="hover:bg-white hover:text-black w-1/3 h-full flex justify-center items-center
                    transition-all ease-in-out duration-200"
                    href="/aboutme">
                    <p className="font-semibold">About</p>
                </Link>
            </div>
            {user?<>
                <div onClick={showOptions} className="cursor-pointer flex justify-around items-center w-40">
                    <Image width={40} height={100} src={user.image!} alt="userpic" className="rounded"/>
                    <p className="text-sm font-semibold">{user.name}</p>
                    
                    {isClicked?<>
                        <Image width={20} height={20} src="/images/ArrowUp.png" alt="UpArrow"/>
                        <div className="flex flex-col bg-white mt-44 w-40 absolute bg-white text-black border-black border-r-2 border-b-2 border-l-2">
                            <div className="flex items-center hover:bg-gray-500 hover:text-white">
                                <Image className="p-2" width={40} height={10} src="/images/user.png" alt="user image"/>
                                <Link href="/userprofile" className="text-sm py-2 pl-3">My Profile</Link>
                            </div>
                            <div className="flex items-center hover:bg-gray-500 hover:text-white">
                                <Image className="p-2" width={40} height={10} src="/images/editprofile.png" alt="edit profile"/>
                                <Link href="/editprofile" className="text-sm py-2 pl-3">Edit Profile</Link>
                            </div>
                            <div className="flex items-center hover:bg-red-400 hover:text-white">
                                <Image className="p-2" width={40} height={10} src="/images/logout.png" alt="Log out"/>
                                <Link href="/logout" className="text-sm py-2 pl-3">Log Out</Link>
                            </div>
                        </div>
                    </>:<>   
                        <Image width={20} height={20} src="/images/ArrowDown.png" alt="DownArrow"/>
                    </>}
                </div>
            </>:<>
                <div 
                    className="w-1/6 rounded-xl p-1 flex justify-center items-center
                        bg-gray-700 border-2 border-white hover:bg-white hover:border-black hover:text-black
                        transition-all ease-in-out duration-200
                        ">
                    <Link href="/users/login">
                        <p className="font-bold text-lg w-full">Login / Register</p>
                    </Link>
                </div>
            </>}
        </nav>
    )
}

export default NavBar;