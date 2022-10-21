function formatDate(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];
  return `${day} ${hours}:${minutes}`;
}
function displayForecast() {
  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class="row">`;
  let days = ["Sat", "Sun", "Mon"];
  days.forEach(function (day) {
    forecastHTML +
      `<div class="col-2">
    <div class="card" style="width: 12rem;">
     <div class="card-header text-secondary" class="weather-forecast-date">Thu</div>
     <div class="card-body">
      
      <img
        src="http://openweathermap.org/img/wn/50d@2x.png"
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
  `;
  });
  forecastHTML = forecastHTML =
    forecastHTML +
    `<div class="col-2">
    <div class="card" style="width: 12rem;">
      <div class="card-header text-secondary" class="weather-forecast-date">Thu</div>
      <div class="card-body">
      <img
        src="http://openweathermap.org/img/wn/50d@2x.png"
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
  `;

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
  console.log(forecastHTML);
}
function getForecast(coordinates) {
  console.log(coordinates);
  let apiKey = `b0b9a67412cc5694fd13908f533da803`;
  let apiUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=imperial`;
  axios.get(apiUrl).then(displayForecast);
}
function displayWeather(response) {
  let output = document.querySelector("#chosen-city");
  output.innerHTML = response.data.name;
  let humidity = Math.round(response.data.main.humidity);
  let humidElement = document.querySelector("#today-humidity");
  humidElement.innerHTML = `${humidity}%`;
  fahrenheitTemperature = response.data.main.temp;
  let temperature = Math.round(fahrenheitTemperature);
  let tempElement = document.querySelector("#today-temp");
  tempElement.innerHTML = `${temperature}`;
  let descriptionElement = document.querySelector("#weather-description");
  descriptionElement.innerHTML = response.data.weather[0].description;
  let wind = Math.round(response.data.wind.speed);
  let windElement = document.querySelector("#wind-speed");
  windElement.innerHTML = `${wind}km/hr`;
  let iconElement = document.querySelector("#weather-icon");
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);
  let dateElement = document.querySelector("#todayDate");
  dateElement.innerHTML = formatDate(response.data.dt * 1000);
  getForecast(response.data.coord);
}

function searchCityTemp(city) {
  let units = "imperial";
  let apiKey = `b0b9a67412cc5694fd13908f533da803`;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(displayWeather);
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
