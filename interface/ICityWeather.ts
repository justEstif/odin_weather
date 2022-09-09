import ITemp from "./ITemp";
import ITimeDate from "./ITimeDate";
import IWeather from "./IWeather";

interface ICityWeather {
  weather: IWeather
  temp: ITemp
  timeDate: ITimeDate
}

export default ICityWeather
