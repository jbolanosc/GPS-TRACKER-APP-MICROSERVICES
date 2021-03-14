import express, { Router } from "express";
import {
  getAllGps,
  getGps,
  createGps,
  updateGps,
  deleteGps,
} from "../Controllers/GpsController";
import { readLimiter, limiter } from "../Services";

const gpsRouter: Router = express.Router();

gpsRouter
  .get("/", readLimiter, getAllGps)
  .post("/", limiter, createGps)
  .get("/:id", limiter, getGps)
  .put("/:id", limiter, updateGps)
  .delete("/:id", limiter, deleteGps);

export default gpsRouter;
