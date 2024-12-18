import React from "react";
import WeatherDisplay from "./components/WeatherDisplay";
import "./App.css"; 

const App: React.FC = () => {
  return (
    <div className="App">
      <WeatherDisplay />
    </div>
  );
};

export default App;
