import React, { ReactNode } from 'react';
import Image from 'next/image';

interface BackgroundHomeProps {
  children: ReactNode;
}

const BackgroundHome : React.FC<BackgroundHomeProps> = ({ children }) => {
    return (
        <div className="select-none text-white shadow-2xl ">
            <Image
            className='pointer-events-none'
                src="/images/homebackground.jpg"
                alt="Background Image"
                width={1680}
                height={1200}
                style={{ height: '40rem' }}
            />
            <div 
                className='flex justify-center items-center pt-10 absolute inset-0 z-0 bg-opacity-50 bg-gray-900'
                style={{ height: '40rem' }}>
                { children }
            </div>
        </div>
    )
}

export default BackgroundHome;