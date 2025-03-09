let params = new URLSearchParams({
    access_key: "687eeb640ab195f6da8b79161941892c",
    query: "New York",
    units: "f"
});

fetch(`http://api.weatherstack.com/current?${params.toString()}`)
    .then(res => res.json())
    .then(data => {
        if (data.error) {
            console.error('API Error:', data.error.info);
            document.getElementById('location').textContent = "Error fetching data";
            return;
        }

        document.getElementById('location').textContent = data.location.name;
        document.getElementById('temperature').textContent = data.current.temperature;
        document.getElementById('weather-description').textContent = data.current.weather_descriptions[0];
        document.getElementById('humidity').textContent = data.current.humidity;
        document.getElementById('wind-speed').textContent = data.current.wind_speed;
    })
    .catch(error => {
        console.error('Error:', error);
        document.getElementById('location').textContent = "Error fetching data";
    });

document.addEventListener("DOMContentLoaded", function() {
    //let temperature = 60;
    let temperature = document.getElementById('temperature').textContent = data.current.temperature;

    if (temperature < 65) {
        document.body.style.backgroundImage = "url('./pictures/sunny.jpg')";
    }
});

console.log("Temperature:", temperature);
console.log("Image Path:", './pictures/sunny.jpg');