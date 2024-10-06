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
  console.log(response);
  let temperature = Math.round(response.data.temperature.current);
  temperatureElement.innerHTML = `${temperature}`;
  humidityElement.innerHTML = `${response.data.temperature.humidity}`;
  windElement.innerHTML = `${response.data.wind.speed}`;
  descriptionElement.innerHTML = `${response.data.condition.description}`;
}

function searchCity(city) {
  let apiKey = "0f30449f44055eof3b03aea49561c8dt";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}`;
  axios.get(apiUrl).then(refreshWeather);
}

function userSearch(event) {
event.preventDefault();
let searchInput = document.querySelector("#search-city");
let cityElement = document.querySelector("h1");
cityElement.innerHTML = `${searchInput.value}`;
searchCity(searchInput.value);
}

let search = document.querySelector("form");
search.addEventListener("submit", userSearch);