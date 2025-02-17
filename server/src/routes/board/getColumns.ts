import { Router } from 'express';
import validateToken from '../../middleware/auth/validateToken';
import { BoardModel } from '../../models/Board';

const getColumnsRouter = Router();

getColumnsRouter.get('/:boardId', validateToken, async (req, res) => {
    try {
        // Extract the board ID from the request parameters
        const { boardId } = req.params;

        // Find all the columns that belong to the board
        const board = await BoardModel.findById(boardId);
        if (!board) {
            console.error("Board not found");
            return void res.status(404).json({ message: "Board not found" });
        }

        // Return the columns
        const columns = board.columns;
        return void res.status(200).send(columns);
    } catch (error: any) {
        console.error("Error getting columns:", error);
        return void res.status(500).json({ message: "Internal server error" });
    }
});

export default getColumnsRouter;
