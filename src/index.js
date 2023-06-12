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

  currentCelciusTemp = Math.round(response.data.temperature.current);

  document.querySelector("#current-degrees").innerHTML = currentCelciusTemp;

  showCurrentDescription(response);

  currentCelciusFeelsLikeTemp = Math.round(response.data.temperature.feels_like)
  
  document.querySelector("#feels-like").innerHTML = currentCelciusFeelsLikeTemp;
  
  document.querySelector("#humidity").innerHTML = response.data.temperature.humidity;
  
  document.querySelector("#wind").innerHTML = Math.round(response.data.wind.speed);
 
  document.querySelector("#pressure").innerHTML = Math.round(response.data.temperature.pressure);
}

//Current Weather for High and Low Temp. from another API
function showMaxMinTempInCurrentWeather(response) {
  currentCelciusMaxTemp = Math.round(response.data.main.temp_max)
  document.querySelector("#max").innerHTML = currentCelciusMaxTemp;
  
  currentCelciusMinTemp = Math.round(response.data.main.temp_min)
  document.querySelector("#min").innerHTML = currentCelciusMinTemp;
}

function displayForecast() {
  let forecastElement = document.querySelector("#next-6-days-forecast");

  let days = ["Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  let forecastHTML = `<div class="next-6-days__container">`;
  days.forEach(function (day) {
    forecastHTML =
      forecastHTML +
      `
            <div class="next-6-days__blocks">
              <div><span class="next-6-days__day">${day}</span></div>
              <img
                src="images/weather-few-clouds.svg"
                alt="Mostly cloudy"
                class="next-6-days__image"
              />
              <div>
                <span class="next-6-days__day-temp">14° </span>
                <span class="next-6-days__night-temp">5°</span>
              </div>
            </div>
  `;
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
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

//Switching of the Container Color
function showFirstColor() {
  document.querySelector("#weather-container").style.background = "radial-gradient(circle, rgba(238, 174, 202, 1) 0%, rgba(148, 187, 233, 1) 100%)";
}

function showSecondColor() {
  document.querySelector("#weather-container").style.background = "linear-gradient(185deg, rgba(222, 224, 228, 1) 0%, rgba(142, 215, 165, 1) 50%, rgba(255, 173, 57, 1) 100%)";
}

function showThirdColor() {
  document.querySelector("#weather-container").style.background = "linear-gradient(210deg, rgba(222, 228, 228, 1) 0%, rgba(215, 142, 196, 1) 50%, rgba(211, 255, 57, 1) 100%)";
}

let changeColorFirst = document.querySelector("#btn-1");
changeColorFirst.addEventListener("click", showFirstColor);

let changeColorSecond = document.querySelector("#btn-2");
changeColorSecond.addEventListener("click", showSecondColor);

let changeColorThird = document.querySelector("#btn-3");
changeColorThird.addEventListener("click", showThirdColor);

//Fahrenheit Temperature
function showFahrenheitTemperature(event) {
  event.preventDefault();
  let currentTemperature = document.querySelector("#current-degrees");
  celciusTemperature.classList.remove("active");
  fahrenheitTemperature.classList.add("active");
  let fahrenheitValue = (currentCelciusTemp * 9) / 5 + 32;
  currentTemperature.innerHTML = Math.round(fahrenheitValue);
  
  let currentMaxTemp = document.querySelector("#max");
  let fahrenheitMaxTempValue = (currentCelciusMaxTemp * 9) / 5 + 32;
  currentMaxTemp.innerHTML = Math.round(fahrenheitMaxTempValue);

  let currentMinTemp = document.querySelector("#min");
  let fahrenheitMinTempValue = (currentCelciusMinTemp * 9) / 5 + 32;
  currentMinTemp.innerHTML = Math.round(fahrenheitMinTempValue);

  let currentFeelsLikeTemp = document.querySelector("#feels-like");
  let fahrenheitFeelsLikeTempValue = (currentCelciusFeelsLikeTemp * 9) / 5 + 32;
  currentFeelsLikeTemp.innerHTML = Math.round(fahrenheitFeelsLikeTempValue);
}

let fahrenheitTemperature = document.querySelector("#fahrenheit");
fahrenheitTemperature.addEventListener("click", showFahrenheitTemperature);

//Celsius Temperature
function showCelciusTemperature(event) {
 event.preventDefault();
  let currentTemperature = document.querySelector("#current-degrees");
  fahrenheitTemperature.classList.remove("active");
  celciusTemperature.classList.add("active");
  currentTemperature.innerHTML = currentCelciusTemp;

  let currentMaxTemp = document.querySelector("#max");
  currentMaxTemp.innerHTML = currentCelciusMaxTemp;

  let currentMinTemp = document.querySelector("#min");
  currentMinTemp.innerHTML = currentCelciusMinTemp;

  let currentFeelsLikeTemp = document.querySelector("#feels-like")
  currentFeelsLikeTemp.innerHTML = currentCelciusFeelsLikeTemp;
}

let currentCelciusTemp = null;
let currentCelciusMaxTemp = null;
let currentCelciusMinTemp = null;
let currentCelciusFeelsLikeTemp = null;

let celciusTemperature = document.querySelector("#celcius");
celciusTemperature.addEventListener("click", showCelciusTemperature);

searchCity("Kherson");
searchCityOfMaxMinTemp("Kherson");
displayForecast();