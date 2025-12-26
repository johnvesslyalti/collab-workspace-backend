import jwt from "jsonwebtoken";
import { env } from "../config/env";

export const signToken = (payload: object) => {
  return jwt.sign(payload, env.jwtSecret, { expiresIn: "15m" });
};

export const verifyToken = (token: string) => {
  return jwt.verify(token, env.jwtSecret);
};
