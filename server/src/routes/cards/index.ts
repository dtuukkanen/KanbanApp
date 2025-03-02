import { Router } from "express";
import addCardRouter from "./addCard";
import moveCardRouter from "./moveCard";
import deleteCardRouter from "./deleteCard";

// Create a new router instance for card routes
const cardsRouter = Router();

// Mount the addCard route at /
cardsRouter.use("/", addCardRouter);

// Mount the moveCard route at /
cardsRouter.use("/", moveCardRouter);

// Mount the deleteCard route at /
cardsRouter.use("/", deleteCardRouter);

// Export the cardsRouter to be used in other parts of the application
export default cardsRouter;
