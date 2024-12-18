import express, { Request, Response } from 'express';
import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();  // Load environment variables from .env file

const app = express();
const port = process.env.PORT || 5000;
const OPENWEATHERMAP_API_KEY = process.env.OPENWEATHERMAP_API_KEY;  // Your OpenWeatherMap API key

// Enable CORS for frontend
app.use(require('cors')());

// Fetch current weather
app.get('/api/weather', async (req: Request, res: Response) => {
  const city = req.query.city as string; // TypeScript will infer that city is a string
  
  if (!city) {
    return res.status(400).json({ message: 'City is required' });
  }

  try {
    const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${OPENWEATHERMAP_API_KEY}`);
    res.json(response.data); // Return current weather data
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching weather data' });
  }
});

// Fetch weather forecast (3 or 5 days)
app.get('/api/forecast', async (req: Request, res: Response) => {
  const city = req.query.city as string; // TypeScript will infer that city is a string
  
  if (!city) {
    return res.status(400).json({ message: 'City is required' });
  }

  try {
    const response = await axios.get(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${OPENWEATHERMAP_API_KEY}`);
    res.json(response.data); // Return forecast data
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching forecast data' });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
