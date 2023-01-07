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

function displayWeather(response) {
  console.log(response);
  celsiusTemperature = response.data.temperature.current;

  document.querySelector("#title").innerHTML = response.data.city;
  document.querySelector("#temperature").innerHTML =
    Math.round(celsiusTemperature);
  document.querySelector("#humidity").innerHTML =
    response.data.temperature.humidity;
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector("#feels-like").innerHTML = Math.round(
    response.data.temperature.feels_like
  );
  document.querySelector("#description").innerHTML =
    response.data.condition.description;
  document.querySelector("#time").innerHTML = formatDate(
    response.data.time * 1000
  );
  document
    .querySelector("#icon")
    .setAttribute(
      "src",
      `http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${response.data.condition.icon}.png`
    );
}

function search(city) {
  let apiKey = "8e4abct0a56ee8b9ed8700oa801393f4";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeather);
}
function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#search-city").value;
  search(city);
}

let box = document.querySelector("#input-box");
box.addEventListener("submit", handleSubmit);
search("London");

function showFehrenheitTemp(event) {
  event.preventDefault();
  let temperature = document.querySelector("#temperature");
  // remove the celsius link
  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  let fehrenheitTemp = (celsiusTemperature * 9) / 5 + 32;
  temperature.innerHTML = Math.round(fehrenheitTemp);
}
let celsiusTemperature = null;

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", showFehrenheitTemp);

function showCelsiusTemp(event) {
  event.preventDefault();
  //remove the fahrenheit link
  fahrenheitLink.classList.remove("active");
  celsiusLink.classList.add("active");
  let temperature = document.querySelector("#temperature");
  temperature.innerHTML = Math.round(celsiusTemperature);
}
let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", showCelsiusTemp);

function displayForecast() {
  let forecast = document.querySelector("#forecast");
  let days = ["Sun", "Mon", "Tues", "Wed", "Thu"];
  let forecastHTML = `<div class="row">`;
  days.forEach(function (days) {
    forecastHTML =
      forecastHTML +
      `         
            <div class="col-2">
             <div> ${days} </div>
             <i class="fa-solid fa-sun"></i>
             <div class="forecast-temp">
              <span class="temp-max">23°</span>
              <span class="temp-min"> 10°</span>
              </div>
            </div>`;
  });
  forecastHTML = forecastHTML + `</div>`;
  forecast.innerHTML = forecastHTML;
}
displayForecast();
