import express, { Router } from "express";
import {
  getAllUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
  loginUser,
} from "../Controllers/UserController";
import {
  readLimiter,
  limiter,
  validateToken,
  validateAdmin,
} from "../Services";

const userRouter: Router = express.Router();

userRouter
  .get("/", readLimiter, validateToken, validateAdmin, getAllUsers)
  .post("/", limiter, validateToken, validateAdmin, createUser)
  .get("/:id", limiter, validateToken, validateAdmin, getUser)
  .put("/:id", limiter, validateToken, validateAdmin, updateUser)
  .delete("/:id", limiter, validateToken, validateAdmin, deleteUser)
  .post("/login", limiter, loginUser);

export default userRouter;
