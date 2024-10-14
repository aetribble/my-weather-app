let currentTime = new Date();
function formatDate(date) {
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
]
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
  "December",
]
let currentDay = days[date.getDay()];
let currentDate = date.getDate();
let currentMonth = months[date.getMonth()];
let currentHour = date.getHours();
let currentMinute = date.getMinutes();
if (currentMinute < 10) {
  currentMinute = `0${currentMinute}`
}
let formattedDate = `${currentDay} ${currentDate} ${currentMonth}, ${currentHour}:${currentMinute}`
return formattedDate;
}
let date = document.querySelector("#date");
date.innerHTML = `${formatDate(currentTime)}`;

function refreshWeather(response) {
  let temperatureElement = document.querySelector("#weather");
  let humidityElement = document.querySelector("#humidity");
  let windElement = document.querySelector("#wind-speed");
  let descriptionElement = document.querySelector("#description");
  let cityElement = document.querySelector("h1");
  let temperature = Math.round(response.data.temperature.current);
  let iconElement = document.querySelector("#weather-icon");
  let icon = `<img src="${response.data.condition.icon_url}" class="weather-icon"/>`
  temperatureElement.innerHTML = `${temperature}`;
  humidityElement.innerHTML = `${response.data.temperature.humidity}`;
  windElement.innerHTML = `${response.data.wind.speed}`;
  descriptionElement.innerHTML = `${response.data.condition.description}`;
  cityElement.innerHTML = `${response.data.city}`;
  iconElement.innerHTML = `${icon}`;
  getForecast(response.data.city);
}

function searchCity(city) {
  let apiKey = "0f30449f44055eof3b03aea49561c8dt";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}`;
  axios.get(apiUrl).then(refreshWeather);
}

function userSearch(event) {
event.preventDefault();
let searchInput = document.querySelector("#search-city");
searchCity(searchInput.value);
}

let search = document.querySelector("form");
search.addEventListener("submit", userSearch);

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let days = [ "Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun",];

  return days[date.getDay()];
}


function getForecast(city) {
  let apiKey = "0f30449f44055eof3b03aea49561c8dt";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}`;
  axios.get(apiUrl).then(displayForecast);
}

function displayForecast(response) {
  console.log(response.data);
  let forecast = document.querySelector("#forecast");
  
  let forecastHtml = "";
  response.data.daily.forEach(function (day, index) {
    if (index < 5) {
    forecastHtml = forecastHtml + `
        <div class="forecast-day">
        <p><strong>${formatDay(day.time)}</strong></p>
        <img src="${day.condition.icon_url}" alt="${day.condition.icon} icon" class="forecast-icon">
        <div class="temp-forecast">
          <div class="high-temp">${Math.round(day.temperature.maximum)}<span>°C</span></div>
          <div class="low-temp">${Math.round(day.temperature.minimum)}<span>°C</span></div>
        </div>
      </div>
      `;
  }
    });
forecast.innerHTML = forecastHtml;
}

searchCity("London");