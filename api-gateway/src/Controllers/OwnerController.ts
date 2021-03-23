import { Request, Response } from "express";
import fetch from "node-fetch";
import { successResponse, errorResponse, checkStatus } from "../Services";
import * as Constants from "./Constants";

const ownerProxy: string = process.env.OWNER_PROXY || "http://localhost:7104";

export const getAllOwners = async (req: Request, res: Response) => {
  try {
    const allOwners = await fetch(`${ownerProxy}/api/owner`)
      .then(checkStatus)
      .then((res: any) => res.json());

    return res
      .json(successResponse(Constants.SUCESS_GET, allOwners))
      .status(200);
  } catch (e: any) {
    return res.status(500).send(errorResponse(e));
  }
};

export const getOwner = async (req: Request, res: Response) => {
  try {
    if (req.params.id) {
      const owner = await fetch(`${ownerProxy}/api/owner/${req.params.id}`)
        .then(checkStatus)
        .then((res: any) => res.json());

      return res.json(successResponse(Constants.SUCESS_GET, owner)).status(200);
    }
    return res.status(400).send(errorResponse(Constants.BAD_REQUEST));
  } catch (e: any) {
    return res.status(500).send(errorResponse(Constants.FAILED_GET));
  }
};

export const createOwner = async (req: Request, res: Response) => {
  try {
    const result = await fetch(`${ownerProxy}/api/owner`, {
      method: "POST",
      body: JSON.stringify(req.body),
      headers: { "Content-Type": "application/json" },
    })
      .then(checkStatus)
      .then((res: any) => res.json());

    return res
      .json(successResponse(Constants.SUCCESS_POST, result))
      .status(200);
  } catch (e: any) {
    return res
      .status(500)
      .send(errorResponse(Constants.FAILED_POST + e.toString()));
  }
};

export const updateOwner = async (req: Request, res: Response) => {
  try {
    if (req.params.id) {
      const result = await fetch(`${ownerProxy}/api/owner/${req.params.id}`, {
        method: "PUT",
        body: JSON.stringify(req.body),
        headers: { "Content-Type": "application/json" },
      })
        .then(checkStatus)
        .then((res: any) => res.json());

      return res
        .json(successResponse(Constants.SUCCESS_UPDATE, result))
        .status(200);
    }
    return res.status(400).send(errorResponse(Constants.BAD_REQUEST));
  } catch (e) {
    return res
      .status(500)
      .send(errorResponse(Constants.FAILED_UPDATE + e.toString()));
  }
};

export const deleteOwner = async (req: Request, res: Response) => {
  try {
    if (req.params.id) {
      const result = await fetch(`${ownerProxy}/api/owner/${req.params.id}`, {
        method: "DELETE",
      })
        .then(checkStatus)
        .then((res: any) => res.json());

      return res
        .json(successResponse(Constants.SUCCESS_DELETE, result))
        .status(200);
    }

    return res.status(400).send(errorResponse(Constants.BAD_REQUEST));
  } catch (e) {
    return res
      .status(500)
      .send(errorResponse(Constants.FAILED_DELETE + e.toString()));
  }
};

export const validateOwner = async (id: number) => {
  const owner = await fetch(`${ownerProxy}/api/owner/${id}`)
    .then(checkStatus)
    .then((res: any) => res.json());
  if (owner) return true;

  return false;
};
