import CurrentWeather from './currentCondition.service'
import { ICurrentCondition } from './currentCondition.interface'
import Geocoding from './geocoding.service'
import { ICurrentWeather } from './openWeather.interface'
import icons from './icons.json' assert { type: 'json' }

class OpenWeather {
  private getIcon = ({ weather }: ICurrentCondition): string => {
    const prefix = 'wi-'
    const code = weather.id
    const weatherIcons = JSON.parse(JSON.stringify(icons))
    let icon = weatherIcons[code].icon

    // If we are not in the ranges mentioned above, add a day/night prefix.
    if (!(code > 699 && code < 800) && !(code > 899 && code < 1000)) {
      icon = 'day-' + icon
    }
    // Finally tack on the prefix.
    icon = prefix + icon
    return icon
  }
  public getCurrentWeather = async (
    searchTerm: string,
    unit: string
  ): Promise<ICurrentWeather> => {
    try {
      const geocode = new Geocoding(searchTerm)
      const geocodeObj = await geocode.getGeocode()
      const currentCondition = new CurrentWeather(geocodeObj.coordinate, unit)
      const currentConditionObj = await currentCondition.getCurrentCondition()
      const weatherIcon = this.getIcon(currentConditionObj)
      return {
        ...geocodeObj,
        ...currentConditionObj,
        weatherIcon
      }
    } catch (error) {
      throw error
    }
  }
}

export default OpenWeather
