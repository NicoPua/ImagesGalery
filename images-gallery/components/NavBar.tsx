import Image from "next/image";

const NavBar = () =>{
    return (
        <nav className="inset-0 z-10 w-full h-14 flex flex-row justify-around items-center shadow-xl bg-gray-900 text-gray-100">
            <div className="pointer-events-none select-none pl-5 w-1/3 flex">
                <Image
                    className="select-none" 
                    src="/images/onlylogo.png"
                    alt="onlylogo"
                    width={60}
                    height={50}    
                />
                <Image
                    className="pl-5 select-none"
                    src="/images/onlytitle.png"
                    alt="onlytitle"
                    width={200}
                    height={10}
                />
            </div>
            <div className="bg-red-900 w-1/3 flex justify-around text-lg">
                <p>Home</p>
                <p>About Me</p>
            </div>
            <div className="bg-green-900 w-1/3">
                <p>Login / Register</p>
            </div>
        </nav>
    )
}

export default NavBar;