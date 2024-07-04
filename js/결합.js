document.querySelector(".search button").addEventListener("click", () => {
  const city = document.querySelector(".search input").value;
  if (city) {
    getWeather(city);
  }
});

function getWeather(city) {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric&lang=kr`;
  console.log(url);
  fetch(url)
    .then((response) => response.json())
    .then((data) => displayWeather(data))
    .catch((error) => {
      document.getElementById(
        "weatherInfo"
      ).innerHTML = `<div class="error"><p>날씨 정보를 가져오는 중 오류가 발생했습니다. (${error})</p></div>`;
    });
}

function getCurrentLocationWeather() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;
        const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric&lang=kr`;

        fetch(url)
          .then((response) => response.json())
          .then((data) => displayWeather(data))
          .catch((error) => {
            document.getElementById(
              "weatherInfo"
            ).innerHTML = `<div class="error"><p>날씨 정보를 가져오는 중 오류가 발생했습니다. (${error})</p></div>`;
          });
      },
      (error) => {
        let errorMessage = "";
        switch (error.code) {
          case error.PERMISSION_DENIED:
            errorMessage = "사용자가 위치 정보 요청을 거부했습니다.";
            break;
          case error.POSITION_UNAVAILABLE:
            errorMessage = "위치 정보를 사용할 수 없습니다.";
            break;
          case error.TIMEOUT:
            errorMessage = "위치 정보를 가져오는데 시간이 초과되었습니다.";
            break;
          case error.UNKNOWN_ERROR:
            errorMessage = "알 수 없는 오류가 발생했습니다.";
            break;
        }
        document.getElementById(
          "weatherInfo"
        ).innerHTML = `<div class="error"><p>현재 위치를 가져오는 중 오류가 발생했습니다. (${errorMessage})</p></div>`;
      }
    );
  } else {
    document.getElementById(
      "weatherInfo"
    ).innerHTML = `<div class="error"><p>브라우저가 위치 정보를 지원하지 않습니다.</p></div>`;
  }
}

function displayWeather(data) {
  if (data.cod === 200) {
    const iconUrl = `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
    const weatherInfo = `
            <h2>${data.name}의 날씨</h2>
            <img class="icon" src="${iconUrl}" alt="날씨 아이콘">
            <p>온도: ${data.main.temp}°C</p>
            <p>날씨: ${data.weather[0].description}</p>
            <p>습도: ${data.main.humidity}%</p>
            <p>풍속: ${data.wind.speed} m/s</p>
        `;
    document.getElementById("weatherInfo").innerHTML = weatherInfo;
  } else {
    document.getElementById(
      "weatherInfo"
    ).innerHTML = `<div class="error"><p>날씨 정보를 가져올 수 없습니다. (${data.message})</p></div>`;
  }
}
