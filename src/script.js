const form = document.querySelector(".form");
const input = document.querySelector("#input");
const cardTitle = document.querySelector(".card-title");
const cardBody = document.querySelector(".card-body");
const cardFooter = document.querySelector(".card-footer");

// takes the form input and returns the weather object
function Forecast(formInput) {
  const _API_KEY = "ahFAyjnvqCsKgxdRz4sU4pGtuABnG9Cl";
  async function getCityJson(cityInput) {
    const url = `http://dataservice.accuweather.com/locations/v1/cities/search?apikey=${_API_KEY}&q=${cityInput}`;
    try {
      let response = await fetch(url);
      return await response.json();
    } catch (error) {
      console.log(error)
    }
  };
  async function getWeatherJson(cityJson) {
    const url = `http://dataservice.accuweather.com/currentconditions/v1/${cityJson[0]['Key']}?apikey=${_API_KEY}`
    try {
      let response = await fetch(url);
      return await response.json();
    } catch (error) {
      console.log(error);
    }
  }
  async function getData() {
    const cityJson = await getCityJson(formInput);
    const weatherJson = await getWeatherJson(cityJson);
    console.log(weatherJson)
    return {
      key: cityJson[0]["Key"],
      country: cityJson[0]["AdministrativeArea"]["EnglishName"],
      tempC: weatherJson[0]["Temperature"]["Metric"]["Value"],
      tempF: weatherJson[0]["Temperature"]["Imperial"]["Value"],
      text: weatherJson[0]["WeatherText"],
      icon: weatherJson[0]["WeatherIcon"],
      day: weatherJson[0]["IsDayTime"],
      moreInfo: weatherJson[0]["Link"],
    }
  }
  return { getData }
}

function updateUI(weatherObject) {
  console.log(weatherObject)
  //functions to set the different parts of the html
}
// event listeners
form.addEventListener("submit", (e) => {
  e.preventDefault();
  let weather = Forecast(input.value)
  let weatherObject = weather.getData()
  weatherObject.then(updateUI)
  input.value = null;
});
