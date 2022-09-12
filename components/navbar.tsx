import { Flex, Box } from '@chakra-ui/react'

interface INavBar {
  form: JSX.Element
}

const NavBar = ({ form }: INavBar) => {
  return (
    <Box as="nav" zIndex={2}>
      <Flex justifyContent='flex-end'>{form}</Flex>
    </Box>
  )
}

export default NavBar
