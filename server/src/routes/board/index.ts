import { Router } from "express";
import addBoardRouter from "./addBoard";
import getUserBoardDataRouter from "./getUserBoardData";

// Create a new router instance for board routes
const boardRouter = Router();

// Mount the addBoard route at /
boardRouter.use("/", addBoardRouter);

// Mount the getUserBoardData route at /
boardRouter.use("/", getUserBoardDataRouter);

// Export the boardRouter to be used in other parts of the application
export default boardRouter;
