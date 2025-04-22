import { useEffect, useState } from "react";
import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";
import io from "socket.io-client";

const socket = io("http://localhost:4000"); // Connect to the backend WebSocket server

const center = { lat: 19.1365, lng: 72.8278 }; // User's fixed location

const TrackOrder = () => {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: "YOUR API KEY", // Replace with your Google Maps API key
  });

  const [rider, setRider] = useState(null); // Stores the assigned rider ID
  const [riderLocation, setRiderLocation] = useState(null); // Stores the rider's current location
  const [error, setError] = useState(null); // Stores any errors

  // Check local storage for an existing rider assignment when the component mounts
  useEffect(() => {
    const storedRider = localStorage.getItem("rider");
    const storedRiderLocation = localStorage.getItem("riderLocation");

    if (storedRider && storedRiderLocation) {
      setRider(JSON.parse(storedRider)); // Set the rider ID from local storage
      setRiderLocation(JSON.parse(storedRiderLocation)); // Set the rider's location from local storage
    } else {
      placeOrder(); // If no rider is assigned, place a new order
    }
  }, []);

  // Automatically place an order and assign a rider
  const placeOrder = async () => {
    try {
      const response = await fetch("http://localhost:4000/api/rider/place-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      });

      if (!response.ok) {
        throw new Error("No riders available");
      }

      const data = await response.json();
      setRider(data.riderId); // Set the assigned rider ID
      setRiderLocation(data.location); // Set the rider's initial location

      // Save the rider assignment to local storage
      localStorage.setItem("rider", JSON.stringify(data.riderId));
      localStorage.setItem("riderLocation", JSON.stringify(data.location));

      console.log(`Order placed! Rider ${data.riderId} assigned.`);
    } catch (error) {
      console.error("Error placing order:", error);
      setError(error.message); // Set the error message
    }
  };

  // Fetch the rider's initial location when the rider is assigned
  useEffect(() => {
    if (rider) {
      const fetchRiderLocation = async () => {
        try {
          const response = await fetch(`http://localhost:4000/api/rider/track/${rider}`);
          if (!response.ok) {
            throw new Error("Failed to fetch rider location");
          }
          const data = await response.json();
          setRiderLocation(data.location); // Update the rider's location

          // Update the rider's location in local storage
          localStorage.setItem("riderLocation", JSON.stringify(data.location));
        } catch (error) {
          console.error("Error fetching rider location:", error);
          setError(error.message); // Set the error message
        }
      };

      fetchRiderLocation(); // Fetch the rider's initial location
    }
  }, [rider]);

  // Listen for real-time rider location updates
  useEffect(() => {
    if (rider && socket.connected) {
      socket.on("locationUpdate", (data) => {
        if (data.riderId === rider) {
          setRiderLocation(data.location); // Update the rider's location in real-time

          // Update the rider's location in local storage
          localStorage.setItem("riderLocation", JSON.stringify(data.location));
        }
      });

      return () => {
        if (socket.connected) {
          socket.off("locationUpdate"); // Clean up the WebSocket listener
        }
      };
    }
  }, [rider]);

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h1>Real-Time Order Tracking</h1>

      {error && <p style={{ color: "red" }}>Error: Oopss No rider Available.The Rider will be assign shortly</p>}

      {rider && riderLocation && (
        <div>
          <h2>Rider Location</h2>
          <p>Rider ID: {rider}</p>
          <p>
            Latitude: {riderLocation.lat}, Longitude: {riderLocation.lng}
          </p>
        </div>
      )}

      {isLoaded && (
        <GoogleMap
          center={center}
          zoom={15}
          mapContainerStyle={{ width: "100%", height: "500px", marginTop: "20px" }}
        >
          {/* User's Fixed Location */}
          <Marker position={center} label="User" />

          {/* Rider Location */}
          {riderLocation && <Marker position={riderLocation} label={`Rider ${rider}`} />}
        </GoogleMap>
      )}
    </div>
  );
};

export default TrackOrder;
