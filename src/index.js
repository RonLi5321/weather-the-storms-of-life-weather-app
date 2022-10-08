let now = new Date();
console.log(now.getDate());

let todayDate = document.querySelector("#todayDate");
let date = now.getDate();
let hours = now.getHours();
let minutes = now.getMinutes();
let seconds = now.getSeconds();
let year = now.getFullYear();

let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
let day = days[now.getDay()];
let months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];
let month = months[now.getMonth()];
todayDate.innerHTML = `${day}, ${month} ${date}, ${year} ${hours}:${minutes}`;
function displayWeather(response) {
  let humidity = Math.round(response.data.main.humidity);
  let humidElement = document.querySelector("#today-humidity");
  humidElement.innerHTML = `${humidity}%`;
  let temperature = Math.round(response.data.main.temp);
  let tempElement = document.querySelector("#today-temp");
  tempElement.innerHTML = `${temperature}`;
}

function searchCityValue(event) {
  event.preventDefault();
  let input = document.querySelector("#search-form-input");
  let output = document.querySelector("#chosen-city");
  output.innerHTML = input.value;
  searchCityTemp(input.value);
}
let form = document.querySelector("form");
form.addEventListener("button", searchCityValue);
form.addEventListener("submit", searchCityValue);
form.button.addEventListener("submit", searchCityValue);

function searchCityTemp(city) {
  let units = "imperial";
  let apiKey = `b0b9a67412cc5694fd13908f533da803`;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;

  axios.get(apiUrl).then(displayWeather);
}
function showPosition(position) {
  console.log(position.coords.latitude);
  console.log(position.coords.longitude);
}
navigator.geolocation.getCurrentPosition(showPosition);
function searchLocation(position) {
  let apiKey = "fdc5f58fba87bbe9f0f5d9037475e3b8";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(displayWeather);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

let shareLocationButton = document.querySelector("#share-location-button");
shareLocationButton.addEventListener("click", getCurrentLocation);
