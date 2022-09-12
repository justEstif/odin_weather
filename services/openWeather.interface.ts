import { ICoordinate } from './geocoding.interface'

export interface ICurrentWeather {
  rain?: number | undefined
  snow?: number | undefined
  wind: number
  cloud: number
  temp: number
  feelsLike: number
  timeOffset: number
  weather: {
    main: string
    description: string
    icon: string
    id: number
  }
  humidity: number
  name: string
  coordinate: ICoordinate
  country: string
}
