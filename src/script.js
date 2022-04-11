// HTML Elements
const form = document.querySelector(".form");
const input = document.querySelector("#input");

const API_KEY = "ahFAyjnvqCsKgxdRz4sU4pGtuABnG9Cl";
// format and validate input
// TODO: Use form validation
function passSearched(cityName) {
  cityName.trim();
  switch (cityName) {
    case null || "":
      return;
    default:
      getCityKey(cityName);
  }
}
async function getCityKey(cityInput) {
  const url = `http://dataservice.accuweather.com/locations/v1/cities/search?apikey=${API_KEY}&q=${cityInput}`;
  let response = await fetch(url);
  if (response.status == 200) {
    let json = await response.json();
    if (json.length !== 0) {
      const key = json[0]["Key"];
      getCityWeather(key);
    }
  }
  return;
}

async function getCityWeather(key) {
  const url = `http://dataservice.accuweather.com/currentconditions/v1/${key}?apikey=${API_KEY}`;
  let response = await fetch(url);
  let json = await response.json();
  console.log(json);
}

// event listeners
form.addEventListener("submit", (e) => {
  e.preventDefault();
  passSearched(input.value);
  // TODO: Clear input on submit
});
