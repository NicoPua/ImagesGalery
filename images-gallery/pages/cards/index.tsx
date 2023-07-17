import Image from 'next/image'
import Layout from '@/components/Layout'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export default function Cards() {
  return (
    <Layout title='Images' description='All Images'>
      <h1>Holaaa</h1>
    </Layout>
  )
}
