import express, { Router } from "express";
import {
  getAllReports,
  getReport,
  createReport,
  updateReport,
  deleteReport,
} from "../Controllers/ReportController";

const reportRouter: Router = express.Router();

reportRouter
  .get("/", getAllReports)
  .post("/", createReport)
  .get("/:id", getReport)
  .put("/:id", updateReport)
  .delete("/:id", deleteReport);

export default reportRouter;
