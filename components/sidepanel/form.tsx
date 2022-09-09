import { Dispatch, SetStateAction } from 'react'
import { Input, FormControl, FormLabel } from '@chakra-ui/react'
import { useFormik } from 'formik'

type FormProps = {
  setCity: Dispatch<SetStateAction<string>>
}
function Form({ setCity }: FormProps) {
  const formik = useFormik({
    initialValues: {
      userInput: ''
    },
    onSubmit: (values) => {
      setCity(values.userInput)
    }
  })

  return (
    <form onSubmit={formik.handleSubmit}>
      <FormControl>
        <FormLabel>Enter city:</FormLabel>
        <Input
          name="userInput"
          value={formik.values.userInput}
          onChange={formik.handleChange}
          placeholder="Paris"
          size="sm"
        />
      </FormControl>
    </form>
  )
}

export default Form
