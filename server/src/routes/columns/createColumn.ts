import { Router } from 'express';
import { KanbanColumnModel } from '../../models/KanbanColumn';
import validateToken from '../../middleware/auth/validateToken';
import { BoardModel } from '../../models/Board';
import mongoose from 'mongoose';

const createColumnRouter = Router();

createColumnRouter.post('/:boardId', validateToken, async (req, res) => {
    try {
        const { boardId } = req.params;
        const { title } = req.body;

        console.log(boardId, title);

        // Find the board
        const board = await BoardModel.findById(boardId);
        if (!board) {
            console.error("Board not found");
            return void res.status(404).json({ message: "Board not found" });
        }

        // Create a new column document
        const newColumn = new KanbanColumnModel({ title });
        await newColumn.save();

        // Add the new column to the board
        board.columns.push(newColumn._id as mongoose.Types.ObjectId);
        await board.save();

        return void res.status(201).send(newColumn);
    } catch (error: any) {
        console.error("Error saving kanban card:", error);
        return void res.status(500).json({ message: "Internal server error" });
    }
});

export default createColumnRouter;