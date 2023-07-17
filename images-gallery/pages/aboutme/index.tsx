import Image from 'next/image'
import Layout from '@/components/Layout'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export default function AboutMe() {
  return (
    <Layout title='About Me | Images-Gallery' description='Información acerca del creador de esta app.'>
      <div className='pt-10 bg-red-400 w-full h-screen flex items-center'>
        <h1>Desarrollado por: Gonzalo Nicolás Pua</h1>
        <h2>Full Stack Web Developer</h2>
        <p>Esta aplicación fue desarrollada con tecnologías tales como: TypeScript, React JS, Next JS, Tailwind CSS, MongoDB & Mongoose. </p>
      </div>
    </Layout>
  )
}
