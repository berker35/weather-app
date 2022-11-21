//Query selecting made easier.
const $ = (selector) => document.querySelector(selector);
// When city name entered, submit handler function trims the city name
// and invokes the main function with it.
$("form").addEventListener("submit", (e) => {
  e.preventDefault();
  let cityName = e.target[0].value;
  bringInfo(cityName.trim());
});
//Main function
const bringInfo = async (cityName) => {
  // cityName parameter goes to api url dinamically.
  const api = `https://api.openweathermap.org/data/2.5/weather?appid=1dfc18cb9aee578073a925c7b383a8db&q=${cityName}&units=metric`;
  const response = await fetch(api);
  const data = await response.json();
  // Below, the function fills the app with
  // weather data coming from the api.
  const imgUrl = `http://openweathermap.org/img/wn/${data.weather[0].icon}@4x.png`;
  $(".city-name").innerText = `${data.name}`;
  $(".weather-description").innerText = `${data.weather[0].description}`;
  $(".temperature-info").innerText = `${Math.round(data.main.temp)}`;
  $(".weather-image").setAttribute("src", imgUrl);
  $(".highest-temp").innerText = `${Math.round(data.main.temp_max)}`;
  $(".lowest-temp").innerText = `${Math.round(data.main.temp_min)}`;
  $(".wind").innerText = `${Math.round(data.wind.speed) + "km/h"}`;
  $(".humidity").innerText = `${data.main.humidity}%`;
  $(".pressure").innerText = `${data.main.pressure + "mb"}`;
};
// Just some placeholder city
bringInfo("Tokyo");
