import { Box, Text } from '@chakra-ui/react'
import { ICurrentWeather } from 'services/openWeather.interface'
import Image from 'next/image'
import { useState, useEffect } from 'react'

interface IWeatherProps {
  currentWeather: ICurrentWeather | undefined
}

const getCityTime = (timeOffset: number) =>
  new Date(timeOffset).toTimeString().split(' ')[0].toString()

const Weather = ({ currentWeather }: IWeatherProps) => {
  switch (typeof currentWeather) {
    case 'undefined':
      return <p>Nothing to show, search again</p>
    default:
      const {
        temp,
        feelsLike,
        unit,
        name,
        country,
        weatherIcon,
        weather: { main }
      } = currentWeather
      const [cityTime, setCityTime] = useState(() =>
        getCityTime(currentWeather.timeOffset)
      )

      useEffect(() => {
        setTimeout(() => {
          setCityTime(() => getCityTime(currentWeather.timeOffset))
        }, 3000)
      }, [cityTime])

      return (
        <Box>
          <Text fontSize="6xl">
            {name}, {country}
          </Text>
          <Text fontSize="3xl">
            Current temp: {temp}
            {unit.temp}
          </Text>
          <Text fontSize="3xl">
            Feels like: {feelsLike}
            {unit.temp}
          </Text>
          <Text fontSize="3xl">{main}</Text>
          <Text fontSize="3xl">{cityTime}</Text>
          <Image
            src={`/weatherIcons/${weatherIcon}.svg`}
            width="60"
            height="60"
          />
        </Box>
      )
  }
}

export default Weather
