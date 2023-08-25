import Image from 'next/image'
import Layout from '@/components/Layout'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export default function AboutMe() {
  return (
    <Layout title='About Me | PicsArt Gallery' description='Información acerca del creador de esta app.'>
      <div className='bg-gray-100 pt-10 bg-red-400 w-full h-screen flex justify-center items-center'>
        <div className=' w-3/4 h-3/4 bg-gray-900 text-gray-100 flex justify-around rounded-xl shadow-2xl'>
          <div className='p-10'>
            <h1 className='text-4xl pb-5'>💻Full Stack Web Developer</h1>
            <h2 className='text-2xl pb-5'>Desarrollado por Gonzalo Nicolás Pua</h2>
            <p>Esta aplicación fue desarrollada con tecnologías tales como: TypeScript, React JS, Next JS, Tailwind CSS, MongoDB & Mongoose. </p>
          </div>

          <Image 
            className='rounded-xl shadow-xl'
            src='/images/cuttedprofilepic.jpg'
            width={550} 
            height={500} 
            alt='profilepic'/>
        </div>
      </div>
    </Layout>
  )
}
