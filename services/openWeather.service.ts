import ICoordinate from '../interface/coordinate'
import ICityInfo from '../interface/cityInfo'
import { IGeocodingApi, ICurrentWeatherApi } from './openWeather.interface'
import Converter from 'node-temperature-converter'

class OpenWeather {
  private apiDomain = 'http://api.openweathermap.org'
  private getCityInfo = async (cityName: string) => {
    const url = `${this.apiDomain}/geo/1.0/direct?q=${cityName}&limit=5&appid=${process.env.NEXT_PUBLIC_OPEN_WEATHER_API}`
    try {
      let response = await fetch(url)
      let json: IGeocodingApi[] = await response.json()
      let { lat: latitude, lon: longitude, name, state } = json[0]
      const cityInfo: ICityInfo = {
        coordinate: { latitude, longitude },
        name,
        state
      }
      return cityInfo
    } catch (error) {
      console.log(error)
    }
  }

  private getDifferentTemp = (weather: ICurrentWeatherApi) => {
    const {
      main: { temp, temp_max, temp_min, feels_like }
    } = weather

    const getWeatherObj = (tempK: number) => {
      const kelvin = new Converter.Kelvin(tempK)
      return {
        tempC: parseFloat(kelvin.toCelsius().toFixed(2)),
        tempF: parseFloat(kelvin.toFahrenheit().toFixed(2)),
        tempK
      }
    }

    return {
      currentTemp: getWeatherObj(temp),
      currentTempMax: getWeatherObj(temp_max),
      currentTempMin: getWeatherObj(temp_min),
      currentTempFeelsLike: getWeatherObj(feels_like)
    }
  }

  private getTimeDate = (timezone: number) => {
    const localTime = new Date().getTime()
    const localOffset = new Date().getTimezoneOffset() * 60000
    const currentUtcTime = localOffset + localTime
    const cityOffset = currentUtcTime + 1000 * timezone
    const cityTimeDate = new Date(cityOffset).toTimeString().split(' ')
    return { time: cityTimeDate[0], date: cityTimeDate[1] }
  }

  private getCityWeather = async (coordinate: ICoordinate) => {
    const url = `${this.apiDomain}/data/2.5/weather?lat=${coordinate.latitude}&lon=${coordinate.longitude}&appid=${process.env.NEXT_PUBLIC_OPEN_WEATHER_API}`
    try {
      let response = await fetch(url)
      let json: ICurrentWeatherApi = await response.json()
      return {
        weather: json.weather[0],
        temp: this.getDifferentTemp(json),
        timeDate: this.getTimeDate(json.timezone)
      }
    } catch (error) {
      console.log(error)
    }
  }

  public getWeather = async (cityName: string) => {
    try {
      const cityInfo = await this.getCityInfo(cityName)
      if (typeof cityInfo === 'undefined') throw 'City not found'
      const cityWeather = await this.getCityWeather(cityInfo.coordinate)
      return { ...cityWeather, ...cityInfo }
    } catch (error) {
      console.log(error)
    }
  }
}

export default OpenWeather
