import '@/styles/globals.css'
import { Providers } from '@/utils/redux/providers'
import { ChakraBaseProvider, extendBaseTheme } from '@chakra-ui/react'
import type { AppProps } from 'next/app'
import chakraTheme from '@chakra-ui/theme'

const { Spinner } = chakraTheme.components

const theme = extendBaseTheme({
  components: {
    Spinner,
  },
})

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Providers>
      <ChakraBaseProvider theme={theme}>
        <Component {...pageProps} />     
      </ChakraBaseProvider>   
    </Providers>
  )
}
