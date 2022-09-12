import Head from 'next/head'
import { Box, Container } from '@chakra-ui/react'
import { PropsWithChildren } from 'react'

const Layout = ({ children }: PropsWithChildren) => {
  return (
    <Box as="main" pb={8}>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content="Odin Weather" />
        <meta name="author" content="Estifanos Beyene" />
        <meta name="author" content="justEstif" />
        <link rel="shortcut icon" href="/favicon.ico" type="image/x-icon" />
        <meta property="og:site_name" content="Estifanos Beyene" />
        <meta name="og:title" content="Estifanos Beyene" />
        <meta property="og:type" content="website" />
        <title>Odin Weather</title>
      </Head>

      <Container maxW="container.xl" pt={14}>
        {children}
      </Container>
    </Box>
  )
}

export default Layout
