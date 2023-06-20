import bcrypt from "bcrypt";
import config from "../../../config/config";
import jwt from "jsonwebtoken";
import { UserSchema } from "../../../db/models/user_model";
import { Response } from "express";
import { Types } from "mongoose";

type JwtPayload = {
  _id: Types.ObjectId;
  first_name: UserSchema["first_name"];
  last_name: UserSchema["last_name"];
  email: UserSchema["email"];
};

export const applyPasswordHashing = async (res: Response, password: string) => {
  try {
    return await bcrypt.hash(password, config.PASSWORD_HASH_SALTROUNDS);
  } catch (error: unknown) {
    res.status(500).json({
      status: "error",
      message: "Error occurred while hashing the password",
    });
  }
};

export const getJwtAccessToken = (payload: JwtPayload) =>
  jwt.sign(payload, config.JWT_ACCESS_TOKEN_SECRET, {
    expiresIn: config.JWT_ACCESS_TOKEN_EXPIRY_TIME,
  });

export const validateLoginPassword = async (
  password: string,
  dbUserPassword: string
) => {
  return await bcrypt.compare(password, dbUserPassword);
};
