import React from "react";

const Controls = ({ isPlaying, setIsPlaying, setTimeIndex, maxTime, speed, setSpeed, resetSimulation }) => {
  return (
    <div className="controls">
      <button onClick={() => setIsPlaying(!isPlaying)}>
        {isPlaying ? "Pause" : "Start"}
      </button>
      <button onClick={resetSimulation}>Reset</button>

      <label>Speed:</label>
      <input type="range" min="0.5" max="5" step="0.5" value={speed} onChange={(e) => setSpeed(parseFloat(e.target.value))} />

      <label>Seek Time:</label>
      <input type="range" min="0" max={maxTime} step="1" onChange={(e) => setTimeIndex(parseInt(e.target.value))} />
    </div>
  );
};

export default Controls;
