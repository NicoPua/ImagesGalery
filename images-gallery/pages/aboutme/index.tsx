import Image from 'next/image'
import Layout from '@/components/Layout'
import SimpleSlider from '@/components/Carousel/Carousel';

//import { Inter } from 'next/font/google'
//const inter = Inter({ subsets: ['latin'] })

export default function AboutMe() {
  return (
    <Layout title='About Me | PicsArt Gallery' description='Información acerca del creador de esta app.'>
      <div className='bg-gray-100 pt-10 my-10 w-full h-screen flex flex-col justify-center items-center'>
        <div className=' w-4/5 h-fit bg-gray-900 text-gray-100 flex justify-around rounded-xl shadow-2xl'>
          <div className='p-10 flex flex-col w-1/2'>
            <h1 className='font-bold text-4xl pb-5'>💻Full Stack Web Developer</h1>
            <h2 className='font-semibold text-2xl pb-5'>Desarrollado por Gonzalo Nicolás Pua</h2>
            <p>PicsArt es una aplicación web con el fin de poder almacenar imágenes y descargar las mismas con libertad de uso con el consentimiento del usuario. PicsArt es una aplicación web destinada a fines educativos.</p>
            <p>Esta aplicación fue desarrollada con tecnologías tales como: TypeScript, React JS, Next JS, Tailwind CSS, MongoDB & Mongoose. </p>
            <div className='w-full flex justify-center mt-5 p-3'>
              <SimpleSlider />
            </div>
          </div>

          <div className='w-full flex justify-end'>
            <Image 
              className='rounded-xl shadow-xl'
              src='/images/cuttedprofilepic.jpg'
              width={550} 
              height={500} 
              alt='profilepic'
            />
          </div>
        </div>
      </div>
    </Layout>
  )
}
