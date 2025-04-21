import express from "express";
import { adminSignup, adminLogin } from "../controllers/adminController.js";

const AdminRouter = express.Router();

AdminRouter.post("/signup", adminSignup);
AdminRouter.post("/login", adminLogin);

export default AdminRouter;
