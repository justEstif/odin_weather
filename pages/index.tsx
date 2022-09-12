import type { NextPage } from 'next'
import { useEffect, useState } from 'react'
import { GridItem, Grid, Flex } from '@chakra-ui/react'
import OpenWeather from 'services/openWeather.controller'
import { ICurrentWeather } from 'services/openWeather.interface'
import Form from 'components/form'
import Weather from 'components/weather'

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
      const result = await weather.getCurrentWeather(
        userSearch.userInput,
        userSearch.unit
      )
      setCurrentWeather(() => result)
    }

    userSearch.userInput !== '' && userSearch.unit !== '' && fetchData()
  }, [userSearch])

  return (
    <Grid h="800" templateColumns="repeat(3, 1fr)" gap={4}>
      <GridItem colSpan={2}>
        <Weather currentWeather={currentWeather} />
      </GridItem>
      <GridItem colSpan={1}>
        <Flex justifyContent="center">
          <Form setUserSearch={setUserSearch} />
        </Flex>
      </GridItem>
    </Grid>
  )
}

export default Home
