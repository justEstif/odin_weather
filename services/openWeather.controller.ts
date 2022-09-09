import CurrentWeather from './currentCondition.service'
import Geocoding from './geocoding.service'

class OpenWeather {
  public getCurrentWeather = async (searchTerm: string, unit?: string) => {
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
      console.log(error)
      return null
    }
  }
}

export default OpenWeather
