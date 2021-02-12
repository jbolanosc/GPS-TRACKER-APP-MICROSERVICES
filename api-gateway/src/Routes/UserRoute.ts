import express, { Router } from "express";
import {
  getAllUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
  loginUser,
} from "../Controllers/UserController";

const userRouter: Router = express.Router();

userRouter
  .get("/", getAllUsers)
  .post("/", createUser)
  .get("/:id", getUser)
  .put("/:id", updateUser)
  .delete("/:id", deleteUser)
  .post("/login", loginUser);

export default userRouter;
