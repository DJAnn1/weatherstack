document.addEventListener("DOMContentLoaded", function() {
    // Function to fetch weather data
    function fetchWeather(location = "New York") {
        fetch(`/api/weather?query=${encodeURIComponent(location)}`)
            .then(res => res.json())
            .then(data => {
                if (data.error) {
                    console.error('API Error:', data.error.info || data.error);
                    document.getElementById('location').textContent = "Error fetching data";
                    return;
                }
                
                // Update DOM elements with weather data
                document.getElementById('location').textContent = data.location.name;
                document.getElementById('temperature').textContent = data.current.temperature;
                document.getElementById('weather-description').textContent = data.current.weather_descriptions[0];
                document.getElementById('humidity').textContent = data.current.humidity;
                document.getElementById('wind-speed').textContent = data.current.wind_speed;
                
                // Set background image based on temperature
                let temperature = data.current.temperature;
                if (temperature < 65) {
                    document.body.style.backgroundImage = "url('./pictures/chilly.jpg')";
                } else if (temperature > 65) {
                    document.body.style.backgroundImage = "url('./pictures/sunny.jpg')";
                }
            })
            .catch(error => {
                console.error('Error:', error);
                document.getElementById('location').textContent = "Error fetching data";
            });
    }
    
    // Load default weather
    fetchWeather();
});