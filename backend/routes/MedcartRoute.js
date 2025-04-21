import express from 'express';
import { addToMedCart, getMedCart, removeFromMedCart } from '../controllers/medcartController.js';
import authMiddleware from '../middleware/auth.js';

const MedcartRouter = express.Router();

MedcartRouter.post("/getmed",authMiddleware,getMedCart);
MedcartRouter.post("/addmed",authMiddleware,addToMedCart);
MedcartRouter.post("/removemed",authMiddleware,removeFromMedCart);

export default MedcartRouter;