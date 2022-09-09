interface ICurrentTemp {
  tempC: string
  tempF: string
  tempK: string
}

interface ITemp {
  currentTemp: ICurrentTemp
  currentTempMax: ICurrentTemp
  currentTempMin: ICurrentTemp
  currentTempFeelsLike: ICurrentTemp
}

export default ITemp
