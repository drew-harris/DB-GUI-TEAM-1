import { verifyJWT } from "../utils/jwt.util";
import { Request, Response, NextFunction } from "express";

export default function decodeUser(req, res: Response, next: NextFunction) {
  console.log(req);
  const accessToken: string = req.headers.jwt;

  const validToken = verifyJWT(accessToken);

  if (!validToken.valid) {
    return res.status(403).json({
      message: "Invalid access token",
    });
  }

  req.user = validToken.decoded;

  next();
}
