import express from "express";
import authMiddleware from "../middleware/auth.js";
import {
  listOrders,
  placeOrder,
  updateStatus,
  userOrders,
  verifyOrder,
  placeOrderCod,
} from "../controllers/orderController.js";
// import Rider from "../models/riderModel.js";

const orderRouter = express.Router();

orderRouter.get("/list", listOrders);
orderRouter.post("/userorders", authMiddleware, userOrders);
orderRouter.post("/place", authMiddleware, placeOrder);
orderRouter.post("/status", updateStatus);
orderRouter.post("/verify", verifyOrder);
orderRouter.post("/placecod", authMiddleware, placeOrderCod);
// orderRouter.post("/complete-order", completeOrder);
// orderRouter.post("/addrider", addRider);




// Track Rider Location
orderRouter.get("/track/:riderId", async (req, res) => {
  try {
    const rider = await Rider.findOne({ riderId: req.params.riderId });
    if (!rider) return res.status(404).json({ message: "Rider not found" });

    res.json({ riderId: rider.riderId, location: rider.location });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
});

export default orderRouter;
