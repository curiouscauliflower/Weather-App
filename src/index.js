//Date
function formatDate(current) {
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
  return `${currentDay} ${currentDate} ${currentMonth}`;
}

let date = document.querySelector("#date");
let nowDate = new Date();
date.innerHTML = formatDate(nowDate);

//Time
function formatTime(currentT) {
  let currentHours = currentT.getHours();
  if (currentHours < 10) {
    currentHours = `0${currentHours}`;
  }

  let currentMinutes = currentT.getMinutes();
  if (currentMinutes < 10) {
    currentMinutes = `0${currentMinutes}`;
  }

  return `${currentHours}:${currentMinutes}`;
}

let time = document.querySelector("#time");
let nowTime = new Date();
time.innerHTML = formatTime(nowTime);

//Search form
function searchCity(city) {
  let units = "metric";
  let apiKey = "ad43b41d614c72843d4867ddcfa4c147";
  let apiEndpoint = "https://api.openweathermap.org/data/2.5/weather";
  let apiUrl = `${apiEndpoint}?q=${city}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(showCurrentWeather);
}

function inputCity(event) {
  event.preventDefault();
  let searchField = document.querySelector("#search-field");
  if (!searchField.value.trim()) return;

  let city = searchField.value.trim();

  searchCity(city);

  searchField.value = "";
}

searchCity("Kherson")

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", inputCity);

//Geolocation

function showCurrentCountry(response) {
  let currentCountry = response.data.sys.country;
  let countryName = document.querySelector("#country");
  countryName.innerHTML = currentCountry;
  if (currentCountry === "UA") {
    countryName.innerHTML = " Ukraine";
  } else {
    countryName.innerHTML = " not Ukraine";
  }
}

function showCurrentDescription(response) {
  let currentDescription = response.data.weather[0].description;
  let summary = document.querySelector("#summary");
  summary.innerHTML =
    currentDescription.charAt(0).toUpperCase() + currentDescription.slice(1);
}

function showCurrentWeather(response) {
  document.querySelector("#city").innerHTML = response.data.name;
  showCurrentCountry(response);

  document.querySelector("#current-degrees").innerHTML = Math.round(response.data.main.temp);

  showCurrentDescription(response);
  
  document.querySelector("#max").innerHTML = Math.round(response.data.main.temp_max);

  document.querySelector("#min").innerHTML = Math.round(response.data.main.temp_min);
  
  document.querySelector("#feels-like").innerHTML = Math.round(response.data.main.feels_like);
  

  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  
  document.querySelector("#wind").innerHTML = Math.round(response.data.wind.speed);
 
  document.querySelector("#pressure").innerHTML = Math.round(response.data.main.pressure);
}

function showPosition(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let units = "metric";
  let apiKey = "ad43b41d614c72843d4867ddcfa4c147";
  let apiEndpoint = "https://api.openweathermap.org/data/2.5/weather";
  let apiUrl = `${apiEndpoint}?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=${units}`;
  console.log(apiUrl);
  axios.get(apiUrl).then(showCurrentWeather);
}

function showCurrentGeolocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showPosition);
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
