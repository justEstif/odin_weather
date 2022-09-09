import CurrentWeather from './currentCondition.service'
import Geocoding from './geocoding.service'
import { ICurrentWeather } from './openWeather.interface'

class OpenWeather {
  public getCurrentWeather = async (
    searchTerm: string,
    unit?: string
  ): Promise<ICurrentWeather> => {
    try {
      const geocode = new Geocoding(searchTerm)
      const geocodeObj = await geocode.getGeocode()
      const currentCondition = new CurrentWeather(geocodeObj.coordinate, unit)
      const currentConditionObj = await currentCondition.getCurrentCondition()
      return {
        ...geocodeObj,
        ...currentConditionObj
      }
    } catch (error) {
      throw error
    }
  }
}

export default OpenWeather
