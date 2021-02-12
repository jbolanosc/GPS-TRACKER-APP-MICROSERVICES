import { Request, Response } from "express";
import fetch from "node-fetch";
import { successResponse, errorResponse, checkStatus } from "../Services";
import * as Constants from "./Constants";

const reportProxy: string = process.env.REPORT_PROXY || "http://localhost:7103";

export const getAllReports = async (req: Request, res: Response) => {
  try {
    const allReports = await fetch(`${reportProxy}/api/report`)
      .then(checkStatus)
      .then((res) => res.json());
    return res
      .json(successResponse(Constants.SUCESS_GET, allReports))
      .status(200);
  } catch (e: any) {
    return res
      .json(successResponse(Constants.FAILED_GET, e.toString()))
      .status(500);
  }
};

export const getReport = async (req: Request, res: Response) => {
  try {
    if (req.params.id) {
      const report = await fetch(`${reportProxy}/api/report/${req.params.id}`)
        .then(checkStatus)
        .then((res) => res.json());

      return res
        .json(successResponse(Constants.SUCESS_GET, report))
        .status(200);
    }
    return res.json(errorResponse(Constants.BAD_REQUEST)).status(400);
  } catch (e: any) {
    return res.json(errorResponse(Constants.FAILED_GET)).status(500);
  }
};

export const createReport = async (req: Request, res: Response) => {
  try {
    console.log(req.body);
    console.log("create");
    const result = await fetch(`${reportProxy}/api/report`, {
      method: "POST",
      body: JSON.stringify(req.body),
      headers: { "Content-Type": "application/json" },
    })
      .then(checkStatus)
      .then((res) => res.json());

    return res.json(successResponse(Constants.SUCESS_GET, result)).status(200);
  } catch (e: any) {
    console.log(e);
    return res
      .json(errorResponse(Constants.FAILED_POST + e.toString()))
      .status(500);
  }
};

export const updateReport = async (req: Request, res: Response) => {
  try {
    console.log(req.body);
    console.log("EDIT");
    if (req.params.id) {
      const result = await fetch(`${reportProxy}/api/report/${req.params.id}`, {
        method: "PUT",
        body: JSON.stringify(req.body),
        headers: { "Content-Type": "application/json" },
      })
        .then(checkStatus)
        .then((res) => res.json());

      return res
        .json(successResponse(Constants.SUCCESS_UPDATE, result))
        .status(200);
    }
    return res.json(errorResponse(Constants.BAD_REQUEST)).status(400);
  } catch (e) {
    console.log(e);
    return res
      .json(errorResponse(Constants.FAILED_UPDATE + e.toString()))
      .status(500);
  }
};

export const deleteReport = async (req: Request, res: Response) => {
  try {
    if (req.params.id) {
      const result = await fetch(`${reportProxy}/api/report/${req.params.id}`, {
        method: "DELETE",
      })
        .then(checkStatus)
        .then((res) => res.json());

      return res
        .json(successResponse(Constants.SUCCESS_DELETE, result))
        .status(200);
    }

    return res.json(errorResponse(Constants.BAD_REQUEST)).status(400);
  } catch (e) {
    return res
      .json(errorResponse(Constants.FAILED_DELETE + e.toString()))
      .status(500);
  }
};
