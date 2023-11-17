import React, { useEffect, useState } from "react";
import search_icon from "../../Assets/search.png";
import humidity_icon from "../../Assets/humidity.png";
import wind_icon from "../../Assets/wind.png";
import "./style.css";
import WeatherHistory from "../WeatherHistory";
import { getWeatherDetails } from "../../Services/WeatherService";
import { Spin, message } from "antd";

const WeatherIcon = ({ iconName }) => (
  <img src={`https://openweathermap.org/img/wn/${iconName}@4x.png`} alt="" />
);

const CurrentData = () => {
  const [city, setCity] = useState("");
  const [locationHistory, setLocationHistory] = useState([]);
  const [basicDetails, setBasicDetails] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const searchWeather = () => {
    setIsLoading(true);
    getWeatherDetails(city)
      .then((res) => {
        if (res.data.status) {
          setBasicDetails(res.data.data);
          setIsLoading(false);
          message.success({ content: res.data.message });
        } else {
          message.error({ content: res.data.message });
          setBasicDetails({});
          setIsLoading(false);
        }
      })
      .catch((err) => {
        setIsLoading(false);
        console.error(err.response.data);
        message.error({ content: err.response.data.message });
      });
  };

  useEffect(() => {
    if (Object.keys(basicDetails).length > 0) {
      const tempLocationHistory = locationHistory.filter(
        (item) => item.location !== basicDetails.location
      );
      setLocationHistory([basicDetails, ...tempLocationHistory]);
    }
  }, [basicDetails]);

  return !isLoading ? (
    <div className="main">
      <div className="container">
        <div className="top-bar">
          <input
            type="text"
            className="cityInput"
            placeholder="Search..."
            onChange={({ target: { value } }) => setCity(value)}
          />
          <div onClick={searchWeather} className="search-icon">
            <img src={search_icon} alt="search icon" />
          </div>
        </div>
        <div className="weather-image">
          {basicDetails.icon && <WeatherIcon iconName={basicDetails.icon} />}
        </div>
        <div className="weather-temp">{basicDetails.temp} °C</div>
        <div className="weather-location">{basicDetails.location}</div>
        <div className="data-container">
          <div className="element">
            <img src={wind_icon} alt="" className="icon" />
            <div className="humidiy-percent text">
              {basicDetails.speed} km/h
            </div>
            <div className="text">Wind Speed</div>
          </div>
          <div className="element">
            <img src={humidity_icon} alt="" className="icon" />
            <div className="humidiy-percent text">{basicDetails.humidity}%</div>
            <div className="text">Humidity</div>
          </div>
        </div>
        <div className="data-container">
          <div className="additional-details">
            <h2 style={{ color: "#ffff" }}>
              Feels like {basicDetails.feels_like}°C
            </h2>
            <div className="humidiy-percent text">
              Maximum temperature {basicDetails.temp_max} °C
            </div>
            <div className="humidiy-percent text">
              Minimum temperature {basicDetails.temp_min} °C
            </div>
          </div>
        </div>
      </div>
      <WeatherHistory locationHistory={locationHistory} />
    </div>
  ) : (
    <Spin
      spinning={isLoading}
      fullscreen
      className={`loading text-center`}
      size="large"
    />
  );
};

export default CurrentData;
