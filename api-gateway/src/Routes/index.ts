import express, { Router, Request, Response } from "express";
import gpsRouter from "./GpsRoute";
import userRouter from "./UserRoute";
import reportRouter from "./ReportRoute";
import ownerRouter from "./OwnerRoute";
import { validateToken } from "../Services";

const router: Router = express.Router();

router.get("/ping", (req: Request, res: Response) => {
  return res.json("Pong...");
});

router.use("/gps", validateToken, gpsRouter);
router.use("/user", userRouter);
router.use("/reports", validateToken, reportRouter);
router.use("/owners", validateToken, ownerRouter);

export default router;
