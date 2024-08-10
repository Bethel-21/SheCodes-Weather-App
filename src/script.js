let dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
let monthNames = [
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

function updateDateTime() {
  let showDate = new Date();
  let day = dayNames[showDate.getDay()];
  let datenumber = showDate.getDate();
  let month = monthNames[showDate.getMonth()];
  let hour = showDate.getHours();
  let minute = showDate.getMinutes();
  let second = showDate.getSeconds();

  minute = minute < 10 ? `0${minute}` : minute;
  second = second < 10 ? `0${second}` : second;

  let onlyDate = `${day} ${month} ${datenumber}`;
  let onlyTime = `${hour}:${minute}`;

  let changeDate = document.querySelector(".date-value");
  changeDate.innerHTML = onlyDate;

  let changeTime = document.querySelector(".time-value");
  changeTime.innerHTML = onlyTime;
}

updateDateTime();

setInterval(updateDateTime, 1000);

function displayTemperature(response) {
  let changeCityContent = document.querySelector(".city-place");
  let cityElement = response.data.city;
  changeCityContent.innerHTML = cityElement;
  let temperature = Math.round(response.data.temperature.current);
  let wind = Math.round(response.data.wind.speed);
  let humidity = Math.round(response.data.temperature.humidity);
  let condition = response.data.condition.description;
  let iconValue = response.data.condition.icon_url;

  let changeTemperature = document.querySelector(".temperature-value");
  changeTemperature.innerHTML = `${temperature}ºC`;

  let changeWind = document.querySelector(".wind-value");
  changeWind.innerHTML = `${wind}km/hr`;

  let changeHumidity = document.querySelector(".humidity-value");
  changeHumidity.innerHTML = `${humidity}%`;

  let changeCondition = document.querySelector(".weather-condition");
  changeCondition.innerHTML = `${condition}`;

  let changeIcon = document.querySelector(".icon");
  changeIcon.src = `${iconValue}`;
  displayForecast(response.data.city);
}

function listenRequest(city) {
  let apiKey = "70dfc7dao135cdc12280t4b9f7470760";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}`;
  axios.get(apiUrl).then(displayTemperature);
}

function changeCity(event) {
  event.preventDefault();
  let searchInput = document.querySelector(".search-box");

  listenRequest(searchInput.value);
}

let change = document.querySelector(".form-place");
change.addEventListener("submit", changeCity);

listenRequest("Addis Ababa");

function formatDate(timestamp) {
  let date = new Date(timestamp * 1000);
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return days[date.getDay()];
}

function showForecast(response) {
  let days = ["Tue", "Wed", "Thu", "Fri", "Sat"];
  let forecastHtml = "";
  response.data.daily.forEach(function (day, index) {
    if (index < 5) {
      forecastHtml =
        forecastHtml +
        `<div class="days-container">
          <div class="forecast-day">${formatDate(day.time)}</div>
          <img src = "${day.condition.icon_url}" class = "forecast-icon"></img>
          <div class="forecast-value">
            <strong class="weather-upper-range">${Math.round(
              day.temperature.maximum
            )}ºC</strong>
            <span class="weather-lower-range">${Math.round(
              day.temperature.minimum
            )}ºC</span>
          </div>
        </div>`;
    }
  });

  let forecastElement = document.querySelector("#weather-forecast-id");
  forecastElement.innerHTML = forecastHtml;
}
showForecast();

function displayForecast(city) {
  let apiKey = "70dfc7dao135cdc12280t4b9f7470760";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}`;
  axios.get(apiUrl).then(showForecast);
}
