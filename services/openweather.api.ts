import ICoordinate from 'interface/coordinate'

const apiDomain = 'http://api.openweathermap.org'

export const getGeoCodingLink = (cityName: string) =>
  `${apiDomain}/geo/1.0/direct?q=${cityName}&limit=5&appid=${process.env.NEXT_PUBLIC_OPEN_WEATHER_API}`

export const getWeatherConditionLink = ({ latitude, longitude }: ICoordinate) =>
  `${apiDomain}/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${process.env.NEXT_PUBLIC_OPEN_WEATHER_API}`
