import express from 'express';
import authMiddleware from '../middleware/auth.js';
import { listOrders,userOrders,placeOrder,placeOrderCod,updateStatus,verifyOrder } from '../controllers/careorderController.js';
const CareorderRouter = express.Router();

CareorderRouter.get("/listcare",listOrders);
CareorderRouter.post("/userorderscare",authMiddleware,userOrders);
CareorderRouter.post("/placecare",authMiddleware,placeOrder);
CareorderRouter.post("/statuscare",updateStatus);
CareorderRouter.post("/verifycare",verifyOrder);
CareorderRouter.post("/placecodcare",authMiddleware,placeOrderCod);

export default CareorderRouter;