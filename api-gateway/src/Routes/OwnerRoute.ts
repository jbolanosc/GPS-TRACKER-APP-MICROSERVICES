import express, { Router } from "express";
import {
  getAllOwners,
  getOwner,
  updateOwner,
  createOwner,
  deleteOwner,
} from "../Controllers/OwnerController";

const ownerRouter: Router = express.Router();

ownerRouter
  .get("/", getAllOwners)
  .post("/", createOwner)
  .get("/:id", getOwner)
  .put("/:id", updateOwner)
  .delete("/:id", deleteOwner);

export default ownerRouter;
