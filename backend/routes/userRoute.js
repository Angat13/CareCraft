import express from "express";
import { loginUser, registerUser, addUserByAdmin, removeUserByAdmin, listUsers } from "../controllers/userController.js";

const userRouter = express.Router();

// User routes
userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);

// Admin routes
userRouter.post("/admin/add-user", addUserByAdmin);
userRouter.delete("/admin/remove-user/:id", removeUserByAdmin);
userRouter.get("/admin/list-users", listUsers);

export default userRouter;
