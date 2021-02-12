import express, { Router, Request, Response } from "express";
import gpsRouter from "./GpsRoute";
import userRouter from "./UserRoute";
import reportRouter from "./ReportRoute";

const router: Router = express.Router();

router.get("/ping", (req: Request, res: Response) => {
  return res.json("Pong...");
});

router.use("/gps", gpsRouter);
router.use("/user", userRouter);
router.use("/reports", reportRouter);

export default router;
