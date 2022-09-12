import {Box, HStack, Input, FormControl, Select, Flex } from '@chakra-ui/react'
import { IUserSearch } from '../pages'
import { useForm } from 'react-hook-form'
import { Dispatch, SetStateAction } from 'react'

type TFormProps = {
  setUserSearch: Dispatch<SetStateAction<IUserSearch>>
}

function Form({ setUserSearch }: TFormProps) {
  const { handleSubmit, register } = useForm<IUserSearch>()
  return (
    <Box w='sm'>
      <form
        id="weather-form"
        onSubmit={handleSubmit((data) => setUserSearch(data))}
      >
        <Flex justifyContent='center' alignItems='center'>
          <FormControl>
            <Input
              id="userInput"
              variant="flushed"
              placeholder="Enter city..."
              {...register('userInput')}
            />
          </FormControl>
          <FormControl>
            <Select
              variant="flushed"
              defaultValue="metric"
              width='16'
              {...register('unit')}
            >
              <option value="metric">°C</option>
              <option value="imperial">°F</option>
            </Select>
          </FormControl>
        </Flex>
      </form>
    </Box>
  )
}

export default Form
