import Image from 'next/image'
import Layout from '@/components/Layout'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export default function AboutMe() {
  return (
    <Layout title='About Me' description='Información acerca del creador de esta app.'>
      <h1>Esto es el About Meeee</h1>
    </Layout>
  )
}
