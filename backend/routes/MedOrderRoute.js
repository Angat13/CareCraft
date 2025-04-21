import express from 'express';
import authMiddleware from '../middleware/auth.js';
import { listOrders, placeOrder,updateStatus,userOrders, verifyOrder, placeOrderCod } from '../controllers/medorderController.js';
const MedorderRouter = express.Router();

MedorderRouter.get("/listmed",listOrders);
MedorderRouter.post("/userordersmed",authMiddleware,userOrders);
MedorderRouter.post("/placemed",authMiddleware,placeOrder);
MedorderRouter.post("/statusmed",updateStatus);
MedorderRouter.post("/verifymed",verifyOrder);
MedorderRouter.post("/placecodmed",authMiddleware,placeOrderCod);

export default MedorderRouter;