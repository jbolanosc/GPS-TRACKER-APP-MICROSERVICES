import express, { Router } from "express";
import {
  getAllReports,
  getReport,
  createReport,
  updateReport,
  deleteReport,
} from "../Controllers/ReportController";
import { readLimiter, limiter } from "../Services";

const reportRouter: Router = express.Router();

reportRouter
  .get("/", readLimiter, getAllReports)
  .post("/", limiter, createReport)
  .get("/:id", limiter, getReport)
  .put("/:id", limiter, updateReport)
  .delete("/:id", limiter, deleteReport);

export default reportRouter;
