import React, { useState, useEffect, useRef } from "react";
import { GoogleMap, LoadScript, Polyline, Marker } from "@react-google-maps/api";

const mapContainerStyle = { width: "100%", height: "500px" };
const defaultCenter = { lat: 26.8467, lng: 80.9462 };

const Map = ({ coordinates, speed, setTelemetry }) => {
  const [drones, setDrones] = useState([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [timeIndex, setTimeIndex] = useState(0);
  const intervalRef = useRef(null);

  useEffect(() => {
    setDrones(coordinates.map((path) => ({ id: path.id, position: path.data[0] })));
    setTimeIndex(0);
    console.log("Map Updated with New Coordinates:", coordinates);
  }, [coordinates]);

  useEffect(() => {
    if (isPlaying) {
      intervalRef.current = setInterval(() => {
        setTimeIndex((prevIndex) => {
          const newIndex = prevIndex + 1;
          if (coordinates.length === 0 || newIndex >= coordinates[0].data.length) {
            clearInterval(intervalRef.current);
            return prevIndex;
          }
          updateDronePositions(newIndex);
          return newIndex;
        });
      }, 1000 / speed);
    } else {
      clearInterval(intervalRef.current);
    }
    return () => clearInterval(intervalRef.current);
  }, [isPlaying, speed, coordinates]);

  const updateDronePositions = (index) => {
    if (coordinates.length === 0) return;

    setDrones((prevDrones) =>
      prevDrones.map((drone, i) => {
        const newPosition = coordinates[i]?.data[index] || drone.position;
        const prevPosition = coordinates[i]?.data[index - 1] || newPosition;

        if (!newPosition) return drone;

        const distance = getDistance(prevPosition, newPosition);
        const calculatedSpeed = (distance / (1 / speed)).toFixed(2);

        setTelemetry({
          lat: newPosition.lat,
          lng: newPosition.lng,
          speed: calculatedSpeed,
          altitude: (Math.random() * 100).toFixed(2),
        });

        return { ...drone, position: newPosition };
      })
    );
  };

  const getDistance = (p1, p2) => {
    if (!p1 || !p2) return 0;
    const R = 6371e3;
    const φ1 = (p1.lat * Math.PI) / 180;
    const φ2 = (p2.lat * Math.PI) / 180;
    const Δφ = ((p2.lat - p1.lat) * Math.PI) / 180;
    const Δλ = ((p2.lng - p1.lng) * Math.PI) / 180;

    const a =
      Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
      Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  };

  return (
    <LoadScript googleMapsApiKey="AIzaSyD_FfjdLGMe9ebOVoNYEWZ3KtYi9_594Ek">
      <GoogleMap mapContainerStyle={mapContainerStyle} center={defaultCenter} zoom={12}>
        {coordinates.map((path, idx) => (
          <React.Fragment key={idx}>
            <Polyline path={path.data} options={{ strokeColor: "#FF0000" }} />
            <Marker position={drones[idx]?.position} />
          </React.Fragment>
        ))}
      </GoogleMap>
      <div className="controls">
        <button onClick={() => setIsPlaying(true)}>Start</button>
        <button onClick={() => setIsPlaying(false)}>Pause</button>
      </div>
    </LoadScript>
  );
};

export default Map;
