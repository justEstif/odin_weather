const form = document.querySelector(".form");
const input = document.querySelector("#input");
const weatherCardContainer = document.querySelector(".weather-card-container");

// takes the form input and returns the weather object
function Forecast(formInput) {
  const _API_KEY = "ahFAyjnvqCsKgxdRz4sU4pGtuABnG9Cl";
  async function getCityJson(cityInput) {
    const url = `http://dataservice.accuweather.com/locations/v1/cities/search?apikey=${_API_KEY}&q=${cityInput}`;
    try {
      let response = await fetch(url);
      return await response.json();
    } catch (error) {
      console.log(error);
    }
  }
  async function getWeatherJson(cityJson) {
    const url = `http://dataservice.accuweather.com/currentconditions/v1/${cityJson[0]["Key"]}?apikey=${_API_KEY}`;
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
    return {
      key: cityJson[0]["Key"],
      city: cityJson[0]["AdministrativeArea"]["EnglishName"],
      country: cityJson[0]["Country"]["EnglishName"],
      precipitation: weatherJson[0]["HasPrecipitation"],
      precipitationType: weatherJson[0]["PrecipitationType"],
      tempC: weatherJson[0]["Temperature"]["Metric"]["Value"],
      tempF: weatherJson[0]["Temperature"]["Imperial"]["Value"],
      text: weatherJson[0]["WeatherText"],
      icon: weatherJson[0]["WeatherIcon"],
      day: weatherJson[0]["IsDayTime"],
      time: weatherJson[0]["LocalObservationDateTime"],
      moreInfo: weatherJson[0]["Link"],
    };
  }
  return { getData };
}

function updateUI(weatherObject) {
  const weatherCard = `
        <div class="weather-card-left">
          <div class="weather-card-title">
            <div class="weather-card-title-left">
              <h4>${weatherObject.city}, ${weatherObject.country}</h4>
            </div>
            <div class="weather-card-title-right">
              <h4>${weatherObject.time}</h4>
            </div>
          </div>
          <div class="weather-card-body">
            <div class="weather-body-left">
              <div class="temperature"><h2>${weatherObject.tempC}&#8451;</h2></div>
              <img
                class="weather-icon"
                src="src/icons/${weatherObject.icon}.svg"
                alt="weather-icon-here"
              />
            </div>
            <div class="weather-body-right">
              <div class="prec">
                <h5>Precipitation: ${weatherObject.precipitation}, ${weatherObject.precipitationType}</h5>
              </div>
              <div class="weather-text">
                <h5>Weather: ${weatherObject.text}</h5>
              </div>
              <!-- add an icon here -->
              <h5><a href="${weatherObject.moreInfo}">More Info</a></h5>
            </div>
          </div>
  `;
  weatherCardContainer.innerHTML = weatherCard;
  console.log(weatherObject);
  //functions to set the different parts of the html
}
// event listeners
form.addEventListener("submit", (e) => {
  e.preventDefault();
  let weather = Forecast(input.value);
  let weatherObject = weather.getData();
  weatherObject.then(updateUI);
  input.value = null;
});
