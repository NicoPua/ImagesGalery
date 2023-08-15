import Image from 'next/image'
import { Inter } from 'next/font/google'
import Layout from '@/components/Layout'
import BackgroundHome from '@/components/BackgroundHome'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <Layout title='Home | Images-Gallery' description='App de Imagenes'>
        <BackgroundHome>
          <div className='w-1/2 h-3/5 bg-red-800'>
            <h1 className='font-sans text-4xl w-3/4'>Busca tus imágenes gratis, libres de uso, rápido y descárgalo. <br/>Postea las imágenes que desees.</h1>
            <div>
              <select className='text-black'>
                <option>asdasd</option>
                <option>HOLA</option>
              </select>
              <input />
              <button>Buscar</button>
            </div>
          </div>
        </BackgroundHome>

      <div className='h-96'>
        <h1>Holaa, estoy en el Home</h1>
      </div>

      <div>
        <h1>Holaa, estoy en el Home</h1>
      </div>
    </Layout>
  )
}
