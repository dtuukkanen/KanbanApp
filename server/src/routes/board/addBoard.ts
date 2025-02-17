import { Router } from 'express';
import mongoose from 'mongoose';
import validateToken from '../../middleware/auth/validateToken';
import { BoardModel } from '../../models/Board';
import { UserModel } from '../../models/User';

const addBoardRouter = Router();

addBoardRouter.post('/:userId', validateToken, async (req, res) => {
    try {
        // Extract the title from the request body
        const { userId } = req.params;
        const { title } = req.body;

        // Create a new Board document
        const newBoard = new BoardModel({ title });

        // Find the column that the new board belongs to
        const user = await UserModel.findById(userId);
        if (!user) {
            return void res.status(404).json({ message: "User not found" });
        } else {
            // Add the new board to the user
            user.boards.push(newBoard._id as mongoose.Types.ObjectId);
            await user.save();

            // Save the new board document
            await newBoard.save();
        }

        // Return the new board
        return void res.status(201).send(newBoard);
    } catch (error: any) {
        console.error("Error saving kanban card:", error);
        return void res.status(500).json({ message: "Internal server error" });
    }
});

export default addBoardRouter;