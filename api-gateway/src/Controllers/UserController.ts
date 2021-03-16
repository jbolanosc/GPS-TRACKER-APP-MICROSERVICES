import { Request, Response } from "express";
import fetch from "node-fetch";
import { successResponse, errorResponse, checkStatus } from "../Services";
import * as Constants from "./Constants";
import { getToken } from "../Services/AuthService";

const userProxy: string = process.env.USER_PROXY || "http://localhost:7102";

export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const allUsers = await fetch(`${userProxy}/api/user`)
      .then(checkStatus)
      .then((res: any) => res.json());
    return res
      .json(successResponse(Constants.SUCESS_GET, allUsers))
      .status(200);
  } catch (e: any) {
    return res
      .status(500)
      .send(successResponse(Constants.FAILED_GET, e.toString()));
  }
};

export const getUser = async (req: Request, res: Response) => {
  try {
    if (req.params.id) {
      const user = await fetch(`${userProxy}/api/user/${req.params.id}`)
        .then(checkStatus)
        .then((res: any) => res.json());

      return res.json(successResponse(Constants.SUCESS_GET, user)).status(200);
    }
    return res.status(400).send(errorResponse(Constants.BAD_REQUEST));
  } catch (e: any) {
    return res.status(500).send(errorResponse(Constants.FAILED_GET));
  }
};

export const createUser = async (req: Request, res: Response) => {
  try {
    const result = await fetch(`${userProxy}/api/user`, {
      method: "POST",
      body: JSON.stringify(req.body),
      headers: { "Content-Type": "application/json" },
    })
      .then(checkStatus)
      .then((res: any) => res.json());

    return res.json(successResponse(Constants.SUCESS_GET, result)).status(200);
  } catch (e: any) {
    return res
      .status(500)
      .json(errorResponse(Constants.FAILED_POST + e.toString()));
  }
};

export const updateUser = async (req: Request, res: Response) => {
  try {
    if (req.params.id) {
      const result = await fetch(`${userProxy}/api/user/${req.params.id}`, {
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
    return res.json(errorResponse(Constants.BAD_REQUEST)).status(400);
  } catch (e) {
    console.log(e);
    return res
      .status(500)
      .send(errorResponse(Constants.FAILED_UPDATE + e.toString()));
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  try {
    if (req.params.id) {
      const result = await fetch(`${userProxy}/api/user/${req.params.id}`, {
        method: "DELETE",
      })
        .then(checkStatus)
        .then((res: any) => res.json());

      return res
        .json(successResponse(Constants.SUCCESS_UPDATE, result))
        .status(200);
    }

    return res.json(errorResponse(Constants.BAD_REQUEST)).status(400);
  } catch (e) {
    return res
      .status(500)
      .send(errorResponse(Constants.FAILED_UPDATE + e.toString()));
  }
};

export const loginUser = async (req: Request, res: Response) => {
  try {
    const result = await fetch(`${userProxy}/api/user/login`, {
      method: "POST",
      body: JSON.stringify(req.body),
      headers: { "Content-Type": "application/json" },
    })
      .then(checkStatus)
      .then((res: any) => res.json());

    const token = getToken(result);

    return res
      .json(successResponse(Constants.LOGIN_SUCCESS, token))
      .status(200);
  } catch (e: any) {
    return res.status(500).send(errorResponse(Constants.LOGIN_FAILED + e));
  }
};
