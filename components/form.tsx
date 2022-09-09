import { Dispatch, SetStateAction } from 'react'
import { Box, Input, FormControl, FormLabel } from '@chakra-ui/react'
import { Field, Formik } from 'formik'

type FormProps = {
  setCity: Dispatch<SetStateAction<string>>
}

function Form({ setCity }: FormProps) {
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
          <form onSubmit={handleSubmit}>
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
