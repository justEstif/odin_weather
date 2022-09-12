import { ChakraProvider } from '@chakra-ui/react'
import { AppProps } from 'next/app'
import Layout from 'components/layout'

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <ChakraProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ChakraProvider>
  )
}

export default MyApp
