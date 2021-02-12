import express, { Router } from "express";
import {
  getAllGps,
  getGps,
  createGps,
  updateGps,
  deleteGps,
} from "../Controllers/GpsController";

const gpsRouter: Router = express.Router();

gpsRouter
  .get("/", getAllGps)
  .post("/", createGps)
  .get("/:id", getGps)
  .put("/:id", updateGps)
  .delete("/:id", deleteGps);

export default gpsRouter;
