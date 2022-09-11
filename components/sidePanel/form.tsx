import { Box, Input, FormControl, FormLabel } from '@chakra-ui/react'
import { Field, Formik } from 'formik'
import { TFormProps } from './sidepanel.types'

function Form({ setCity }: TFormProps) {
  return (
    <Box>
      <Formik
        initialValues={{
          userInput: ''
        }}
        onSubmit={(values) => {
          setCity(values.userInput)
        }}
      >
        {({ handleSubmit }) => (
          <form onSubmit={handleSubmit} id={'weather-form'}>
            <FormControl>
              <FormLabel htmlFor="userInput">Enter city:</FormLabel>
              <Field as={Input} id="userInput" name="userInput" type="text" />
            </FormControl>
          </form>
        )}
      </Formik>
    </Box>
  )
}

export default Form
