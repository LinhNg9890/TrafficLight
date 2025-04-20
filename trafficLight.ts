import React, { useState, useEffect, useCallback } from "react";

// Define the possible light states
type Light = "green" | "yellow" | "red";

const TrafficLight: React.FC = () => {
  // State to store the current light
  const [currentLight, setCurrentLight] = useState<Light>("green");

  // Define intervals for each light state in milliseconds
  const lightIntervals: Record<Light, number> = {
    green: 120000,  // 2 minutes
    yellow: 10000,  // 10 seconds
    red: 30000,     // 30 seconds
  };

  // Function to cycle the lights automatically
  const cycleLights = useCallback(() => {
    setCurrentLight((prevLight) => {
      // Cycle from green -> yellow -> red -> green
      if (prevLight === "green") return "yellow";
      if (prevLight === "yellow") return "red";
      return "green";
    });
  }, []);

  // Set up the automatic light change effect
  useEffect(() => {
    // Set interval to change the light based on the current light
    const interval = setInterval(() => {
      cycleLights();
    }, lightIntervals[currentLight]);

    // Cleanup interval on unmount or light change
    return () => clearInterval(interval);
  }, [currentLight, cycleLights]);

  // Handle manual change of the light when button is clicked
  const handleManualChange = () => {
    cycleLights();
  };

  // Light styling function to render the light color
  const renderLight = (light: Light) => {
    return {
      width: "100px",
      height: "100px",
      margin: "10px auto",
      backgroundColor: currentLight === light ? light : "lightgray",
      borderRadius: "50%",
    };
  };

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      {/* Render each light */}
      <div>
        <div style={renderLight("green")} />
        <div style={renderLight("yellow")} />
        <div style={renderLight("red")} />
      </div>
      <button onClick={handleManualChange} style={{ marginTop: "20px", padding: "10px 20px" }}>
        Change Light
      </button>
    </div>
  );
};

export default TrafficLight;
