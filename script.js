

function showTemperature(response) {
    console.log(response.data);
    let iconElement = document.querySelector("#icon");
    iconElement.setAttribute("src", `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
    let descriptionElement = document.querySelector("#description");
    descriptionElement.innerHTML = response.data.weather[0].description;
    let windElement = document.querySelector("#wind");
    windElement.innerHTML = Math.round(response.data.wind.speed);
    let feelsElement = document.querySelector("#feels");
    feelsElement.innerHTML = Math.round(response.data.main.feels_like);
    let humidityElement = document.querySelector("#humidity");
    humidityElement.innerHTML = response.data.main.humidity;
    let temperature = Math.round(response.data.main.temp);
    let city = response.data.name;
    let h2 = document.querySelector("h2");
    h2.innerHTML = `${temperature}°F`;
    let h3 = document.querySelector("h3");
    h3.innerHTML = `📍${city}`;
  }
  
  function showPosition(position) {
    let latitude = position.coords.latitude;
    let longitude = position.coords.longitude;
    let units = "imperial";
    let apiKey = "586b5c6f092e43c3810d28481007963a";
    let apiEndpoint = "https://api.openweathermap.org/data/2.5/weather";
    let apiUrl = `${apiEndpoint}?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=${units}`;
    let h4 = document.querySelector("h4");
    h4.innerHTML = `Your current Latitude is ${position.coords.latitude}, and your Longitude is ${position.coords.longitude}.`;
    console.log(position.coords.latitude);
    console.log(position.coords.longitude);
  
    axios.get(apiUrl).then(showTemperature);
  }
  
  navigator.geolocation.getCurrentPosition(showPosition);
  
  function getCurrentPosition() {
    navigator.geolocation.getCurrentPosition(showPosition);
  }
  
  let button = document.querySelector("button");
  button.addEventListener("click", getCurrentPosition);
  
  let now = new Date();
  console.log(now.getDate());
  
  let p = document.querySelector("p");
  let hours = now.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = now.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`
  }
  
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ];
  let day = days[now.getDay()];

  
  function showCity(event) {
    event.preventDefault();
    let cityInput = document.querySelector("#city-input");
  
    let h3 = document.querySelector("h3");
    h3.innerHTML = `📍${cityInput.value}`;
    searchCity(cityInput.value);
  }



  
  
  function displayForecast(response) {
    let forecastElement = document.querySelector("#forecast");
    forecastElement.innerHTML = null;
    let forecast = null;
    console.log(forecast);

function formatHours(timestamp) {
  let now = new Date(timestamp);
    let hours = now.getHours();
    if (hours < 10) {
      hours = `0${hours}`;
    }
    let minutes = now.getMinutes();
    if (minutes < 10) {
      minutes = `0${minutes}`
    }
    return `${hours}:${minutes}`;

  }
    for (let index = 0; index < 3; index++) {
    forecast = response.data.list[index];
    forecastElement.innerHTML += `
    <div class="col">
    <div class="card">
      <div class="card-body">
        <p class="card-text">${formatHours(forecast.dt * 1000)}</p>
        <p class="card-emoji"><img
          src="http://openweathermap.org/img/wn/${forecast.weather[0].icon}@2x.png"
          id="icon"
          /></p>
        <p class="card-text">Low ${Math.round(forecast.main.temp_min)}°F <br /> High ${Math.round(forecast.main.temp_max)}°F </p>
      </div>
    </div>
  </div>
  `; 
    }
  }


  function searchCity(city) {
    let units = "imperial";
    let apiKey = "586b5c6f092e43c3810d28481007963a";
    let apiEndpoint = "https://api.openweathermap.org/data/2.5/weather";
    let apiUrl = `${apiEndpoint}?q=${city}&appid=${apiKey}&units=${units}`;
  
    axios.get(apiUrl).then(showTemperature);

    apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=imperial`;
    axios.get(apiUrl).then(displayForecast);
  }
  
  let cityHere = document.querySelector("#city-form");
  cityHere.addEventListener("submit", showCity);
  
  p.innerHTML = `${day}, ${hours}:${minutes}`;
  
