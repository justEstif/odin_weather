export interface IGeocodingApi {
  state: string
  name: string
  lat: number
  lon: number
}

export interface ICurrentWeatherApi {
  main: {
    temp: number
    temp_min: number
    temp_max: number
    feels_like: number
    pressure: number
    humidity: number
    sea_level: number
    grnd_level: number
  }
  weather: [
    {
      id: number
      main: string
      description: string
      icon: string
    }
  ]
  timezone: number
}
