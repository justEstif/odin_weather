import {
  Flex,
  VStack,
  Input,
  FormControl,
  FormLabel,
  Radio,
  RadioGroup,
  Stack
} from '@chakra-ui/react'
import { Field, Formik } from 'formik'
import { TFormProps } from './sidepanel.types'

function Form({ setCity }: TFormProps) {
  return (
    <VStack spacing={4} align="flex-start">
      <Formik
        initialValues={{
          userInput: '',
          unit: 'metric'
        }}
        onSubmit={(values) => {
          console.log(values)
          setCity(values.userInput)
        }}
      >
        {({ handleSubmit }) => (
          <form onSubmit={handleSubmit} id={'weather-form'}>
            <FormControl>
              <FormLabel htmlFor="userInput">Enter city:</FormLabel>
              <Field as={Input} id="userInput" name="userInput" type="text" />
            </FormControl>

            <FormControl>
              <FormLabel htmlFor="unit">Unit:</FormLabel>
              <RadioGroup id="unit" name="unit">
                <Stack spacing={4} direction="row">
                  <Flex>
                    <Field as={Radio} name="unit" value="metric" />
                    °C
                  </Flex>
                  <Flex>
                    <Field as={Radio} name="unit" value="imperial" />
                    °F
                  </Flex>
                </Stack>
              </RadioGroup>
            </FormControl>
          </form>
        )}
      </Formik>
    </VStack>
  )
}

export default Form
