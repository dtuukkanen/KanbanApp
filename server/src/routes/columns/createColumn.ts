import { Request, Response, Router } from "express";
import { ColumnModel } from "../../models/Column";
import validateToken from "../../middleware/auth/validateToken";
import { BoardModel } from "../../models/Board";
import mongoose from "mongoose";

const createColumnRouter = Router();

createColumnRouter.post("/:boardId", validateToken, async (req: Request, res: Response) => {
  try {
    // Extract boardId from the parameters
    const { boardId } = req.params;
    // Extract title from the request body
    const { title } = req.body;

    console.log(boardId, title);

    // Find the board
    const board = await BoardModel.findById(boardId);

    // If the board does not exist, return a 404 error
    if (!board) {
      console.error("Board not found");
      return void res.status(404).json({ message: "Board not found" });
    }

    // Create a new column document
    const newColumn = new ColumnModel({ title });
    await newColumn.save();

    // Add the new column to the board
    board.columns.push(newColumn._id as mongoose.Types.ObjectId);
    await board.save();

    // Return the newly created column
    return void res.status(201).send(newColumn);
  } catch (error: any) {
    console.error("Error saving card:", error);
    return void res.status(500).json({ message: "Internal server error" });
  }
});

export default createColumnRouter;
