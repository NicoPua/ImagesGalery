import Image from 'next/image'
import { Inter } from 'next/font/google'
import Layout from '@/components/Layout'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <Layout title='Home | Images-Gallery' description='App de Imagenes'>
      <div className='pt-10'>
        <h1>Holaa, estoy en el Home</h1>
      </div>
    </Layout>
  )
}
