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