import { ReactNode } from "react";
import Image from "next/image";

interface BackgroundHomeProps {
    children: ReactNode;
  }

const BackgroundRegister : React.FC<BackgroundHomeProps> = ({children}) =>{
    return (
        <div className="select-none h-full">
            <Image
                className="w-full h-screen pointer-events-none"
                width={1680}
                height={1800}
                src="/images/bgRegister.jpg"
                alt="background register"
            />
            <div className="flex w-full h-screen absolute inset-0 z-0">
                {children}
            </div>
        </div>
    )
}

export default BackgroundRegister;