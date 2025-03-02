import { Router } from "express";
import columnsRouter from "./columns";
import cardsRouter from "./cards";
import authRouter from "./auth";
import BoardRouter from "./board";

// Create a new router to handle all the routes
const router = Router();

// Define the routes

// Routes for board-related operations
router.use("/boards", BoardRouter);

// Routes for column-related operations
router.use("/columns", columnsRouter);

// Routes for card-related operations
router.use("/cards", cardsRouter);

// Routes for authentication-related operations
router.use("/auth", authRouter);

// Export the router
export default router;
