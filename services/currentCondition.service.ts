import { ICoordinate } from './geocoding.interface'
import {
  ICurrentConditionResult,
  ICurrentCondition
} from './currentCondition.interface'

class CurrentWeather {
  private coordinate: ICoordinate
  private url!: string
  private unit: string

  constructor(coordinate: ICoordinate, unit: string) {
    this.coordinate = coordinate
    this.unit = unit // (C vs F),(m/s vs mih)
    this.getCurrentConditionLink()
    this.getApiResponse()
  }

  private getCurrentConditionLink = () => {
    const apiDomain = 'http://api.openweathermap.org'
    const { lat, lon } = this.coordinate
    this.url = `${apiDomain}/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${process.env.NEXT_PUBLIC_OPEN_WEATHER_API}&units=${this.unit}`
  }

  private getApiResponse = async (): Promise<ICurrentConditionResult> => {
    try {
      const response = await fetch(this.url)
      return await response.json()
    } catch (error) {
      throw 'No Current Condition API response'
    }
  }

  private getCityOffset = (timezone: number) => {
    const localTime = new Date().getTime()
    const localOffset = new Date().getTimezoneOffset() * 60000
    const currentUtcTime = localOffset + localTime
    const cityOffset = currentUtcTime + 1000 * timezone
    return cityOffset
  }

  public getCurrentCondition = async (): Promise<ICurrentCondition> => {
    try {
      const currentCondition = await this.getApiResponse()
      const tempUnit = this.unit === 'metric' ? '°C' : '°F'
      const windUnit = this.unit === 'metric' ? 'm/s' : 'mi/hr'
      return {
        wind: currentCondition.wind.speed,
        cloud: currentCondition.clouds.all,
        temp: currentCondition.main.temp,
        feelsLike: currentCondition.main.feels_like,
        timeOffset: this.getCityOffset(currentCondition.timezone),
        weather: {
          main: currentCondition.weather[0].main,
          description: currentCondition.weather[0].description,
          icon: currentCondition.weather[0].icon,
          id: currentCondition.weather[0].id
        },
        humidity: currentCondition.main.humidity,
        unit: { temp: tempUnit, wind: windUnit },
        ...(!!currentCondition.snow && {
          snow: currentCondition.snow['1h']
        }),
        ...(!!currentCondition.rain && {
          rain: currentCondition.rain['1h']
        })
      }
    } catch (error) {
      throw error
    }
  }
}

export default CurrentWeather
