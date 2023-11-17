import axios from "axios";

const API_BASE_URL = "http://localhost:8080/";

/**
 * Gets Weather Details
 * @param   {String} city   city name
 * @return  {Object}        weather details as object
 */
export const getWeatherDetails = async (city) => {
  const response = await axios.get(
    `${API_BASE_URL}api/weather-data?city=${city}`
  );
  return response;
};
