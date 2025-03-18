const apiKey = "Demo apiKeyForWeatherUseCases";
const apiUrl =
  "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");
const weatherContainer = document.querySelector(".weather");
const errorContainer = document.querySelector(".error");

const weatherIcons = {
  Haze: "images/haze.png",
  Clear: "images/clear.png",
  Clouds: "images/clouds.png",
  Drizzle: "images/drizzle.png",
  Mist: "images/mist.png",
  Rain: "images/rain.png",
  Snow: "images/snow.png",
};

const checkWeather = async (city) => {
  try {
    const response = await fetch(`${apiUrl}${city}&appid=${apiKey}`);
    if (!response.ok) throw new Error("City not found");

    const data = await response.json();

    document.querySelector(".city").innerHTML = data.name;
    document.querySelector(".temp").innerHTML = ` ${Math.round(
      data.main.temp
    )}°C`;
    document.querySelector(".humidity").innerHTML = `${data.main.humidity}%`;
    document.querySelector(".wind").innerHTML = `${data.wind.speed} km/h`;

    weatherIcon.src =
      weatherIcons[data.weather[0].main] || "images/default.png";

    weatherContainer.style.display = "block";
    errorContainer.style.display = "none";
  } catch (error) {
    weatherContainer.style.display = "none";
    errorContainer.style.display = "block";
  }
};

searchBtn.addEventListener("click", () => {
  checkWeather(searchBox.value);
});
