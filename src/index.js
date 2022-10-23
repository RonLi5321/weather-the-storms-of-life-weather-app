let now = new Date();
console.log(now.getDate());

let todayDate = document.querySelector("#todayDate");
let date = now.getDate();
let hours = now.getHours();
if (hours < 10) {
  hours = `0${hours}`;
}
let minutes = now.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}
let seconds = now.getSeconds();
let year = now.getFullYear();

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let day = days[now.getDay()];
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
];
let month = months[now.getMonth()];
todayDate.innerHTML = `${day}, ${month} ${date}, ${year} ${hours}:${minutes}`;
function displayForecast() {
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class="row">`;
  let days = ["Sat", "Sun", "Mon", "Tue", "Wed"];
  days.forEach(function (day) {
    forecastHTML =
      forecastHTML +
      `
      <div class="col-sm-2">
      <div class="forecast-card">
    <div class="card" style="width: 12rem;">
     <div class="card-header text-secondary" class="weather-forecast-date">${day}</div>
     <div class="card-body">
      
      <img class="icon"
        src=""http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${forecastDay.condition.icon}.png"
        alt=""
        width="42"
      />
      <div class="weather-forecast-temperatures">
        <span class="weather-forecast-temperature-max">85°F </span>
        <span class="weather-forecast-temperature-min">65°F</span>
      </div>
      </div>
  </div>
  </div>
  </div>
  `;
  });
  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
  console.log(forecastHTML);
}

function getForecast(coordinates) {
  console.log(coordinates);
  let key = `8eddda0f7cctb6ac729734523f46ob41`;
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${key}}&units=imperial`;
  axios.get(apiUrl).then(displayForecast);
}

function displayWeather(response) {
  let output = document.querySelector("#chosen-city");
  output.innerHTML = response.data.city;
  let humidity = Math.round(response.data.temperature.humidity);
  let humidElement = document.querySelector("#today-humidity");
  humidElement.innerHTML = `${humidity}%`;
  fahrenheitTemperature = response.data.temperature.current;
  let temperature = Math.round(fahrenheitTemperature);
  let tempElement = document.querySelector("#today-temp");
  tempElement.innerHTML = `${temperature}`;
  let descriptionElement = document.querySelector("#weather-description");
  descriptionElement.innerHTML = response.data.condition.description;
  let wind = Math.round(response.data.wind.speed);
  let windElement = document.querySelector("#wind-speed");
  windElement.innerHTML = `${wind}km/hr`;
  let iconElement = document.querySelector("#weather-icon");
  iconElement.setAttribute(
    "src",
    `http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${response.data.condition.icon}.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);
  let dateElement = document.querySelector("#todayDate");
  dateElement.innerHTML = formatDate(response.data.dt * 1000);
  getForecast(response.data.coordinates);
}

function searchCityTemp(city) {
  let key = `8eddda0f7cctb6ac729734523f46ob41`;
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${key}&units=imperial`;
  axios.get(apiUrl).then(displayWeather);
}
function showPosition(position) {
  let key = `8eddda0f7cctb6ac729734523f46ob41`;
  let lon = position.coords.longitude;
  let lat = position.coords.latitude;
  let apiUrl = `https://api.shecodes.io/weather/v1/current?lon=${lon}&lat=${lat}&key=${key}&units=imperial`;
  axios.get(apiUrl).then(cityTemperature);
}

function searchCityValue(event) {
  event.preventDefault();
  let input = document.querySelector("#search-form-input");
  let output = document.querySelector("#chosen-city");
  output.innerHTML = input.value;
  searchCityTemp(input.value);
}
function showCelsiusTemperature(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#today-temp");
  let cTemp = (fahrenheitTemperature - 32) / 1.8;
  temperatureElement.innerHTML = Math.round(cTemp);
}
function showFahrenheitTemperature(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#today-temp");
  temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
}

let fahrenheitTemperature = null;

let form = document.querySelector("form");
form.addEventListener("button", searchCityValue);
form.addEventListener("submit", searchCityValue);

let celsiusTemp = document.querySelector("#celsius-temp");
celsiusTemp.addEventListener("click", showCelsiusTemperature);
let fahrenheitTemp = document.querySelector("#fahrenheit-temp");
fahrenheitTemp.addEventListener("click", showFahrenheitTemperature);

displayForecast();
