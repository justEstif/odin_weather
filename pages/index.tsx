import type { NextPage } from 'next'
import { useEffect, useState } from 'react'
import { GridItem, Grid, Flex } from '@chakra-ui/react'
import OpenWeather from 'services/openWeather.controller'
import Form from 'components/form'
import { ICurrentWeather } from 'services/openWeather.interface'
import Image from 'next/image'

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

  const time =
    currentWeather &&
    new Date(currentWeather?.timeOffset).toTimeString().split(' ')[0]
  const cityTime = time && <p>{time.toString()}</p>
  const cityInfo = currentWeather && (
    <div>
      <p>
        {currentWeather.name}, {currentWeather.country}
      </p>
      {cityTime}
      <p>
        {currentWeather.temp}
        {currentWeather.unit.temp}
      </p>
      <p>
        {currentWeather.feelsLike}
        {currentWeather.unit.temp}
      </p>
      <p>
        {currentWeather.weather.main},{currentWeather.weather.description}
      </p>
      <Image
        src={`/weatherIcons/${currentWeather.weatherIcon}.svg`}
        width="60"
        height="60"
      />
    </div>
  )
  return (
    <Grid h="800" templateColumns="repeat(3, 1fr)" gap={4}>
      <GridItem colSpan={2}>{cityInfo}</GridItem>
      <GridItem colSpan={1}>
        <Flex justifyContent="center">
          <Form setUserSearch={setUserSearch} />
        </Flex>
      </GridItem>
    </Grid>
  )
}

export default Home
