import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

export const getToken = (user: any) => {
  return jwt.sign(
    {
      id: user.id,
      email: user.email,
      role: user.role,
    },
    process.env.JWT_SECRET || "",
    { expiresIn: "1d" }
  );
};

export const validateToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authorization = req.headers.authorization;

  if (authorization) {
    const token = authorization.slice(7, authorization.length); // Bearer XXXXXX
    jwt.verify(token, process.env.JWT_SECRET || "", (err, decode) => {
      if (err) res.send({ msg: "invalid Token From AUTH" }).status(401);
      req.user = decode;
      next();
    });
  } else {
    res.send({ msg: "No token found" }).status(401);
  }

  if (authorization) {
    const token = authorization.slice(7, authorization.length); // Bearer XXXXXX
    jwt.verify(token, process.env.JWT_SECRET || "", (err, decode) => {
      if (err) res.send({ msg: "invalid Token From AUTH" }).status(401);
      req.user = decode;
      next();
    });
  } else {
    res.send({ msg: "No token found" }).status(401);
  }
};
