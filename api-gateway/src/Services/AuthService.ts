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
    { expiresIn: "1d", issuer: "http://api-gateway" }
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
      if (err) return res.status(401).send({ msg: "invalid Token: " + err });
      req.user = decode;
      return next();
    });
  } else {
    return res.status(401).send({ msg: "No token found" });
  }
};

export const validateAdmin = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log(req.user.role);

  if (req.user.role === "ADMIN") {
    return next();
  }
  return res.status(401).send({ msg: "Only admins allowed" });
};
