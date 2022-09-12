import type { NextPage } from 'next'
import { useEffect, useState } from 'react'
import { Box } from '@chakra-ui/react'
import OpenWeather from 'services/openWeather.controller'
import Form from 'components/form'
import { ICurrentWeather } from 'services/openWeather.interface'

interface IUserSearch {
  userInput: string
  unit: string
}
const weather = new OpenWeather()

const Home: NextPage = () => {
  const [userSearch, setUserSearch] = useState<IUserSearch>({
    userInput: '',
    unit: ''
  })
  const [currentWeather, setCurrentWeather] = useState<
    ICurrentWeather | undefined
  >(undefined)

  useEffect(() => {
    const fetchData = async () => {
      const result = await weather.getCurrentWeather(
        userSearch.userInput,
        userSearch.unit
      )
      setCurrentWeather(() => result)
    }

    userSearch.userInput !== '' && userSearch.unit !== '' && fetchData()
  }, [userSearch])

  const cityName = currentWeather && (
    <p>
      {currentWeather.name}, {currentWeather.country}
      {currentWeather.temp}, {currentWeather.feelsLike}
    </p>
  )
  return (
    <Box>
      <Form setUserSearch={setUserSearch} />
      {cityName}
    </Box>
  )
}

export default Home
