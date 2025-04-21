import express from 'express';
import { addToCareCart,removeFromCareCart,getCareCart } from '../controllers/carecartController.js';
import authMiddleware from '../middleware/auth.js';

const CarecartRouter = express.Router();

CarecartRouter.post("/getcare",authMiddleware,addToCareCart);
CarecartRouter.post("/addcare",authMiddleware,removeFromCareCart);
CarecartRouter.post("/removecare",authMiddleware,getCareCart);

export default CarecartRouter;