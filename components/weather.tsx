import { Box } from '@chakra-ui/react'
import { ICurrentWeather } from 'services/openWeather.interface'
import Image from 'next/image'

interface IWeatherProps {
  currentWeather: ICurrentWeather | undefined
}

const Weather = ({ currentWeather }: IWeatherProps) => {
  switch (typeof currentWeather) {
    case 'undefined':
      return <p>Nothing to show</p>
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
      return (
        <Box>
          <p>
            {name}, {country}
          </p>
          <p>
            Current temp: {temp}
            {unit.temp}
          </p>
          <p>
            Feels like: {feelsLike}
            {unit.temp}
          </p>
          <p>{main}</p>

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
