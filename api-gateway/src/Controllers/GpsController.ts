import { Request, Response } from "express";
import fetch from "node-fetch";
import { successResponse, errorResponse, checkStatus } from "../Services";
import * as Constants from "./Constants";

const gpsProxy: string = process.env.GPS_PROXY || "http://localhost:7101";

console.log(gpsProxy);

export const getAllGps = async (req: Request, res: Response) => {
  try {
    const allGps = await fetch(`${gpsProxy}/api/gps`)
      .then(checkStatus)
      .then((res) => res.json());

    return res.json(successResponse(Constants.SUCESS_GET, allGps)).status(200);
  } catch (e: any) {
    return res
      .json(successResponse(Constants.FAILED_GET, e.toString()))
      .status(500);
  }
};

export const getGps = async (req: Request, res: Response) => {
  try {
    if (req.params.id) {
      const gps = await fetch(`${gpsProxy}/api/gps/${req.params.id}`)
        .then(checkStatus)
        .then((res) => res.json());

      return res.json(successResponse(Constants.SUCESS_GET, gps)).status(200);
    }
    return res.json(errorResponse(Constants.BAD_REQUEST)).status(400);
  } catch (e: any) {
    return res.json(errorResponse(Constants.FAILED_GET)).status(500);
  }
};

export const createGps = async (req: Request, res: Response) => {
  try {
    const result = await fetch(`${gpsProxy}/api/gps`, {
      method: "POST",
      body: JSON.stringify(req.body),
      headers: { "Content-Type": "application/json" },
    })
      .then(checkStatus)
      .then((res) => res.json());

    return res
      .json(successResponse(Constants.SUCCESS_POST, result))
      .status(200);
  } catch (e: any) {
    console.log(e);
    return res
      .json(errorResponse(Constants.FAILED_POST + e.toString()))
      .status(500);
  }
};

export const updateGps = async (req: Request, res: Response) => {
  try {
    if (req.params.id) {
      console.log(req.body);
      console.log("EDIT");
      const result = await fetch(`${gpsProxy}/api/gps/${req.params.id}`, {
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

export const deleteGps = async (req: Request, res: Response) => {
  try {
    if (req.params.id) {
      const result = await fetch(`${gpsProxy}/api/gps/${req.params.id}`, {
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
