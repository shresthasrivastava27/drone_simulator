import React from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

const TelemetryChart = ({ telemetryHistory }) => {
  return (
    <div style={{ width: "80%", marginTop: "20px" }}>
      <h3>Live Telemetry Data</h3>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={telemetryHistory}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="time" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="speed" stroke="#ff7300" name="Speed (m/s)" />
          <Line type="monotone" dataKey="altitude" stroke="#387908" name="Altitude (m)" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default TelemetryChart;
