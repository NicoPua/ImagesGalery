import Image from 'next/image'
import Layout from '@/components/Layout'
import BackgroundHome from '@/components/BackgroundHome'
import HomeRandomGallery from '@/components/Home/HomeRandomGallery'
import { getUsers } from "@/utils/redux/actions";
import { useEffect } from "react";
import { useAppDispatch } from '@/utils/redux/hooks';


export default function Home() {
  const dispatch = useAppDispatch();

  useEffect(()=>{
    dispatch(getUsers());
  },[])

  return (
    <Layout title='Home | Images-Gallery' description='App de Imagenes'>
      <BackgroundHome>
        <div className='w-1/2 h-3/5 select-none flex flex-col justify-around'>
          <h1 className="font-bold text-4xl w-3/4">
            Busca tus imágenes gratis, libres de uso, rápido y descárgalo. 
            <br/>Postea las imágenes que desees.
          </h1>
          <div className='w-full h-fit text-black flex rounded-lg bg-white'>
            <select className='font-bold pl-2 m-2 bg-gray-200 border-2 border-gray-400 w-1/6 rounded-lg focus:outline-none focus:bg-gray-300'>
              <option className='bg-white'>🖼️ Fotos</option>
              <option className='bg-white'>🎬 Videos</option>
            </select>
            <input 
              className='mx-5 w-4/5 h-14 font-semibold text-xl focus:outline-none'
              placeholder='Busca fotos o imagenes gratis'
              />
            <button className='hover:bg-gray-100 hover:rounded-2xl'>
              <Image
                className='p-3 h-14 pointer-events-none'
                src="/images/lupa.png"
                alt="Search images"
                width={60}
                height={15}
              />
            </button>
          </div>

          <div className='font-bold'>
            <h1 className='text-gray-300'>Tendencias: </h1>
          </div>
        </div>
      </BackgroundHome>
      <HomeRandomGallery />
    </Layout>
  )
}
