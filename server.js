require('dotenv').config();
const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

// Serve static files from the public directory
app.use(express.static('public'));

// API endpoint for weather data
app.get('/api/weather', async (req, res) => {
    const { query } = req.query;
    const location = query || "New York";
    
    const params = new URLSearchParams({
        access_key: process.env.API_KEY,
        query: location,
        units: "f"
    });
    
    try {
        const response = await fetch(`http://api.weatherstack.com/current?${params.toString()}`);
        const data = await response.json();
        
        if (data.error) {
            return res.status(400).json({ error: data.error });
        }
        
        res.json(data);
    } catch (error) {
        console.error('Error fetching weather data:', error);
        res.status(500).json({ error: 'Failed to fetch weather data' });
    }
});

// Serve the main page
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});