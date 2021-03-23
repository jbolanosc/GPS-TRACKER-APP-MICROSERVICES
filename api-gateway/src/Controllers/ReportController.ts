import { validateOwner } from "./OwnerController";
import { validateGps } from "./GpsController";
import { Request, Response } from "express";
import fetch from "node-fetch";
import { successResponse, errorResponse, checkStatus } from "../Services";
import * as Constants from "./Constants";

const reportProxy: string = process.env.REPORT_PROXY || "http://localhost:7103";

export const getAllReports = async (req: Request, res: Response) => {
  try {
    const allReports = await fetch(`${reportProxy}/api/report`)
      .then(checkStatus)
      .then((res: any) => res.json());
    return res
      .json(successResponse(Constants.SUCESS_GET, allReports))
      .status(200);
  } catch (e: any) {
    return res
      .status(500)
      .send(successResponse(Constants.FAILED_GET, e.toString()));
  }
};

export const getReport = async (req: Request, res: Response) => {
  try {
    if (req.params.id) {
      const report = await fetch(`${reportProxy}/api/report/${req.params.id}`)
        .then(checkStatus)
        .then((res: any) => res.json());

      return res
        .json(successResponse(Constants.SUCESS_GET, report))
        .status(200);
    }
    return res.status(400).send(errorResponse(Constants.BAD_REQUEST));
  } catch (e: any) {
    return res.status(500).send(errorResponse(Constants.FAILED_GET));
  }
};

export const createReport = async (req: Request, res: Response) => {
  try {
    if (req.body.owner !== null && req.body.gps !== null) {
      if ((await validateGps(req.body.gps)) === false)
        return res.status(400).send(errorResponse("Invalid gps"));
      if ((await validateOwner(req.body.owner)) == false)
        return res.status(400).send(errorResponse("Invalid owner"));

      const result = await fetch(`${reportProxy}/api/report`, {
        method: "POST",
        body: JSON.stringify(req.body),
        headers: { "Content-Type": "application/json" },
      })
        .then(checkStatus)
        .then((res: any) => res.json());

      return res
        .json(successResponse(Constants.SUCESS_GET, result))
        .status(200);
    }
    return res.status(400).send(errorResponse("Invalid body"));
  } catch (e: any) {
    return res
      .status(500)
      .send(errorResponse(Constants.FAILED_POST + e.toString()));
  }
};

export const updateReport = async (req: Request, res: Response) => {
  try {
    if (req.params.id) {
      if (req.body.owner !== null && req.body.gps !== null) {
        if ((await validateGps(req.body.gps)) === false)
          return res.status(400).send(errorResponse("Invalid gps"));
        if ((await validateOwner(req.body.owner)) === false)
          return res.status(400).send(errorResponse("Invalid owner"));
        const result = await fetch(
          `${reportProxy}/api/report/${req.params.id}`,
          {
            method: "PUT",
            body: JSON.stringify(req.body),
            headers: { "Content-Type": "application/json" },
          }
        )
          .then(checkStatus)
          .then((res: any) => res.json());

        return res
          .json(successResponse(Constants.SUCCESS_UPDATE, result))
          .status(200);
      }
      return res.status(400).send(errorResponse("Invalid body"));
    }
    return res.status(400).send(errorResponse(Constants.BAD_REQUEST));
  } catch (e: any) {
    return res
      .status(500)
      .send(errorResponse(Constants.FAILED_UPDATE + e.toString()));
  }
};

export const deleteReport = async (req: Request, res: Response) => {
  try {
    if (req.params.id) {
      const result = await fetch(`${reportProxy}/api/report/${req.params.id}`, {
        method: "DELETE",
      })
        .then(checkStatus)
        .then((res: any) => res.json());

      return res
        .json(successResponse(Constants.SUCCESS_DELETE, result))
        .status(200);
    }

    return res
      .status(400)
      .send(errorResponse(Constants.BAD_REQUEST))
      .status(400);
  } catch (e) {
    return res
      .status(500)
      .send(errorResponse(Constants.FAILED_DELETE + e.toString()));
  }
};
