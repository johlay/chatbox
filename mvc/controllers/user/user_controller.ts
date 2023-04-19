// import { Error } from "mongoose";
import { Request, Response } from "express";
import User, { UserSchema } from "../../../db/models/user_model";
import {
  applyPasswordHashing,
  getJwtAccessToken,
  validateLoginPassword,
} from "./utils";

/**
 * POST - login an user
 * @param req request object
 * @param res response object
 * @returns HTTP response containing information on user's authentication status
 */
const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email }).exec();

    if (!user) {
      return res
        .status(403)
        .json({ status: "error", message: "Authentication was unsuccessful" });
    }

    const { _id, first_name, last_name, password: userDbPassword } = user;

    await validateLoginPassword(res, password, userDbPassword);

    const payload = { _id, first_name, last_name, email };
    const jwt_access_token = getJwtAccessToken(payload);

    return res.status(200).json({
      status: "success",
      message: "Authentication was successful",
      data: { access_token: jwt_access_token, user: payload },
    });
  } catch (error: unknown) {
    return res
      .status(401)
      .json({ status: "error", message: "Authentication was unsuccessful" });
  }
};

/**
 * POST - register a new user
 * @param req request object
 * @param res response object
 * @returns HTTP response containing information on the newly registered user.
 */
const register = async (req: Request, res: Response) => {
  const { email, password, first_name, last_name } = <UserSchema>req.body;

  try {
    const hashedPassword = await applyPasswordHashing(res, password);

    const isEmailExists = await User.exists({ email: email });

    if (!isEmailExists) {
      const payload = {
        email,
        password: hashedPassword,
        first_name,
        last_name,
      };

      await User.create(payload).then((data) =>
        res.status(201).json({
          status: "success",
          message: "Successfully created a new user",
          data,
        })
      );
    } else {
      return res.status(409).json({
        status: "error",
        message: "The email address you have entered is already registered",
      });
    }
  } catch (error: unknown) {
    if (error instanceof Error) {
      return res.status(500).send({ status: "error", message: error.message });
    }
  }
};

export { login, register };
