import { Request, Response } from "express";

/**
 * POST - register a new user
 * @param req request object
 * @param res response object
 * @returns HTTP response containing information on the newly registered user.
 */
const register = async (req: Request, res: Response) => {
  try {
    res.send("User controller").status(200);
  } catch (error: unknown) {
    if (error instanceof Error) {
      return res.status(500).send({ status: "error", message: error.message });
    }
  }
};

export { register };
