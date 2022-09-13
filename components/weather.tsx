import { Text, VStack, Stack, HStack } from '@chakra-ui/react'
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
        unit,
        name,
        country,
        weatherIcon,
        humidity,
        rain,
        snow,
        cloud,
        wind,
        weather: { main }
      } = currentWeather
      return (
        <VStack spacing={8} align="center" justify="center">
          <Image
            src={`/weatherIcons/${weatherIcon}.svg`}
            width="160"
            height="160"
          />
          <HStack spacing={28}>
            <VStack align="start">
              <Text fontSize={'xl'}>
                {name}, {country}
              </Text>
              <Text fontSize={'xl'}>
                {temp} {unit.temp}
              </Text>
              <Text fontSize={'xl'}>{main}</Text>
            </VStack>

            <VStack align="start">
              {!!rain ?? <Text fontSize={'xl'}>Rain: {rain}</Text>}
              {!!snow ?? <Text fontSize={'xl'}>Snow: {snow}</Text>}
              <Text fontSize={'xl'}>
                Wind: {wind} {unit.wind}
              </Text>
              <Text fontSize={'xl'}>Humidity: {humidity}%</Text>
              <Text fontSize={'xl'}>Cloud: {cloud}%</Text>
            </VStack>
          </HStack>
        </VStack>
      )
  }
}

export default Weather
