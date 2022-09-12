import type { NextPage } from 'next'
import { useEffect, useState } from 'react'
import { Box } from '@chakra-ui/react'
import OpenWeather from 'services/openWeather.controller'
import { ICurrentWeather } from 'services/openWeather.interface'
import Form from 'components/form'
import Weather from 'components/weather'
import NavBar from 'components/navbar'

export interface IUserSearch {
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
      try {
        const result = await weather.getCurrentWeather(
          userSearch.userInput,
          userSearch.unit
        )
        setCurrentWeather(() => result)
      } catch (error) {
        setCurrentWeather(() => undefined)
        console.log(`Error: ${error}`)
      }
    }

    userSearch.userInput !== '' && userSearch.unit !== '' && fetchData()
  }, [userSearch])

  const form = <Form setUserSearch={setUserSearch} />
  return (
    <Box h="800">
      <NavBar form={form} />
      <Weather currentWeather={currentWeather} />
    </Box>
  )
}

export default Home
