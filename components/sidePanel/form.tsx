import {
  Input,
  FormControl,
  FormLabel,
  Radio,
  RadioGroup,
  Stack
} from '@chakra-ui/react'
import { IUserSearch } from 'pages/index.interface'
import { useForm } from 'react-hook-form'
import { TFormProps } from './sidepanel.types'

function Form({ setUserSearch }: TFormProps) {
  const { handleSubmit, register } = useForm<IUserSearch>()
  return (
    <form
      id="weather-form"
      onSubmit={handleSubmit((data) => setUserSearch(data))}
    >
      <FormControl>
        <FormLabel htmlFor="userInput">Enter city:</FormLabel>
        <Input id="userInput" placeholder="Paris" {...register('userInput')} />
      </FormControl>
      <RadioGroup id="unit" defaultValue='metric'>
        <FormLabel htmlFor="unit">Unit:</FormLabel>
        <Stack spacing={4} direction="row">
          <Radio value="metric" {...register('unit')}>
            °C
          </Radio>
          <Radio value="imperial" {...register('unit')}>
            °F
          </Radio>
        </Stack>
      </RadioGroup>
    </form>
  )
}

export default Form
