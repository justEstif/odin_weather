import Head from 'next/head'
import { Box, Container } from '@chakra-ui/react'
import { PropsWithChildren } from 'react'

const Layout = ({ children }: PropsWithChildren) => {
  return (
    <Box as="main" pb={8}>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta charSet="utf-8" />
        <title>Odin Weather</title>
      </Head>

      <Container maxW="container.md" pt={5}>
        {children}
      </Container>
    </Box>
  )
}

export default Layout
