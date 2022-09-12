import { HStack, Input, FormControl, Select } from '@chakra-ui/react'
import { IUserSearch } from 'pages/index.interface'
import { useForm } from 'react-hook-form'
import { Dispatch, SetStateAction } from 'react'

type TFormProps = {
  setUserSearch: Dispatch<SetStateAction<IUserSearch>>
}

function Form({ setUserSearch }: TFormProps) {
  const { handleSubmit, register } = useForm<IUserSearch>()
  return (
    <form
      id="weather-form"
      onSubmit={handleSubmit((data) => setUserSearch(data))}
    >
      <HStack spacing="5px">
        <FormControl>
          <Input
            id="userInput"
            variant="flushed"
            placeholder="Paris"
            {...register('userInput')}
          />
        </FormControl>
        <FormControl>
          <Select variant="flushed" defaultValue='metric' {...register('unit')}>
            <option value="metric">
              Metric (°C)
            </option>
            <option value="imperial">Imperial (°F)</option>
          </Select>
        </FormControl>
      </HStack>
    </form>
  )
}

export default Form
