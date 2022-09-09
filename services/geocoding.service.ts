import { IGeocodeResult, IGeocode } from './geocoding.interface'

class Geocoding {
  private searchTerm: string
  private url!: string

  constructor(searchTerm: string) {
    this.searchTerm = searchTerm
    this.getGeocodingLink()
    this.getApiResponse()
    this.getGeocode
  }

  private getGeocodingLink = () => {
    const apiDomain = 'http://api.openweathermap.org'
    this.url = `${apiDomain}/geo/1.0/direct?q=${this.searchTerm}&limit=5&appid=${process.env.NEXT_PUBLIC_OPEN_WEATHER_API}`
  }

  private getApiResponse = async (): Promise<IGeocodeResult[]> => {
    try {
      const response = await fetch(this.url)
      return await response.json()
    } catch (error) {
      throw 'No Geocoding API response'
    }
  }

  public getGeocode = async (): Promise<IGeocode> => {
    try {
      const geoCodeResult = await this.getApiResponse()
      return {
        name: geoCodeResult[0].name,
        coordinate: {
          lat: geoCodeResult[0].lat,
          lon: geoCodeResult[0].lon
        },
        country: geoCodeResult[0].country
      }
    } catch (error) {
      throw error
    }
  }
}

export default Geocoding
