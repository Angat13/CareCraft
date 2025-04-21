// import express from "express";
// import cors from "cors";
// import { connectDB } from "./config/db.js";
// import userRouter from "./routes/userRoute.js";
// import foodRouter from "./routes/foodRoute.js";
// import MedicineRouter from "./routes/MedicineRoute.js";
// import "dotenv/config";
// import cartRouter from "./routes/cartRoute.js";
// import orderRouter from "./routes/orderRoute.js";
// import CareRouter from "./routes/careRoute.js";
// import MedcartRouter from "./routes/MedcartRoute.js";
// import CarecartRouter from "./routes/carecartRoute.js";
// import MedorderRouter from "./routes/MedOrderRoute.js";
// import CareorderRouter from "./routes/CareOrderRoute.js";



// // app config
// const app = express();
// const port = process.env.PORT || 4000;

// // middlewares
// app.use(express.json());
// app.use(cors());

// // db connection
// connectDB();

// // api endpoints
// app.use("/api/user", userRouter);
// app.use("/api/food", foodRouter);
// app.use("/api/care", CareRouter);
// app.use("/images", express.static("uploads"));
// app.use("/images1", express.static("uploads1"));
// app.use("/imagess", express.static("uploads2"));
// app.use("/api/medicine", MedicineRouter);
// app.use("/api/cart", cartRouter);
// app.use("/api/medcart", MedcartRouter);
// app.use("/api/carecart", CarecartRouter);
// app.use("/api/order", orderRouter);
// app.use("/api/medorder", MedorderRouter);
// app.use("/api/careorder", CareorderRouter);




// app.get("/", (req, res) => {
//   res.send("API Working");
// });

// app.listen(port, () => console.log(`Server started on http://localhost:${port}`))
// import express from "express";
// import cors from "cors";
// import http from "http";
// import express from "express"
// import { Server as SocketServer } from "socket.io";
// import mongoose from "mongoose";
// import { connectDB } from "./config/db.js";
// import userRouter from "./routes/userRoute.js";
// import foodRouter from "./routes/foodRoute.js";
// import MedicineRouter from "./routes/MedicineRoute.js";
// import cartRouter from "./routes/cartRoute.js";
// import orderRouter from "./routes/orderRoute.js";
// import CareRouter from "./routes/careRoute.js";
// import MedcartRouter from "./routes/MedcartRoute.js";
// import CarecartRouter from "./routes/carecartRoute.js";
// import MedorderRouter from "./routes/MedOrderRoute.js";
// import "dotenv/config";
// import CareorderRouter from "./routes/CareOrderRoute.js";

// // App config
// const app = express();
// const port = process.env.PORT || 4000;
// const server = http.createServer(app); // Create HTTP server
// const io = new SocketServer(server, { cors: { origin: "*" } }); // Initialize WebSocket

// // Middlewares
// app.use(express.json());
// app.use(cors());

// // DB Connection
// connectDB();

// // Serve static images
// app.use("/images", express.static("uploads"));
// app.use("/images1", express.static("uploads1"));
// app.use("/imagess", express.static("uploads2"));

// // API Routes
// app.use("/api/user", userRouter);
// app.use("/api/food", foodRouter);
// app.use("/api/care", CareRouter);
// app.use("/api/medicine", MedicineRouter);
// app.use("/api/cart", cartRouter);
// app.use("/api/medcart", MedcartRouter);
// app.use("/api/carecart", CarecartRouter);
// app.use("/api/order", orderRouter);
// app.use("/api/medorder", MedorderRouter);
// app.use("/api/careorder", CareorderRouter);

// // Mongoose Schema for Riders
// const riderSchema = new mongoose.Schema({
//   riderId: Number,
//   location: { lat: Number, lng: Number },
//   available: Boolean,
// });

// const Rider = mongoose.model("Rider", riderSchema);

// // Initialize Riders (Run Only Once)
// const initializeRiders = async () => {
//   const existingRiders = await Rider.find();
//   if (existingRiders.length === 0) {
//     await Rider.insertMany([
//       { riderId: 1, location: { lat: 19.1365, lng: 72.8278 }, available: true },
//       { riderId: 2, location: { lat: 19.1400, lng: 72.8295 }, available: true },
//       { riderId: 3, location: { lat: 19.1380, lng: 72.8260 }, available: true },
//     ]);
//     console.log("Riders initialized");
//   }
// };
// initializeRiders();

// // Place an Order and Assign a Rider
// app.post("/api/place-order", async (req, res) => {
//   const availableRider = await Rider.findOne({ available: true });
//   if (!availableRider) return res.status(400).json({ message: "No riders available" });

//   availableRider.available = false;
//   await availableRider.save();

//   res.json({ riderId: availableRider.riderId, location: availableRider.location });
// });

// // Mark Rider as Available Again After Delivery
// app.post("/api/complete-order", async (req, res) => {
//   const { riderId } = req.body;
//   await Rider.findOneAndUpdate({ riderId }, { available: true });
//   res.json({ message: `Rider ${riderId} is now available` });
// });

// // API Endpoint to Get Rider Location
// app.get("/api/order/track/:riderId", async (req, res) => {
//   const { riderId } = req.params;
//   const rider = await Rider.findOne({ riderId: parseInt(riderId) });
//   if (!rider) return res.status(404).json({ message: "Rider not found" });

//   res.json({ location: rider.location });
// });

// // WebSocket for Real-Time Tracking
// io.on("connection", (socket) => {
//   console.log("Client connected:", socket.id);

//   // Listen for location updates from riders
//   socket.on("updateLocation", async (data) => {
//     const { riderId, location } = data;

//     // Update location in the database
//     await Rider.findOneAndUpdate({ riderId }, { location });

//     // Broadcast updated location to all clients
//     io.emit("locationUpdate", { riderId, location });
//   });

//   socket.on("disconnect", () => {
//     console.log("Client disconnected:", socket.id);
//   });
// });

// // Start Server
// server.listen(port, () => console.log(`Server started on http://localhost:${port}`));



import cors from "cors";
import http from "http";
import express from "express";
import { Server as SocketServer } from "socket.io";
import { connectDB } from "./config/db.js";
import userRouter from "./routes/userRoute.js";
import foodRouter from "./routes/foodRoute.js";
import MedicineRouter from "./routes/MedicineRoute.js";
import cartRouter from "./routes/cartRoute.js";
import orderRouter from "./routes/orderRoute.js";
import CareRouter from "./routes/careRoute.js";
import MedcartRouter from "./routes/MedcartRoute.js";
import CarecartRouter from "./routes/carecartRoute.js";
import MedorderRouter from "./routes/MedOrderRoute.js";
import CareorderRouter from "./routes/CareOrderRoute.js";
import riderRouter, { initializeSocket } from "./routes/riderRoute.js"
import Adminrouter from "./routes/adminRoute.js";
import "dotenv/config";

// App config
const app = express();
const port = process.env.PORT || 4000;
const server = http.createServer(app); // Create HTTP server
const io = new SocketServer(server, { cors: { origin: "*" } }); // Initialize WebSocket

// Middlewares
app.use(express.json());
app.use(cors());

// DB Connection
connectDB();

// Serve static images
app.use("/images", express.static("uploads"));
app.use("/images1", express.static("uploads1"));
app.use("/imagess", express.static("uploads2"));

// API Routes
app.use("/api/user", userRouter);
app.use("/api/food", foodRouter);
app.use("/api/care", CareRouter);
app.use("/api/medicine", MedicineRouter);
app.use("/api/cart", cartRouter);
app.use("/api/medcart", MedcartRouter);
app.use("/api/carecart", CarecartRouter);
app.use("/api/order", orderRouter);
app.use("/api/medorder", MedorderRouter);
app.use("/api/careorder", CareorderRouter);
app.use("/api/rider", riderRouter); // Add rider routes
app.use("/api/admin",Adminrouter)

// Initialize WebSocket for real-time tracking
initializeSocket(io);

// Start Server
server.listen(port,'0.0.0.0', () => console.log(`Server started on http://localhost:${port}`));