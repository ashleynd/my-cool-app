

function showTemperature(response) {
    console.log(response.data);
    let iconElement = document.querySelector("#icon");
    iconElement.setAttribute("src", `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
    let descriptionElement = document.querySelector("#description");
    descriptionElement.innerHTML = response.data.weather[0].description;
    let windElement = document.querySelector("#wind");
    windElement.innerHTML = Math.round(response.data.wind.speed);
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
  let minutes = now.getMinutes();
  
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
  
  function searchCity(city) {
    let units = "imperial";
    let apiKey = "586b5c6f092e43c3810d28481007963a";
    let apiEndpoint = "https://api.openweathermap.org/data/2.5/weather";
    let apiUrl = `${apiEndpoint}?q=${city}&appid=${apiKey}&units=${units}`;
  
    axios.get(apiUrl).then(showTemperature);
  }
  
  let cityHere = document.querySelector("#city-form");
  cityHere.addEventListener("submit", showCity);
  
  p.innerHTML = `${day}, ${hours}:${minutes}`;
  