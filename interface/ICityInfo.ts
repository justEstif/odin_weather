import ICityGeoInfo from './ICityGeoInfo'
import ITemp from './ITemp'
import ITimeDate from './ITimeDate'
import IWeather from './IWeather'

interface ICityInfo {
  cityGeoInfo: ICityGeoInfo
  weather: IWeather
  temp: ITemp
  timeDate: ITimeDate
}

export default ICityInfo
