//Search form
function searchCity(city) {
  let units = "metric";
  let apiKey = "671758b590o71f73f4ceca7at502e7ba";
  let apiEndpoint = "https://api.shecodes.io/weather/v1/current";
  let apiUrl = `${apiEndpoint}?query=${city}&key=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(showCurrentWeather);
}

function searchCityOfMaxMinTemp(city) {
  let units = "metric";
  let apiKey = "ad43b41d614c72843d4867ddcfa4c147";
  let apiEndpoint = "https://api.openweathermap.org/data/2.5/weather";
  let apiUrl = `${apiEndpoint}?q=${city}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(showMaxMinTempInCurrentWeather);
}

function inputCity(event) {
  event.preventDefault();
  let searchField = document.querySelector("#search-field");
  if (!searchField.value.trim()) return;

  let city = searchField.value.trim();

  searchCity(city);
  searchCityOfMaxMinTemp(city);

  searchField.value = "";
}

searchCity("Kherson");
searchCityOfMaxMinTemp("Kherson");

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", inputCity);

//Current Date
function formatDate() {
  let current = new Date();

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ];

  let currentDay = days[current.getDay()];

  let currentDate = current.getDate();

  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
  ];

  let currentMonth = months[current.getMonth()];
  return `${currentDay}, ${currentMonth} ${currentDate}`;
}

//Current Time
function formatTime(timestamp) {
  let currentTime = new Date(timestamp * 1000);
  let currentHours = currentTime.getHours();
  if (currentHours < 10) {
    currentHours = `0${currentHours}`;
  }

  let currentMinutes = currentTime.getMinutes();
  if (currentMinutes < 10) {
    currentMinutes = `0${currentMinutes}`;
  }

  return `${currentHours}:${currentMinutes}`;
}

function showCurrentWeatherIcon(response) {
  let iconUrl = response.data.condition.icon_url;
  let icon = document.querySelector("#icon");
  let description = response.data.condition.description;
  icon.setAttribute("src", iconUrl);
  icon.setAttribute("alt", description);
}

//Description with a capital letter
function showCurrentDescription(response) {
  let currentDescription = response.data.condition.description;
  let summary = document.querySelector("#summary");
  summary.innerHTML =
    currentDescription.charAt(0).toUpperCase() + currentDescription.slice(1);
}

//Current Weather
function showCurrentWeather(response) {
  document.querySelector("#date").innerHTML = formatDate();

  document.querySelector("#time").innerHTML = formatTime(response.data.time);
  
  document.querySelector("#city").innerHTML = response.data.city;

  document.querySelector("#country").innerHTML = response.data.country;

  showCurrentWeatherIcon(response);

  document.querySelector("#current-degrees").innerHTML = Math.round(response.data.temperature.current);

  showCurrentDescription(response);
  
  document.querySelector("#feels-like").innerHTML = Math.round(response.data.temperature.feels_like);
  
  document.querySelector("#humidity").innerHTML = response.data.temperature.humidity;
  
  document.querySelector("#wind").innerHTML = Math.round(response.data.wind.speed);
 
  document.querySelector("#pressure").innerHTML = Math.round(response.data.temperature.pressure);
}


//Current Weather for High and Low Temp. from another API
function showMaxMinTempInCurrentWeather(response) {
  document.querySelector("#max").innerHTML = Math.round(response.data.main.temp_max);

  document.querySelector("#min").innerHTML = Math.round(response.data.main.temp_min);
}


//Geolocation API
function showPosition(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let units = "metric";
  let apiKey = "671758b590o71f73f4ceca7at502e7ba";
  let apiEndpoint = "https://api.shecodes.io/weather/v1/current";
  let apiUrl = `${apiEndpoint}?lon=${longitude}&lat=${latitude}&key=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(showCurrentWeather);
}

function showPositionOfMaxMinTemp(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let units = "metric";
  let apiKey = "ad43b41d614c72843d4867ddcfa4c147";
  let apiEndpoint = "https://api.openweathermap.org/data/2.5/weather";
  let apiUrl = `${apiEndpoint}?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(showMaxMinTempInCurrentWeather);
}

function showCurrentGeolocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showPosition);
  navigator.geolocation.getCurrentPosition(showPositionOfMaxMinTemp);
}

let locationButton = document.querySelector("#location-button");
locationButton.addEventListener("click", showCurrentGeolocation);

//Fahrenheit
//function showFahrenheitTemp(event) {
//  event.preventDefault();
//  let currentTemperature = document.querySelector("#current-degrees");
//  let fahrenheitValue = (15 * 9) / 5 + 32;
//  currentTemperature.innerHTML = fahrenheitValue;
//}

//let fahrenheitTemperature = document.querySelector("#fahrenheit");
//fahrenheitTemperature.addEventListener("click", showFahrenheitTemp);

//Celsius
//function showCelciusTemp(event) {
// event.preventDefault();
//  let currentTemperature = document.querySelector("#current-degrees");
//  currentTemperature.innerHTML = 15;
//}

//let celciusTemperature = document.querySelector("#celcius");
//celciusTemperature.addEventListener("click", showCelciusTemp);
