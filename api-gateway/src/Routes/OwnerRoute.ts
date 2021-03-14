import express, { Router } from "express";
import {
  getAllOwners,
  getOwner,
  updateOwner,
  createOwner,
  deleteOwner,
} from "../Controllers/OwnerController";
import { readLimiter, limiter } from "../Services";

const ownerRouter: Router = express.Router();

ownerRouter
  .get("/", readLimiter, getAllOwners)
  .post("/", limiter, createOwner)
  .get("/:id", limiter, getOwner)
  .put("/:id", limiter, updateOwner)
  .delete("/:id", limiter, deleteOwner);

export default ownerRouter;
