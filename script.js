function formatDateTime(date) {
    // Example: Friday, 21 June 2025, 14:05
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    let dateString = date.toLocaleDateString(undefined, options);
    let timeString = date.toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit' });
    return `${dateString}, ${timeString}`;
}

function displayWeather(response) {
    let temperatureElement = document.querySelector("#temperature");
    let temperature = response.data.temperature.current;
    let cityElement = document.querySelector("#city");
    let descriptionElement = document.querySelector("#description");
    let humidityElement = document.querySelector("#humidity");
    let windElement = document.querySelector("#wind");
    let iconElement = document.querySelector("#weather-icon");
    let dateTimeElement = document.querySelector("#date-time");
    console.log(response.data);

    cityElement.innerHTML = response.data.city;
    temperatureElement.innerHTML = Math.round(temperature);
    descriptionElement.innerHTML = response.data.condition.description;
    humidityElement.innerHTML = response.data.temperature.humidity;
    windElement.innerHTML = Math.round(response.data.wind.speed);
    iconElement.src = response.data.condition.icon_url;
    iconElement.style.display = "inline";
    iconElement.alt = response.data.condition.description;

    // Set date and time
    dateTimeElement.innerHTML = formatDateTime(new Date());
}

function searchCity(city) {
    let apiKey = "0a5ftb8a17fo0d7c10bf89f741ec7423";
    let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
    axios.get(apiUrl).then(displayWeather);
    console.log(apiUrl);
}

function handleSearchSubmit(event) {
    event.preventDefault();
    let searchInput = document.querySelector("#search-form-input");
    searchCity(searchInput.value);
}

let searchFormElement = document.querySelector("#search-form");
searchFormElement.addEventListener("submit", handleSearchSubmit);

// Load default city on page load
searchCity("Johannesburg");