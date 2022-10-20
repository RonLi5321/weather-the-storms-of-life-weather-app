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

function displayForecast(response) {
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class="row">`;
  // let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
  forecast.forEach(function (forecastDay, index) {
    if (index < 5) {
      let iconCode = forecastDay.weather[0].icon;
      forecastHTML =
        forecastHTML +
        `  
         <div class="col-2">
        <div class="day-item">
          <div class="week-day">${formatDay(forecastDay.dt)}</div>
          <img src="${changeIcon(iconCode)}" alt="" width="48" />
          <div class="day-temperature">${Math.round(
            forecastDay.temp.day
          )}°</div>
        </div>
      </div>
      `;
    }
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}
function changeIcon(iconCode) {
  let weatherIcon = "";

  if ([`09d`, `09n`, `10d`, `10n`].includes(iconCode)) {
    weatherIcon = "images/rainy.svg";
  } else {
    if (iconCode === `01d`) {
      weatherIcon = "images/day.svg";
    } else {
      if (iconCode === `01n`) {
        weatherIcon = "images/night.svg";
      } else {
        if (iconCode === `02d`) {
          weatherIcon = "images/cloudy-day.svg";
        } else {
          if (iconCode === `02n`) {
            weatherIcon = "images/cloudy-night.svg";
          } else {
            if ([`03d`, `04d`, `03n`, `04n`, `50d`, `50n`].includes(iconCode)) {
              weatherIcon = "images/cloudy.svg";
            } else {
              if ([`11d`, `11n`].includes(iconCode)) {
                weatherIcon = "images/thunder.svg";
              } else {
                if ([`13d`, `13n`].includes(iconCode)) {
                  weatherIcon = "images/snowy.svg";
                }
              }
            }
          }
        }
      }
    }
  }

  return weatherIcon;
}

function getForecast(coordinates) {
  console.log(coordinates);
  let apiKey = "ca0db41e2e878c74a1dfc7ffece370d4";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;

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
displayForecast();
let celsiusTemp = document.querySelector("#celsius-temp");
celsiusTemp.addEventListener("click", showCelsiusTemperature);
let fahrenheitTemp = document.querySelector("#fahrenheit-temp");
fahrenheitTemp.addEventListener("click", showFahrenheitTemperature);
function searchCityTemp(city) {
  let units = "imperial";
  let apiKey = `b0b9a67412cc5694fd13908f533da803`;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(displayWeather);
}
