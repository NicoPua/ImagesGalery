import Image from 'next/image'
import Layout from '@/components/Layout'
import BackgroundHome from '@/components/Home/BackgroundHome'
import HomeRandomGallery from '@/components/Home/HomeRandomGallery'
import { getUsers } from "@/utils/redux/actions";
import { useEffect } from "react";
import { useAppDispatch } from '@/utils/redux/hooks';
import { useState } from "react";
import { useRouter } from 'next/router';

export default function Home() {
  const dispatch = useAppDispatch();
  const [queryToSearch, setQueryToSearch] = useState("");
  const router = useRouter();

  useEffect(()=>{
    dispatch(getUsers());
  },[])

  const handlePressEnter = (event : any) =>{
    if(queryToSearch.length !== 0){
      const pressEnter = event.key;

      if(pressEnter === 'Enter'){
        console.log(queryToSearch);
        router.push(`/search/${queryToSearch}`)
      }
    }
  }

  const handleClick = () => {
    if(queryToSearch.length !== 0){
      router.push(`/search/${queryToSearch}`)
    }
  }

  return (
    <Layout title='Home | PicsArt Gallery' description='App de Imagenes'>
      <BackgroundHome>
        <div className='w-1/2 h-3/5 select-none flex flex-col justify-around'>
          <h1 className="font-bold text-4xl w-3/4">
            Busca tus imágenes gratis, libres de uso, rápido y descárgalo. 
            <br/>Postea las imágenes que desees.
          </h1>
          <div className='w-full h-fit text-black flex rounded-lg bg-white'>
            <select className='text-sm font-bold pl-2 m-2 bg-gray-200 border-2 border-gray-400 w-1/6 rounded-lg focus:outline-none focus:bg-gray-300'>
              <option className='bg-white'>🖼️ Fotos</option>
              <option className='bg-white'>🎬 Videos</option>
            </select>
            <input 
              onChange={(e) => setQueryToSearch(e.target.value)}
              onKeyDown={handlePressEnter}
              className='mx-5 w-4/5 h-14 font-semibold text-xl focus:outline-none'
              placeholder='Busca fotos o imagenes gratis'
            />
            <button onClick={handleClick} className='hover:bg-gray-100 hover:rounded-2xl'>
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
