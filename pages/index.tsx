import type { NextPage } from 'next'
import OpenWeather from 'services/openWeather.controller'
import { useEffect, useState } from 'react'
import { Form, ConvertDrawer } from 'components'
import { ICurrentWeather } from 'services/openWeather.interface'
import { Box } from '@chakra-ui/react'

const weather = new OpenWeather()

const Home: NextPage = () => {
  const [city, setCity] = useState('')
  const [currentWeather, setCurrentWeather] = useState<
    ICurrentWeather | undefined
  >(undefined)

  useEffect(() => {
    const fetchData = async () => {
      const result = await weather.getCurrentWeather(city)
      setCurrentWeather(() => result)
      console.log(currentWeather)
    }
    if (city !== '') fetchData()
  }, [city])

  return (
    <Box>
      <Form setCity={setCity} />
      <ConvertDrawer />
    </Box>
  )
}

export default Home
