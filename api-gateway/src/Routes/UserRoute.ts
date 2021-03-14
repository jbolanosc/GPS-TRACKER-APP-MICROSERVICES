import express, { Router } from "express";
import {
  getAllUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
  loginUser,
} from "../Controllers/UserController";
import { readLimiter, limiter } from "../Services";

const userRouter: Router = express.Router();

userRouter
  .get("/", readLimiter, getAllUsers)
  .post("/", limiter, createUser)
  .get("/:id", limiter, getUser)
  .put("/:id", limiter, updateUser)
  .delete("/:id", limiter, deleteUser)
  .post("/login", limiter, loginUser);

export default userRouter;
