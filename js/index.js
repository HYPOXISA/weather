const API_key = "5c96b2fa2412a67234f710da18826599";

let temp = document.querySelector("#temp"),
  place = document.querySelector("#place"),
  wind = document.querySelector("#wind"),
  des = document.querySelector("#des"),
  iconImg = document.querySelector("#icon");
App();
function App() {
  navigator.geolocation.getCurrentPosition((position) => {
    lat = position.coords.latitude;
    lon = position.coords.longitude;
    //console.log(lat, lon);
    getWeather(lat, lon);
  });
}

const getWeather = async (lat, lon) => {
  let response = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_key}&units=metric&lang=kr`
  );
  //console.log(response);
  let date = await response.json();
  console.log(date);

  temp.textContent = date.main.temp;
  place.textContent = date.name;
  wind.textContent = date.wind.speed;
  des.textContent = date.weather[0].description;
  icon = date.weather[0].icon;
  //console.log(icon);
  iconUrl = `http://openweathermap.org/img/wn/${icon}@2x.png`;
  //console.log(iconUrl);
  iconImg.setAttribute("src", iconUrl);
};
