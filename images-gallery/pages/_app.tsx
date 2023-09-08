import '@/styles/globals.css'
import { Providers } from '@/utils/redux/providers'
import { ChakraBaseProvider, extendBaseTheme } from '@chakra-ui/react'
import type { AppProps } from 'next/app'
import chakraTheme from '@chakra-ui/theme'
import { SessionProvider } from 'next-auth/react'

const { Spinner, Input } = chakraTheme.components

const theme = extendBaseTheme({
  components: {
    Spinner,
    Input
  },
})

export default function App({ Component, pageProps: {session, ...pageProps} }: AppProps) {
  return (
    <SessionProvider session={session}>
      <Providers>
        <ChakraBaseProvider theme={theme}>
          <Component {...pageProps} />     
        </ChakraBaseProvider>   
      </Providers>
    </SessionProvider>
  )
}
