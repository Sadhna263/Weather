async function getWeather() {
  const city = document.getElementById("cityInput").value;
  const apiKey = "40f6b68a54cc656d1fb216f8830bf9e8"; // Your OpenWeatherMap API key
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  try {
    const response = await fetch(url);

    if (!response.ok) {
      if (response.status === 401) {
        document.getElementById("weatherInfo").innerHTML = `<p>🔒 Invalid API Key</p>`;
      } else if (response.status === 404) {
        document.getElementById("weatherInfo").innerHTML = `<p>❌ City not found</p>`;
      } else {
        document.getElementById("weatherInfo").innerHTML = `<p>⚠️ Error: ${response.status}</p>`;
      }
      return;
    }

    const data = await response.json();

    const weatherHtml = `
      <h2>${data.name}, ${data.sys.country}</h2>
      <img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" alt="weather icon" />
      <p><strong>${data.weather[0].main}</strong> - ${data.weather[0].description}</p>
      <p>🌡 Temp: ${data.main.temp}°C</p>
      <p>💧 Humidity: ${data.main.humidity}%</p>
      <p>🌬 Wind: ${data.wind.speed} m/s</p>
    `;

    document.getElementById("weatherInfo").innerHTML = weatherHtml;
  } catch (error) {
    document.getElementById("weatherInfo").innerHTML = `<p>❌ Failed to fetch data. Try again.</p>`;
    console.error("Fetch error:", error);
  }
}
