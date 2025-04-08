document.addEventListener('DOMContentLoaded', () => {


  const cityInput = document.getElementById('city-input');
  const button = document.getElementById('get-weather-btn');
  const weatherInfo = document.getElementById('weather-info');
  const displayCityName = document.getElementById('city-name');
  const displaytemperature = document.getElementById('temperature');
  const cityDescription = document.getElementById('description');
  const errorMessage = document.getElementById('error-message');

  //const url= `https://api.openweathermap.org/data/2.5/weather?q={${city}}&appid={277fa6e377dfabf946838e1278ba5be0}`;


  button.addEventListener('click', async () => {
    const city = cityInput.value.trim();
    //console.log(city);

    // if (!city) return;
    try {
      const weatherData = await fetchWeatherData(city);
      displayWeatherData(weatherData);
    } catch (error) {
      showError();
    }


  })

  async function fetchWeatherData(city) {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=277fa6e377dfabf946838e1278ba5be0`;


    const response = await fetch(url);

    console.log(response);
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);

      console.log(error);
    }


    const data = await response.json();
    //console.log(data);
    return data;
  }

  function displayWeatherData(weatherData) {
    console.log(weatherData);
    
    weatherInfo.classList.remove('hidden');

    displaytemperature.innerHTML = `TEMPERATURE : ${(weatherData.main.temp - 273.15).toFixed(2)}`;

    displayCityName.innerHTML= weatherData.name;

    cityDescription.innerHTML= `WEATHER : ${weatherData.weather[0].description}`;

  }

  function showError() {
    weatherInfo.classList.add('hidden');
    errorMessage.classList.remove('hidden');
  }
})