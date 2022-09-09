interface ICurrentTemp {
  tempC: number
  tempF: number
  tempK: number
}

interface ITemp {
  currentTemp: ICurrentTemp
  currentTempMax: ICurrentTemp
  currentTempMin: ICurrentTemp
  currentTempFeelsLike: ICurrentTemp
}

export default ITemp
