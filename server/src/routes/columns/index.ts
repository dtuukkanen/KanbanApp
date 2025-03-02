import { Router } from "express";
import createColumnRouter from "./createColumn";
import renameColumnRouter from "./renameColumn";
import deleteColumnRouter from "./deleteColumn";

// Create a new router instance for column routes
const columnsRouter = Router();

// Mount the createColumn route at /
columnsRouter.use("/", createColumnRouter);

// Mount the renameColumn route at /
columnsRouter.use("/", renameColumnRouter);

// Mount the deleteColumn route at /
columnsRouter.use("/", deleteColumnRouter);

export default columnsRouter;
