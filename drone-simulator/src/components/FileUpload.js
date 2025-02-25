import React, { useState } from "react";

const DataInput = ({ setCoordinates }) => {
  const [manualData, setManualData] = useState([]);
  const [newPoint, setNewPoint] = useState({ timestamp: "", latitude: "", longitude: "", altitude: "" });

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = (e) => {
      try {
        const parsedData = JSON.parse(e.target.result);
        setCoordinates([{ id: Date.now(), data: parsedData }]);
      } catch (error) {
        alert("Invalid file format! Please upload a valid JSON file.");
      }
    };

    reader.readAsText(file);
  };

  const handleAddPoint = () => {
    if (!newPoint.timestamp || !newPoint.latitude || !newPoint.longitude) {
      alert("Please enter timestamp, latitude, and longitude.");
      return;
    }

    const updatedData = [...manualData, {
      timestamp: parseInt(newPoint.timestamp, 10),
      latitude: parseFloat(newPoint.latitude),
      longitude: parseFloat(newPoint.longitude),
      altitude: newPoint.altitude ? parseFloat(newPoint.altitude) : 0
    }];

    setManualData(updatedData);
    setCoordinates([{ id: Date.now(), data: updatedData }]);

    setNewPoint({ timestamp: "", latitude: "", longitude: "", altitude: "" });
  };

  return (
    <div className="data-input">
      <h3>Upload or Enter Data</h3>

      <input type="file" accept=".json" onChange={handleFileUpload} />

      <hr />

      <h4>Add Coordinates Manually</h4>
      <input type="number" placeholder="Timestamp (s)" value={newPoint.timestamp} onChange={(e) => setNewPoint({ ...newPoint, timestamp: e.target.value })} />
      <input type="text" placeholder="Latitude" value={newPoint.latitude} onChange={(e) => setNewPoint({ ...newPoint, latitude: e.target.value })} />
      <input type="text" placeholder="Longitude" value={newPoint.longitude} onChange={(e) => setNewPoint({ ...newPoint, longitude: e.target.value })} />
      <input type="text" placeholder="Altitude (optional)" value={newPoint.altitude} onChange={(e) => setNewPoint({ ...newPoint, altitude: e.target.value })} />

      <button onClick={handleAddPoint}>Add Coordinates</button>
    </div>
  );
};

export default DataInput;
