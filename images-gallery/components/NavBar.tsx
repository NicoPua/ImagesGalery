import Image from "next/image";
import Link from "next/link";

const NavBar = () =>{
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
                    <p>Home</p>
                </Link>
                <Link 
                    className="hover:bg-white hover:text-black w-1/3 h-full flex justify-center items-center
                    transition-all ease-in-out duration-200"
                    href="/">
                    <p>Upload Image</p>
                </Link>
                <Link
                    className="hover:bg-white hover:text-black w-1/3 h-full flex justify-center items-center
                    transition-all ease-in-out duration-200"
                    href="/aboutme">
                    <p>About Me</p>
                </Link>
            </div>
            <div 
                className="w-1/6 rounded-xl p-2 flex justify-center items-center
                    bg-gray-700 border-2 border-white hover:bg-white hover:border-black hover:text-black
                    transition-all ease-in-out duration-200
                    ">
                <p className="font-bold text-lg">Login / Register</p>
            </div>
        </nav>
    )
}

export default NavBar;