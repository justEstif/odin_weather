import type { NextPage } from 'next'
import { useEffect, useState } from 'react'
import { Box } from '@chakra-ui/react'
import OpenWeather from 'services/openWeather.controller'
import { Form, ConvertDrawer } from 'components/sidePanel'
import { ICurrentWeather } from 'services/openWeather.interface'
import { IUserSearch } from './index.interface'

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

  const form = <Form setUserSearch={setUserSearch} />
  const cityName = currentWeather && (
    <p>
      {currentWeather.name}, {currentWeather.country}
      {currentWeather.temp}, {currentWeather.feelsLike}
    </p>
  )
  return (
    <Box>
      <ConvertDrawer form={form} />
      {cityName}
    </Box>
  )
}

export default Home
