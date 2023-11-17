const axios = require("axios");
const moment = require("moment/moment");

const API_KEY = "9fc44fcd4612d2d90987317ca01cf8c7"; // Replace with your actual API key

const kelvinToCelsius = (kelvin) => (kelvin - 273.15).toFixed(2);
const metersPerSecondToKilometersPerHour = (metersPerSecond) =>
  (metersPerSecond * 3.6).toFixed(2);
const metersToKilometers = (distanceInMeters) =>
  (distanceInMeters / 1000).toFixed(2);

exports.getWeatherDetails = async (req, res) => {
  const city = req.query.city;

  if (!city) {
    return res
      .status(400)
      .json({ message: "City parameter is required.", status: false });
  }

  const weatherApi = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`;

  try {
    const response = await axios.get(weatherApi);
    const weatherData = {
      icon: response.data.weather[0].icon,
      temp: kelvinToCelsius(response.data.main.temp),
      feels_like: kelvinToCelsius(response.data.main.feels_like),
      temp_min: kelvinToCelsius(response.data.main.temp_min),
      temp_max: kelvinToCelsius(response.data.main.temp_max),
      humidity: response.data.main.humidity,
      speed: metersPerSecondToKilometersPerHour(response.data.wind.speed),
      location: `${response.data.name}, ${response.data.sys.country}`,
      sunrise: moment.unix(response.data.sys.sunrise).format("hh:mm A"),
      sunset: moment.unix(response.data.sys.sunset).format("hh:mm A"),
      visibility: metersToKilometers(response.data.visibility),
      current_date: moment().format("DD-MMM-YYYY hh:mm A"),
    };

    res.json({
      data: weatherData,
      status: true,
      message: "Weather data fetched successfully",
    });
  } catch (error) {
    console.error(
      "Error fetching weather data:",
      error.response ? error.response.status : 500
    );
    res.status(error.response ? error.response.status : 500).json({
      message:
        error.response && error.response.data.message
          ? error.response.data.message
          : "Error fetching weather data",
      status: error.response ? error.response.status : 500,
    });
  }
};
