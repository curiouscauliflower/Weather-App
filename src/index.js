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

function searchCityofForecast(city) {
  let units = "metric";
  let apiKey = "671758b590o71f73f4ceca7at502e7ba";
  let apiEndpoint = "https://api.shecodes.io/weather/v1/forecast?query={query}&key={key}";
  let apiUrl = `${apiEndpoint}?query=${city}&key=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(displayForecast);
}

function inputCity(event) {
  event.preventDefault();
  let searchField = document.querySelector("#search-field");
  if (!searchField.value.trim()) return;

  let city = searchField.value.trim();

  searchField.value = "";

  searchCity(city);
  searchCityOfMaxMinTemp(city);
  searchCityofForecast(city);
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

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[day];
}

function displayForecast(response) {
  let forecast = response.data.daily;

  let forecastElement = document.querySelector("#next-6-days-forecast");
  let forecastHTML = `<div class="next-6-days__container">`;

  forecast.forEach(function (forecastDay, index) {
    if (index < 7 && index > 0) {
    forecastHTML =
      forecastHTML +
      `
            <div class="next-6-days__blocks">
              <div><span class="next-6-days__day">${formatDay(forecastDay.time)}</span></div>
              <img
                src="${forecastDay.condition.icon_url}"
                alt="${forecastDay.condition.description}"
                class="next-6-days__image"
              />
              <div>
                <span class="next-6-days__max-temp">${Math.round(forecastDay.temperature.maximum)}° </span>
                <span class="next-6-days__min-temp">${Math.round(forecastDay.temperature.minimum)}°</span>
              </div>
            </div>
  `;
    }
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

function showPositionOfForecast(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let units = "metric";
  let apiKey = "671758b590o71f73f4ceca7at502e7ba";
  let apiEndpoint = "https://api.shecodes.io/weather/v1/forecast";
  let apiUrl = `${apiEndpoint}?lon=${longitude}&lat=${latitude}&key=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(displayForecast);
}

function showCurrentGeolocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showPosition);
  navigator.geolocation.getCurrentPosition(showPositionOfMaxMinTemp);
  navigator.geolocation.getCurrentPosition(showPositionOfForecast)
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

searchCity("Kherson");
searchCityOfMaxMinTemp("Kherson");
searchCityofForecast("Kherson");