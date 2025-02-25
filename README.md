# drone_simulator
- The Drone Simulator App is a web application that simulates drone movement on a world map using time-series latitude and longitude data. Users can manually enter coordinates or upload a JSON file, visualize drone movements, and control the simulation with start, pause, and resume functionalities.

- Features
1. World Map Background: Uses Google Maps to display the simulation.
2. Manual Data Entry: Add latitude, longitude, and timestamp directly.
3. File Upload: Upload a JSON file containing time-series data. (Dummy json file is placed in the folder structure named : "latLong.json").
4. Drone Path Simulation: Visualize drone movement along a defined path.
5. Simulation Controls: Start, pause, and resume the drone simulation.
6. Multiple Drone Support: Simulate multiple drones at the same time.

Steps to clone the project:
1. git clone https://github.com/shresthasrivastava27/drone_simulator.git
2. cd drone-simulator
3. npm i
4. Set Up Google Maps API Key - REACT_APP_GOOGLE_MAPS_API_KEY=your_api_key_here
5. npm start
