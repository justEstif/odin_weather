import ICoordinate from '../interface/coordinate'
import ICityGeoInfo from '../interface/ICityGeoInfo'
import { IGeocodingApi, ICurrentWeatherApi } from './openWeather.interface'
import Converter from 'node-temperature-converter'
import ITemp from 'interface/ITemp'
import ITimeDate from 'interface/ITimeDate'
import ICityInfo from 'interface/ICityInfo'
import ICityWeather from 'interface/ICityWeather'
import { getGeoCodingLink, getWeatherConditionLink } from './openweather.api'

class OpenWeather {
  private getCityGeoInfo = async (
    cityName: string
  ): Promise<ICityGeoInfo | undefined> => {
    const url = getGeoCodingLink(cityName)
    try {
      let response = await fetch(url)
      let json: IGeocodingApi[] = await response.json()
      let { lat: latitude, lon: longitude, name, state } = json[0]
      return {
        coordinate: { latitude, longitude },
        name,
        state
      }
    } catch (error) {
      console.log(error)
    }
  }

  private getDifferentTemp = ({ main }: ICurrentWeatherApi): ITemp => {
    const { temp, temp_max, temp_min, feels_like } = main

    const getWeatherObj = (tempK: number) => {
      const kelvin = new Converter.Kelvin(tempK)
      return {
        tempC: kelvin.toCelsius().toFixed(2) + '°C',
        tempF: kelvin.toFahrenheit().toFixed(2) + '°F',
        tempK: tempK.toFixed(2) + 'K'
      }
    }

    return {
      currentTemp: getWeatherObj(temp),
      currentTempMax: getWeatherObj(temp_max),
      currentTempMin: getWeatherObj(temp_min),
      currentTempFeelsLike: getWeatherObj(feels_like)
    }
  }

  public getTimeDate = (timezone: number): ITimeDate => {
    const localTime = new Date().getTime()
    const localOffset = new Date().getTimezoneOffset() * 60000
    const currentUtcTime = localOffset + localTime
    const cityOffset = currentUtcTime + 1000 * timezone
    const cityTimeDate = new Date(cityOffset).toTimeString().split(' ')
    return {
      time: cityTimeDate[0],
      date: cityTimeDate[1],
      timezone
    }
  }

  private getCityWeather = async (
    coordinate: ICoordinate
  ): Promise<ICityWeather | undefined> => {
    const url = getWeatherConditionLink(coordinate)
    try {
      const response = await fetch(url)
      const json = await response.json()

      return {
        weather: json.weather[0],
        temp: this.getDifferentTemp(json),
        timeDate: this.getTimeDate(json.timezone)
      }
    } catch (error) {
      console.log(error)
    }
  }

  public getCityInfo = async (
    cityName: string
  ): Promise<ICityInfo | undefined> => {
    try {
      const cityGeoInfo = await this.getCityGeoInfo(cityName)
      if (typeof cityGeoInfo === 'undefined') throw 'City not found'
      const cityWeather = await this.getCityWeather(cityGeoInfo.coordinate)
      if (typeof cityWeather === 'undefined') throw 'City not found'
      return { ...cityWeather, cityGeoInfo }
    } catch (error) {
      console.log(error)
    }
  }
}

export default OpenWeather
