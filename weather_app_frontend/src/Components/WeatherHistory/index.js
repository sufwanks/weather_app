import { Card, Table } from "antd";
import React from "react";

function WeatherHistory({ locationHistory }) {
  const historyColoumns = [
    {
      title: "",
      dataIndex: "icon",
      render: (text) =>
        text && (
          <div
            style={{
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            <img src={`https://openweathermap.org/img/wn/${text}.png`} alt="" />
          </div>
        ),
    },
    {
      title: "LOCATION",
      dataIndex: "location",
    },
    {
      title: "TEMPRATURE (°C)",
      align: "right",
      dataIndex: "temp",
    },
    {
      title: "WIND SPEED (km/h)",
      align: "right",
      dataIndex: "speed",
    },
    {
      title: "HUMIDITY (%)",
      align: "right",
      dataIndex: "humidity",
    },
    {
      title: "SUNRISE",
      dataIndex: "sunrise",
    },
    {
      title: "SUNSET",
      dataIndex: "sunset",
    },
    {
      title: "VISIBILITY (km)",
      dataIndex: "visibility",
    },
  ];
  return (
    <div
      style={{ width: "90%", margin: "auto", paddingBottom: "2%" }}
      className="weather-history-card"
    >
      <Card>
        <h2>Weather History</h2>
        <Table
          columns={historyColoumns}
          dataSource={locationHistory}
          pagination={false}
        />
      </Card>
    </div>
  );
}

export default WeatherHistory;
