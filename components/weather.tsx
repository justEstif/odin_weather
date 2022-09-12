import { Box } from '@chakra-ui/react'
import { ICurrentWeather } from 'services/openWeather.interface'
import Image from 'next/image'
// import { useState, useEffect } from 'react'

interface IWeatherProps {
  currentWeather: ICurrentWeather | undefined
}

// const getCityTime = (timeOffset: number) =>
//   new Date(timeOffset).toTimeString().split(' ')[0].toString()

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
        rain,
        snow,
        weather: { main }
      } = currentWeather
      return (
        <Box>
          Current temp: {temp}
          {unit.temp}
          Feels like: {feelsLike}
          {unit.temp}
          {main}
          {name}, {country}
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
