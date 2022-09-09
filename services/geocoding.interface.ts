import ICoordinate from 'interface/ICoordinate'

export interface IGeocodeResult {
  name: string
  lat: number
  lon: number
  country: string
}

export interface IGeocode {
  name: string
  coordinate: ICoordinate
  country: string
}
