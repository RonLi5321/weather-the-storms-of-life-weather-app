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
  let forecastElement = document.querySelector("#forecast");
  forecastElement.innerHTML = `
      <div class="container-fluid">
      <div class="five-day-projection" id="forecast">
       <div class="row">
         <div class="col-sm-15">
          </div>
          <div class="card" style="width: 12rem;">
        <div class="card-header text-secondary" > Tomorrow 
          </div>
         <div class="card-body">
           <img id="second-icon" src="src/images/partlycloudy.png" alt="Rainy"><br>
           <div class = high-and-low> <span class="temp-high">85°F</span>  <span class="temp-low">65°F</span> </div>
            <br>
    
            <br>
            <img class="humidity" src="src/images/humidity.png" alt="Humidity Icon">
            80%
            
          </div>
        </div>
            <div class="card" style="width: 12rem;">
        <div class="card-header text-secondary" > Monday
          </div>
          <div class="col-sm-15">
          </div>
                <div class="card-body">
          <img id="second-icon" src="src/images/partlycloudy.png" alt="Rainy"><br>
            <div class = high-and-low> <span class="temp-high">76°F</span>  <span class="temp-low"> 66°F</span>  </div>
            <br>
          
            <br>
            <img class="humidity" src="src/images/humidity.png" alt="Humidity">
            80%
            </div>
          </div>
            <div class="card" style="width: 12rem;">
        <div class="card-header text-secondary" > Tuesday
          </div>
            <div class="col-sm-15">
              </div>
                <div class="card-body">
 <img id="second-icon" src="src/images/partlycloudy.png" alt="Rainy"><br>
            <div class = high-and-low> <span class="temp-high"> 70°F</span>  <span class="temp-low"> 60°F</span></div>
            <br>
            
            <br>
            <img class="humidity" src="src/images/humidity.png" alt="Partly Cloudy">
            80%
            </div>
          </div>
            <div class="card" style="width: 12rem;">
        <div class="card-header text-secondary"> Wednesday
        </div>
            <div class="col-sm-15">
              </div>
                <div class="card-body">
  <img id="second-icon" src="src/images/partlycloudy.png" alt="Rainy"><br>
          <div class = high-and-low> <span class="temp-high">73°F</span> <span class="temp-low">63°F</span> </div>
            <br>
            
            <br>
            <img class="humidity" src="src/images/humidity.png" alt="Humidity">
            80%
                </div>
              </div>
            <div class="card" style="width: 12rem;">
        <div class="card-header text-secondary"> Thursday
          </div>
            <div class="col-sm-15">
              </div>
                <div class="card-body">
<img id="second-icon" src="src/images/partlycloudy.png" alt="Rainy"><br>
           <div class = high-and-low> <span class="temp-high">75°F <span class="temp-low">65°F</span></div>
            <br>
           
            <br>
            <img class="humidity" src="src/images/humidity.png" alt="Partly Cloudy">
            80%
            </div>
    </div>
    `;
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
displayForecast();
