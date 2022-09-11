import type { NextPage } from 'next'
import { useEffect, useState } from 'react'
import { Box } from '@chakra-ui/react'
import OpenWeather from 'services/openWeather.controller'
import { Form, ConvertDrawer } from 'components/sidePanel'
import { ICurrentWeather } from 'services/openWeather.interface'
import { IUserSearch } from './index.interface'

const weather = new OpenWeather()

const Home: NextPage = () => {
  const [userSearcch, setUserSearch] = useState<IUserSearch | undefined>(undefined)
  const [city, setCity] = useState('')
  const [currentWeather, setCurrentWeather] = useState<
    ICurrentWeather | undefined
  >(undefined)

  useEffect(() => {
    const fetchData = async () => {
      const result = await weather.getCurrentWeather(city)
      setCurrentWeather(() => result)
    }
    if (city !== '') fetchData()
  }, [city])

  const form = <Form setCity={setCity} />
  const cityName = currentWeather && (
    <p>
      {currentWeather.name}, {currentWeather.country}
      {currentWeather.temp}, {currentWeather.feelsLike}
    </p>
  )
  return (
    <Box>
      <ConvertDrawer form={form} />
    </Box>
  )
}

export default Home
