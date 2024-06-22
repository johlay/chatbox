import userRouter from "./auth_router";
import { Router, Request, Response, NextFunction } from "express";

const router = Router();

router.get("/", (_req: Request, res: Response, _next: NextFunction) =>
  res.sendStatus(200)
);

router.use("/auth", userRouter);

export default router;
