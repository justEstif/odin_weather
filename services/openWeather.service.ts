import ICoordinate from '../interface/coordinate'
import ICityGeoInfo from '../interface/ICityGeoInfo'
import { IGeocodingApi, ICurrentWeatherApi } from './openWeather.interface'
import Converter from 'node-temperature-converter'
import ITemp from 'interface/ITemp'
import ITimeDate from 'interface/ITimeDate'
import IWeather from 'interface/IWeather'
import ICityInfo from 'interface/ICityInfo'

class OpenWeather {
  private apiDomain = 'http://api.openweathermap.org'

  private getCityGeoInfo = async (cityName: string) => {
    const url = `${this.apiDomain}/geo/1.0/direct?q=${cityName}&limit=5&appid=${process.env.NEXT_PUBLIC_OPEN_WEATHER_API}`
    try {
      let response = await fetch(url)
      let json: IGeocodingApi[] = await response.json()
      let { lat: latitude, lon: longitude, name, state } = json[0]
      const cityGeoInfo: ICityGeoInfo = {
        coordinate: { latitude, longitude },
        name,
        state
      }
      return cityGeoInfo
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

    const differentTemp: ITemp = {
      currentTemp: getWeatherObj(temp),
      currentTempMax: getWeatherObj(temp_max),
      currentTempMin: getWeatherObj(temp_min),
      currentTempFeelsLike: getWeatherObj(feels_like)
    }
    return differentTemp
  }

  public getTimeDate = (timezone: number) => {
    const localTime = new Date().getTime()
    const localOffset = new Date().getTimezoneOffset() * 60000
    const currentUtcTime = localOffset + localTime
    const cityOffset = currentUtcTime + 1000 * timezone
    const cityTimeDate = new Date(cityOffset).toTimeString().split(' ')
    const timeDate: ITimeDate = {
      time: cityTimeDate[0],
      date: cityTimeDate[1],
      timezone
    }
    return timeDate
  }

  private getCityWeather = async (coordinate: ICoordinate) => {
    const url = `${this.apiDomain}/data/2.5/weather?lat=${coordinate.latitude}&lon=${coordinate.longitude}&appid=${process.env.NEXT_PUBLIC_OPEN_WEATHER_API}`
    try {
      const response = await fetch(url)
      const json: ICurrentWeatherApi = await response.json()
      const weather: IWeather = json.weather[0]
      const temp: ITemp = this.getDifferentTemp(json)
      const timeDate: ITimeDate = this.getTimeDate(json.timezone)

      return {
        weather,
        temp,
        timeDate
      }
    } catch (error) {
      console.log(error)
    }
  }

  public getCityInfo = async (cityName: string) => {
    try {
      const cityGeoInfo = await this.getCityGeoInfo(cityName)
      if (typeof cityGeoInfo === 'undefined') throw 'City not found'
      const cityWeather = await this.getCityWeather(cityGeoInfo.coordinate)
      if (typeof cityWeather === 'undefined') throw 'City not found'
      const cityInfo: ICityInfo = { ...cityWeather, cityGeoInfo }
      return cityInfo
    } catch (error) {
      console.log(error)
    }
  }
}

export default OpenWeather
