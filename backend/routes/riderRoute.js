import express from "express";
import Rider from "../models/riderModel.js";

const router = express.Router();

// Place an Order and Assign a Rider
router.post("/place-order", async (req, res) => {
  try {
    const availableRider = await Rider.findOne({ available: true });
    if (!availableRider) {
      return res.status(400).json({ message: "No riders available" });
    }

    availableRider.available = false;
    await availableRider.save();

    res.json({ riderId: availableRider.riderId, location: availableRider.location });
  } catch (error) {
    res.status(500).json({ message: "Error placing order", error: error.message });
  }
});

// Mark Rider as Available Again After Delivery
router.post("/complete-order", async (req, res) => {
  try {
    const { riderId } = req.body;
    await Rider.findOneAndUpdate({ riderId }, { available: true });
    res.json({ message: `Rider ${riderId} is now available` });
  } catch (error) {
    res.status(500).json({ message: "Error completing order", error: error.message });
  }
});

// API Endpoint to Get Rider Location
router.get("/track/:riderId", async (req, res) => {
  try {
    const { riderId } = req.params;
    const rider = await Rider.findOne({ riderId: parseInt(riderId) });
    if (!rider) {
      return res.status(404).json({ message: "Rider not found" });
    }

    res.json({ location: rider.location });
  } catch (error) {
    res.status(500).json({ message: "Error fetching rider location", error: error.message });
  }
});

// WebSocket for Real-Time Tracking
export const initializeSocket = (io) => {
  io.on("connection", (socket) => {
    console.log("Client connected:", socket.id);

    // Listen for location updates from riders
    socket.on("updateLocation", async (data) => {
      try {
        const { riderId, location } = data;
        await Rider.findOneAndUpdate({ riderId }, { location });
        io.emit("locationUpdate", { riderId, location });
      } catch (error) {
        console.error("Error updating rider location:", error);
      }
    });

    socket.on("disconnect", () => {
      console.log("Client disconnected:", socket.id);
    });
  });
};

export default router;