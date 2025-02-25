import React from "react";

const Dashboard = ({ telemetry }) => {
  const { lat = 0, lng = 0, speed = 0, altitude = 0 } = telemetry || {};

  return (
    <div className="dashboard">
      <h2>Drone Telemetry</h2>
      <p>Latitude: {lat.toFixed(6)}</p>
      <p>Longitude: {lng.toFixed(6)}</p>
      <p>Speed: {speed.toFixed(2)} m/s</p>
      <p>Altitude: {altitude.toFixed(2)} m</p>
    </div>
  );
};

export default Dashboard;
