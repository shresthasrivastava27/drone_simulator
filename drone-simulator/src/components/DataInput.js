import React, { useState } from "react";

const DataInput = ({ onAddCoordinate, onFileUpload }) => {
  const [timestamp, setTimestamp] = useState("");
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");

  const handleAdd = () => {
    if (!timestamp || !latitude || !longitude) {
      alert("Please enter timestamp, latitude, and longitude.");
      return;
    }

    const newCoordinate = {
      id: Date.now(),
      data: [{ timestamp, lat: parseFloat(latitude), lng: parseFloat(longitude) }]
    };

    onAddCoordinate(newCoordinate);
    alert("Coordinate added successfully!");

    setTimestamp("");
    setLatitude("");
    setLongitude("");
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const jsonData = JSON.parse(e.target.result);

        if (!Array.isArray(jsonData) || jsonData.length === 0 || !jsonData[0].data || !Array.isArray(jsonData[0].data)) {
          throw new Error("Invalid JSON format.");
        }

        onFileUpload(jsonData);
        alert("File uploaded successfully!");
      } catch (error) {
        alert("Invalid file format. Please check the structure.");
        console.error("File Upload Error:", error);
      }
    };

    reader.readAsText(file);
  };


  return (
    <div>
      <h2>Enter Coordinates</h2>
      <input type="datetime-local" value={timestamp} onChange={(e) => setTimestamp(e.target.value)} />
      <input type="number" placeholder="Latitude" value={latitude} onChange={(e) => setLatitude(e.target.value)} />
      <input type="number" placeholder="Longitude" value={longitude} onChange={(e) => setLongitude(e.target.value)} />
      <button onClick={handleAdd}>Add Coordinate</button>

      <h2>Upload JSON File</h2>
      <input type="file" accept=".json" onChange={handleFileUpload} />
    </div>
  );
};

export default DataInput;
