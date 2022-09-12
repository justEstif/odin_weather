export interface ICoordinate {
  lon: number
  lat: number
}

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
