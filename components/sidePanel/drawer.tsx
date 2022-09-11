import { TConvertDrawer } from './sidepanel.types'
import {
  useDisclosure,
  Button,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerHeader,
  DrawerBody,
  DrawerFooter
} from '@chakra-ui/react'

const ConvertDrawer = ({ form }: TConvertDrawer) => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  return (
    <>
      <Button onClick={onOpen}>Open</Button>
      <Drawer isOpen={isOpen} onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Search</DrawerHeader>
          <DrawerBody>{form}</DrawerBody>
          <DrawerFooter>
            <Button type="submit" form={'weather-form'}>
              Search
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  )
}
export default ConvertDrawer
