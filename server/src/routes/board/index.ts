import { Router } from "express";
import addBoardRouter from "./addBoard";
import getUserBoardDataRouter from "./getUserBoardData";

const boardRouter = Router();

boardRouter.use("/", addBoardRouter);
boardRouter.use("/", getUserBoardDataRouter);

export default boardRouter;
