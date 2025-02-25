import React, { useState } from "react";
import Map from "./components/Map";
import DataInput from "./components/DataInput";

function App() {
  const [coordinates, setCoordinates] = useState([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [timeIndex, setTimeIndex] = useState(0);
  const [speed, setSpeed] = useState(1);

  const handleAddCoordinate = (newCoordinate) => {
    setCoordinates((prev) => [...prev, newCoordinate]);
    console.log("Updated Coordinates:", [...coordinates, newCoordinate]);
  };

  const handleFileUpload = (fileData) => {
    setCoordinates(fileData);
    setTimeIndex(0);
    setIsPlaying(false);
    console.log("File Uploaded Successfully:", fileData);
  };


  const handleSimulation = () => {
    if (coordinates.length === 0) {
      alert("Please add coordinates before simulating.");
      return;
    }
    setTimeIndex(0);
    setIsPlaying(true);
  };

  return (
    <div>
      <h1>Drone Simulator</h1>
      <DataInput onAddCoordinate={handleAddCoordinate} onFileUpload={handleFileUpload} />
      <button onClick={handleSimulation}>Simulate</button>
      <button onClick={() => setIsPlaying(false)}>Pause</button>
      <Map coordinates={coordinates} isPlaying={isPlaying} setTimeIndex={setTimeIndex} timeIndex={timeIndex} speed={speed} />
    </div>
  );
}

export default App;
