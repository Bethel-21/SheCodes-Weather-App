function changeCity(event) {
  event.preventDefault();
  let searchInput = document.querySelector(".search-box");
  let changeCity = document.querySelector(".city-place");
  changeCity.innerHTML = searchInput.value;
}
let change = document.querySelector(".form-place");
change.addEventListener("submit", changeCity);
