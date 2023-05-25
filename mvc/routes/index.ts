import userRouter from "./user_router";
import { Router, Request, Response, NextFunction } from "express";

const router = Router();

router.get("/", (_req: Request, res: Response, _next: NextFunction) =>
  res.sendStatus(200)
);

router.use("/user", userRouter);

export default router;
