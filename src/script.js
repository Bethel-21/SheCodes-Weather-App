function displayTemperature(response) {
  let changeCityContent = document.querySelector(".city-place");
  let cityElement = response.data.city;
  changeCityContent.innerHTML = cityElement;
  let temperature = Math.round(response.data.temperature.current);
  let changeTemperature = document.querySelector(".temperature-value");
  changeTemperature.innerHTML = `${temperature}ºC`;
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
